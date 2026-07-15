"use client";

import {
  useCallback,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

import {
  createDeck,
  emptyStats,
  matchesPlace,
  normalizeInput,
  readBestScore,
  readUnlockedLevel,
  scoreForRound,
  writeBestScore,
  writeUnlockedLevel,
  type RoundStats,
} from "@/lib/train/game";
import { generateShareCardSvg, convertSvgToPng } from "@/lib/train/share";
import { playCorrect, playMiss, playStart, unlockAudio } from "@/lib/train/sfx";
import {
  LEVELS,
  LEVEL_LIST,
  type LevelId,
  type TrainWord,
} from "@/lib/train/words";

import "./train.css";

type Phase = "idle" | "playing" | "finished";

function PlaceDisplay({
  place,
  showPinyin,
}: {
  place: TrainWord;
  showPinyin: boolean;
}) {
  const syllables = place.pinyin.split(/\s+/);
  const chars = [...place.text];

  return (
    <div className="flex items-end justify-center gap-2 sm:gap-3">
      {chars.map((char, i) => (
        <div
          key={`${place.text}-${i}`}
          className="flex min-w-[2.5rem] flex-col items-center"
        >
          <span className="train-title text-[clamp(2.8rem,14vw,4rem)] leading-none font-semibold tracking-tight text-[#102820]">
            {char}
          </span>
          {showPinyin ? (
            <span className="mt-2 text-[clamp(0.85rem,3.6vw,1.05rem)] leading-none font-medium tracking-wide text-[#0f6b57]">
              {syllables[i] ?? ""}
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default function TypingTrain() {
  const inputRef = useRef<HTMLInputElement>(null);
  const statsRef = useRef<RoundStats>(emptyStats());
  const [phase, setPhase] = useState<Phase>("idle");
  const [levelId, setLevelId] = useState<LevelId>(1);
  const [unlocked, setUnlocked] = useState<LevelId>(1);
  const [deck, setDeck] = useState<TrainWord[]>([]);
  const [secondsLeft, setSecondsLeft] = useState(LEVELS[1].seconds);
  const [stats, setStats] = useState<RoundStats>(emptyStats);
  const [best, setBest] = useState(0);
  const [bests, setBests] = useState<Record<LevelId, number>>({
    1: 0,
    2: 0,
    3: 0,
  });
  const [flash, setFlash] = useState<"ok" | "miss" | null>(null);
  const [shake, setShake] = useState(false);
  const [justUnlocked, setJustUnlocked] = useState<LevelId | null>(null);
  const [shareImg, setShareImg] = useState<string | null>(null);
  const [generatingShare, setGeneratingShare] = useState(false);

  const level = LEVELS[levelId];
  const current = deck[0] ?? null;
  const progress =
    phase === "playing" || phase === "finished"
      ? Math.min(1, stats.stations / Math.max(level.passStations, 1))
      : 0;

  useEffect(() => {
    const max = readUnlockedLevel();
    setUnlocked(max);
    setLevelId(1);
    const nextBests = {
      1: readBestScore(1),
      2: readBestScore(2),
      3: readBestScore(3),
    } as Record<LevelId, number>;
    setBests(nextBests);
    setBest(nextBests[1]);

    // 禁用右键菜单、拖拽、复制粘贴，防止作弊
    const preventDefault = (e: Event) => e.preventDefault();
    const preventCopyPaste = (e: ClipboardEvent) => {
      // 允许在输入框内正常打字，但阻止复制粘贴
      if (document.activeElement?.tagName === "INPUT") {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", preventDefault);
    document.addEventListener("copy", preventCopyPaste);
    document.addEventListener("paste", preventCopyPaste);
    document.addEventListener("dragstart", preventDefault);

    return () => {
      document.removeEventListener("contextmenu", preventDefault);
      document.removeEventListener("copy", preventCopyPaste);
      document.removeEventListener("paste", preventCopyPaste);
      document.removeEventListener("dragstart", preventDefault);
    };
  }, []);

  const finishRound = useEffectEvent(async () => {
    const nextStats = statsRef.current;
    const scored = scoreForRound(nextStats, levelId);
    const nextBest = writeBestScore(scored.score, levelId);
    setBest(nextBest);
    setBests((prev) => ({ ...prev, [levelId]: nextBest }));

    if (scored.passed && levelId < 3) {
      const nextLevel = (levelId + 1) as LevelId;
      writeUnlockedLevel(nextLevel);
      setUnlocked((prev) => (nextLevel > prev ? nextLevel : prev));
      setJustUnlocked(nextLevel);
    } else {
      setJustUnlocked(null);
    }

    setPhase("finished");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setShareImg(null);

    // 异步生成挑战成绩海报
    setGeneratingShare(true);
    try {
      const now = new Date();
      const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      
      const svg = generateShareCardSvg({
        levelTitle: level.title,
        stations: nextStats.stations,
        score: scored.score,
        accuracy: scored.accuracy,
        maxCombo: nextStats.maxCombo,
        unlockedNext: scored.passed && levelId < 3 ? LEVELS[(levelId + 1) as LevelId].shortTitle : null,
        dateStr,
      });

      const pngBase64 = await convertSvgToPng(svg);
      setShareImg(pngBase64);
    } catch (err) {
      console.error("Failed to generate share image:", err);
    } finally {
      setGeneratingShare(false);
    }
  });

  useEffect(() => {
    if (phase !== "playing") return;

    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [phase]);

  useEffect(() => {
    if (phase === "playing" && secondsLeft <= 0) {
      finishRound();
    }
  }, [phase, secondsLeft]);

  const selectLevel = (id: LevelId) => {
    if (id > unlocked) return;
    setLevelId(id);
    setBest(readBestScore(id));
  };

  const start = useCallback(() => {
    unlockAudio();
    playStart();
    const nextStats = emptyStats();
    statsRef.current = nextStats;
    setDeck(createDeck(levelId));
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setSecondsLeft(LEVELS[levelId].seconds);
    setStats(nextStats);
    setFlash(null);
    setJustUnlocked(null);
    setPhase("playing");
    window.setTimeout(() => inputRef.current?.focus(), 80);
  }, [levelId]);

  const bumpWord = useCallback(
    (matched: boolean) => {
      if (!current) return;

      if (matched) {
        playCorrect();
        setFlash("ok");
        setStats((prev) => {
          const combo = prev.combo + 1;
          const next = {
            stations: prev.stations + 1,
            chars: prev.chars + current.text.length,
            combo,
            maxCombo: Math.max(prev.maxCombo, combo),
            mistakes: prev.mistakes,
          };
          statsRef.current = next;
          return next;
        });
        if (inputRef.current) {
          inputRef.current.value = "";
        }
        setDeck((prev) => {
          const rest = prev.slice(1);
          if (rest.length > 0) return rest;
          return createDeck(levelId).filter((p) => p.text !== current.text);
        });
      } else {
        playMiss();
        setFlash("miss");
        setShake(true);
        setStats((prev) => {
          const next = {
            ...prev,
            combo: 0,
            mistakes: prev.mistakes + 1,
          };
          statsRef.current = next;
          return next;
        });
        if (inputRef.current) {
          inputRef.current.value = "";
        }
        window.setTimeout(() => setShake(false), 320);
      }

      window.setTimeout(() => setFlash(null), 280);
    },
    [current, levelId],
  );

  const trySubmit = useCallback(() => {
    if (phase !== "playing" || !current) return;
    const rawValue = inputRef.current?.value || "";
    const value = normalizeInput(rawValue);
    if (!value) return;
    bumpWord(matchesPlace(value, current));
  }, [bumpWord, current, phase]);

  const onChange = (value: string) => {
    if (phase !== "playing" || !current) return;
    const next = normalizeInput(value);
    if (matchesPlace(next, current)) {
      bumpWord(true);
    }
  };

  const result = scoreForRound(stats, levelId);
  const trainOffset = 8 + progress * 72;

  return (
    <div className="train-root relative flex min-h-dvh flex-col overflow-hidden text-[#1a2e28]">
      <div className="train-sky pointer-events-none absolute inset-0" aria-hidden />
      <div className="train-haze pointer-events-none absolute inset-0" aria-hidden />

      <header className="relative z-10 flex items-center justify-between px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-2">
        <Link
          href="/"
          className="text-sm font-medium text-[#1a2e28]/70 underline-offset-4 hover:underline"
        >
          醴陵真好
        </Link>
        <p className="text-xs tracking-[0.18em] text-[#1a2e28]/55 uppercase">
          412200
        </p>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-lg flex-1 flex-col px-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <AnimatePresence mode="wait">
          {phase === "idle" && (
            <motion.section
              key="idle"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="flex flex-1 flex-col justify-between gap-5 py-4"
            >
              <div className="pt-2 text-center">
                <p className="mb-3 text-sm tracking-[0.28em] text-[#0f6b57]">
                  醴陵 · 三关挑战
                </p>
                <h1 className="train-title text-[clamp(2.2rem,10vw,3.2rem)] leading-[1.05] font-semibold tracking-tight text-[#102820]">
                  醴陵打字列车
                </h1>
                <p className="mx-auto mt-3 max-w-[20rem] text-sm leading-relaxed text-[#1a2e28]/72">
                  乡镇 → 名人 → 村名，难度递增。通关可解锁下一关。
                </p>
              </div>

              <div className="grid gap-2.5">
                {LEVEL_LIST.map((item) => {
                  const locked = item.id > unlocked;
                  const selected = item.id === levelId;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      disabled={locked}
                      onClick={() => selectLevel(item.id)}
                      className={`rounded-2xl border px-4 py-3.5 text-left transition ${
                        locked
                          ? "cursor-not-allowed border-[#102820]/08 bg-white/30 opacity-55"
                          : selected
                            ? "border-[#0f6b57] bg-white/90 shadow-[0_8px_24px_rgba(15,107,87,0.12)]"
                            : "border-[#102820]/10 bg-white/55 active:scale-[0.99]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="font-semibold text-[#102820]">
                            {item.title}
                          </p>
                          <p className="mt-1 text-xs text-[#1a2e28]/60">
                            {item.blurb} · {item.seconds}s · 通关{" "}
                            {item.passStations} 站
                          </p>
                        </div>
                        <span className="shrink-0 text-xs tracking-wider text-[#0f6b57]">
                          {locked ? "未解锁" : `最高 ${bests[item.id]}`}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <TrainTrack
                trainOffset={12}
                pulse
                label={level.title}
                stationHint={`${level.words.length} 词 · ×${level.scoreMultiplier}`}
              />

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={start}
                  className="train-cta w-full rounded-2xl bg-[#0f6b57] px-6 py-4 text-lg font-semibold text-[#f3faf6] shadow-[0_12px_32px_rgba(15,107,87,0.28)] active:scale-[0.98]"
                >
                  发车 · {level.shortTitle}
                </button>
                <p className="text-center text-sm text-[#1a2e28]/55">
                  本关最高分 {best}
                </p>
              </div>
            </motion.section>
          )}

          {phase === "playing" && current && (
            <motion.section
              key="playing"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-1 flex-col justify-between gap-3 py-1"
            >
              {/* 顶部状态栏：减小高度，紧凑布局 */}
              <div className="flex items-center justify-between gap-3 border-b border-[#102820]/05 pb-2">
                <div>
                  <p className="text-[10px] tracking-widest text-[#0f6b57] uppercase">
                    {level.shortTitle}
                  </p>
                  <p className="text-2xl font-bold tabular-nums leading-none mt-1">
                    {stats.stations}
                    <span className="text-xs font-medium text-[#1a2e28]/45 ml-1">
                      /{level.passStations}
                    </span>
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] tracking-widest text-[#0f6b57] uppercase">连击</p>
                  <p className="text-2xl font-bold tabular-nums leading-none text-[#b45309] mt-1">
                    {stats.combo}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] tracking-widest text-[#0f6b57] uppercase">剩余</p>
                  <p
                    className={`text-2xl font-bold tabular-nums leading-none mt-1 ${
                      secondsLeft <= 10 ? "text-[#b42318]" : ""
                    }`}
                  >
                    {secondsLeft}s
                  </p>
                </div>
              </div>

              {/* 轨道与火车：高度微调，保持精致 */}
              <div className="scale-95 origin-top">
                <TrainTrack
                  trainOffset={trainOffset}
                  flash={flash}
                  label={current.full}
                  stationHint={
                    level.showPinyin
                      ? `下一站 · ${current.pinyin}`
                      : `下一站 · ${current.kind}`
                  }
                />
              </div>

              {/* 核心题目展示区：在键盘呼出时，这是视觉焦点。我们通过 flex-1 和 min-h 保证其居中，并适当缩减上下间距 */}
              <motion.div
                animate={shake ? { x: [0, -8, 8, -5, 5, 0] } : { x: 0 }}
                transition={{ duration: 0.32 }}
                className="my-auto flex flex-col items-center justify-center py-2"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.text}
                    initial={{ opacity: 0, scale: 0.92, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.04, y: -10 }}
                    transition={{ duration: 0.22 }}
                  >
                    <PlaceDisplay
                      place={current}
                      showPinyin={level.showPinyin}
                    />
                  </motion.div>
                </AnimatePresence>
                <p className="mt-3 text-xs font-medium tracking-wider text-[#1a2e28]/55 bg-white/40 px-2.5 py-0.5 rounded-full border border-[#102820]/05">
                  {current.kind}
                </p>
              </motion.div>

              {/* 输入框与确认按钮：紧贴底部，防止被键盘完全遮挡 */}
              <form
                className="space-y-2 mt-auto"
                onSubmit={(e) => {
                  e.preventDefault();
                  trySubmit();
                }}
              >
                <label htmlFor="train-input" className="sr-only">
                  输入汉字或拼音
                </label>
                <input
                  id="train-input"
                  ref={inputRef}
                  onChange={(e) => onChange(e.target.value)}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  enterKeyHint="done"
                  inputMode="search"
                  placeholder="输入汉字或拼音"
                  className="w-full rounded-2xl border border-[#0f6b57]/25 bg-white/90 px-4 py-3.5 text-center text-lg text-[#102820] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] outline-none backdrop-blur placeholder:text-[#1a2e28]/35 focus:border-[#0f6b57] focus:ring-2 focus:ring-[#0f6b57]/25"
                />
                <button
                  type="submit"
                  className="w-full rounded-2xl bg-[#102820] px-4 py-3 text-base font-semibold text-[#eef7f2] active:scale-[0.98]"
                >
                  确认到站
                </button>
              </form>
            </motion.section>
          )}

          {phase === "finished" && (
            <motion.section
              key="finished"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-1 flex-col justify-between gap-6 py-6"
            >
              <div className="pt-4 text-center">
                <p className="text-sm tracking-[0.25em] text-[#0f6b57]">
                  {level.title}
                </p>
                <h2 className="train-title mt-2 text-[clamp(2.2rem,10vw,3rem)] font-semibold">
                  {result.passed ? "通关" : "到站"} {stats.stations}
                </h2>
                <p className="mt-2 text-[#1a2e28]/65">
                  得分 {result.score} · 正确率 {result.accuracy}% · 最高连击{" "}
                  {stats.maxCombo}
                </p>
                {result.passed ? (
                  <p className="mt-2 text-sm font-medium text-[#0f6b57]">
                    {justUnlocked
                      ? `已解锁${LEVELS[justUnlocked].title}`
                      : levelId === 3
                        ? "三关全通，醴陵通吃"
                        : "本关达标"}
                  </p>
                ) : (
                  <p className="mt-2 text-sm text-[#1a2e28]/55">
                    再达 {level.passStations} 站即可通关
                  </p>
                )}
              </div>

              {/* 成绩分享海报 (长按保存) */}
              {generatingShare ? (
                <div className="flex h-48 flex-col items-center justify-center rounded-2xl border border-[#102820]/10 bg-white/40 backdrop-blur">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#0f6b57] border-t-transparent" />
                  <p className="mt-3 text-xs text-[#1a2e28]/60">正在生成精美成绩海报...</p>
                </div>
              ) : shareImg ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="relative overflow-hidden rounded-2xl border border-[#102820]/15 shadow-[0_12px_32px_rgba(16,40,32,0.12)]">
                    <img
                      src={shareImg}
                      alt="挑战成绩海报"
                      className="max-h-[260px] w-auto object-contain"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100">
                      <p className="text-xs font-semibold text-white">长按图片保存或分享</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#1a2e28]/55">↑ 手机端可长按上方海报保存，分享到朋友圈</p>
                </div>
              ) : null}

              <TrainTrack
                trainOffset={Math.max(18, trainOffset)}
                label={result.passed ? "通关出站" : "本趟结束"}
                stationHint={`本关最高分 ${best}`}
              />

              <div className="grid gap-3">
                {justUnlocked ? (
                  <button
                    type="button"
                    onClick={() => {
                      selectLevel(justUnlocked);
                      setPhase("idle");
                    }}
                    className="train-cta w-full rounded-2xl bg-[#0f6b57] px-6 py-4 text-lg font-semibold text-[#f3faf6] shadow-[0_12px_32px_rgba(15,107,87,0.28)] active:scale-[0.98]"
                  >
                    前往 {LEVELS[justUnlocked].shortTitle}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={start}
                    className="train-cta w-full rounded-2xl bg-[#0f6b57] px-6 py-4 text-lg font-semibold text-[#f3faf6] shadow-[0_12px_32px_rgba(15,107,87,0.28)] active:scale-[0.98]"
                  >
                    再开一趟
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setPhase("idle")}
                  className="w-full rounded-2xl border border-[#102820]/15 bg-white/50 px-6 py-3.5 text-center text-base font-medium text-[#102820] backdrop-blur"
                >
                  选关
                </button>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      <footer className="relative z-10 mx-auto w-full max-w-lg px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2">
        <Link
          href="/"
          className="group flex items-center justify-between gap-3 rounded-2xl border border-[#102820]/10 bg-[#102820]/88 px-4 py-3.5 text-[#e8f5ef] shadow-[0_10px_28px_rgba(16,40,32,0.18)] active:scale-[0.99]"
        >
          <div className="min-w-0">
            <p className="text-[11px] tracking-[0.2em] text-[#9fcdb8]">
              醴陵真好 · 412200.net
            </p>
            <p className="mt-1 truncate text-base font-semibold">
              AI软件、应用开发
            </p>
            <p className="mt-0.5 text-sm text-[#9fcdb8]/90">
              培训 · Agent · API中转 · 私有化部署
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-[#1f8f74] px-3 py-1.5 text-xs font-semibold text-white">
            了解更多
          </span>
        </Link>
      </footer>
    </div>
  );
}

function TrainTrack({
  trainOffset,
  label,
  stationHint,
  pulse = false,
  flash = null,
}: {
  trainOffset: number;
  label: string;
  stationHint: string;
  pulse?: boolean;
  flash?: "ok" | "miss" | null;
}) {
  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-[#102820]/08 bg-[#102820]/92 px-4 py-5 text-[#e8f5ef] shadow-[0_18px_40px_rgba(16,40,32,0.22)]">
      <div className="mb-4 flex items-center justify-between gap-3 text-xs tracking-[0.18em] text-[#9fcdb8]">
        <span className="truncate">{label}</span>
        <span className="shrink-0">{stationHint}</span>
      </div>

      <div className="relative h-16">
        <div className="absolute top-[58%] right-0 left-0 h-[3px] bg-[#3d6b58]" />
        <div className="absolute top-[68%] right-0 left-0 h-px bg-[#2a4f42]" />
        <div className="absolute top-[58%] right-3 left-3 flex justify-between">
          {Array.from({ length: 7 }).map((_, i) => (
            <span
              key={i}
              className="h-2.5 w-px -translate-y-1 bg-[#5f8f7a]"
            />
          ))}
        </div>

        <motion.div
          className="absolute top-1"
          animate={{ left: `${trainOffset}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          style={{ translateX: "-50%" }}
        >
          <motion.div
            animate={
              pulse
                ? { y: [0, -3, 0] }
                : flash === "ok"
                  ? { scale: [1, 1.08, 1] }
                  : flash === "miss"
                    ? { x: [0, -4, 4, 0] }
                    : { y: 0 }
            }
            transition={
              pulse
                ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.28 }
            }
            className="flex items-end"
            aria-hidden
          >
            {/* 火车车头 (带烟囱、车窗、排障器、车轮) */}
            <div className="relative flex h-9 items-end">
              {/* 烟囱冒出的小气泡/蒸汽 */}
              {pulse && (
                <motion.span
                  animate={{ y: [-4, -12], opacity: [1, 0], scale: [0.6, 1.2] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                  className="absolute top-[-6px] left-[6px] h-1.5 w-1.5 rounded-full bg-white/60"
                />
              )}
              
              {/* 排障器 (前端斜角) */}
              <div className="h-2 w-2 translate-x-1.5 bg-[#b45309] [clip-path:polygon(100%_0,0%_100%,100%_100%)]" />
              
              {/* 车头主体 */}
              <div className="relative h-8 w-11 rounded-r-md bg-[#1f8f74] shadow-[inset_-1px_1px_0_rgba(255,255,255,0.2)]">
                {/* 烟囱 */}
                <div className="absolute top-[-5px] left-[4px] h-1.5 w-2 bg-[#14725c] rounded-t-sm" />
                {/* 车窗 (亮黄色) */}
                <div className="absolute top-[5px] right-[2px] h-3 w-3 rounded-sm bg-[#f0c36a] shadow-[0_0_4px_#f0c36a]" />
                {/* 侧面装饰线条 */}
                <div className="absolute bottom-[4px] left-[2px] h-1 w-6 bg-[#14725c]/60 rounded-full" />
                {/* 汉字「醴」 */}
                <span className="absolute top-[6px] left-[10px] text-[10px] font-bold text-[#eef7f2] leading-none scale-90">
                  醴
                </span>
              </div>
              
              {/* 车轮 */}
              <div className="absolute bottom-[-3px] left-[3px] flex gap-2.5">
                <motion.div 
                  animate={pulse ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="h-3 w-3 rounded-full border border-[#102820] bg-[#14725c] flex items-center justify-center"
                >
                  <div className="h-1 w-1 rounded-full bg-[#f0c36a]" />
                </motion.div>
                <motion.div 
                  animate={pulse ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="h-3 w-3 rounded-full border border-[#102820] bg-[#14725c] flex items-center justify-center"
                >
                  <div className="h-1 w-1 rounded-full bg-[#f0c36a]" />
                </motion.div>
              </div>
            </div>

            {/* 车厢连接器 */}
            <div className="mb-2 h-[2px] w-1.5 bg-[#5f8f7a]" />

            {/* 第一节客运车厢 */}
            <div className="relative h-7 w-9 rounded-sm bg-[#14725c] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
              {/* 车窗 */}
              <div className="absolute top-[4px] left-[3px] flex gap-1">
                <div className="h-2 w-2 rounded-2xs bg-[#f0c36a]/90" />
                <div className="h-2 w-2 rounded-2xs bg-[#f0c36a]/90" />
                <div className="h-2 w-2 rounded-2xs bg-[#f0c36a]/90" />
              </div>
              {/* 车轮 */}
              <div className="absolute bottom-[-3px] left-[2px] flex gap-2.5">
                <div className="h-2.5 w-2.5 rounded-full border border-[#102820] bg-[#102820] flex items-center justify-center">
                  <div className="h-0.5 w-0.5 rounded-full bg-[#9fcdb8]" />
                </div>
                <div className="h-2.5 w-2.5 rounded-full border border-[#102820] bg-[#102820] flex items-center justify-center">
                  <div className="h-0.5 w-0.5 rounded-full bg-[#9fcdb8]" />
                </div>
              </div>
            </div>

            {/* 车厢连接器 */}
            <div className="mb-2 h-[2px] w-1.5 bg-[#5f8f7a]" />

            {/* 第二节货运/煤水车厢 */}
            <div className="relative h-6 w-8 rounded-sm bg-[#14725c] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
              {/* 车厢内装载物 (煤炭/货物起伏) */}
              <div className="absolute top-[-3px] left-[1px] right-[1px] h-1 bg-[#102820] rounded-t-sm" />
              {/* 车轮 */}
              <div className="absolute bottom-[-3px] left-[1.5px] flex gap-2">
                <div className="h-2.5 w-2.5 rounded-full border border-[#102820] bg-[#102820] flex items-center justify-center">
                  <div className="h-0.5 w-0.5 rounded-full bg-[#9fcdb8]" />
                </div>
                <div className="h-2.5 w-2.5 rounded-full border border-[#102820] bg-[#102820] flex items-center justify-center">
                  <div className="h-0.5 w-0.5 rounded-full bg-[#9fcdb8]" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="absolute top-[42%] right-2 flex flex-col items-center">
          <span className="h-5 w-px bg-[#9fcdb8]" />
          <span className="h-2 w-2 rounded-full bg-[#f0c36a]" />
        </div>
      </div>
    </div>
  );
}
