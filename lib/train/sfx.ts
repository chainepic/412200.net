/** Web Audio 电子音效（无需音频文件，移动端首次交互后解锁） */

let audioCtx: AudioContext | null = null;

function getCtx() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    audioCtx = new Ctx();
  }
  return audioCtx;
}

export function unlockAudio() {
  const ctx = getCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") {
    void ctx.resume();
  }
}

// 自动监听移动端的首次触摸/点击事件，在用户与页面的第一次交互时瞬间激活 Web Audio Context
if (typeof window !== "undefined") {
  const unlock = () => {
    const ctx = getCtx();
    if (ctx) {
      if (ctx.state === "suspended") {
        void ctx.resume();
      }
      window.removeEventListener("click", unlock);
      window.removeEventListener("touchstart", unlock);
    }
  };
  window.addEventListener("click", unlock, { passive: true });
  window.addEventListener("touchstart", unlock, { passive: true });
}

function tone(
  ctx: AudioContext,
  {
    freq,
    start,
    duration,
    type = "square",
    gain = 0.08,
    slideTo,
  }: {
    freq: number;
    start: number;
    duration: number;
    type?: OscillatorType;
    gain?: number;
    slideTo?: number;
  },
) {
  const osc = ctx.createOscillator();
  const amp = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  if (slideTo != null) {
    osc.frequency.exponentialRampToValueAtTime(
      Math.max(slideTo, 1),
      start + duration,
    );
  }
  amp.gain.setValueAtTime(0.0001, start);
  amp.gain.exponentialRampToValueAtTime(gain, start + 0.012);
  amp.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(amp);
  amp.connect(ctx.destination);
  osc.start(start);
  osc.stop(start + duration + 0.02);
}

/** 电子正确音：短促双音「嘀——嘀」升调 */
export function playCorrect() {
  const ctx = getCtx();
  if (!ctx) return;
  void ctx.resume();
  const t = ctx.currentTime;
  tone(ctx, { freq: 880, start: t, duration: 0.07, type: "square", gain: 0.07 });
  tone(ctx, {
    freq: 1320,
    start: t + 0.07,
    duration: 0.11,
    type: "square",
    gain: 0.09,
  });
  // 轻微高频尾音，更「电子」
  tone(ctx, {
    freq: 1760,
    start: t + 0.14,
    duration: 0.05,
    type: "triangle",
    gain: 0.04,
  });
}

/** 错误：低沉短脉冲 */
export function playMiss() {
  const ctx = getCtx();
  if (!ctx) return;
  void ctx.resume();
  const t = ctx.currentTime;
  tone(ctx, {
    freq: 220,
    start: t,
    duration: 0.12,
    type: "sawtooth",
    gain: 0.05,
    slideTo: 110,
  });
}

/** 发车提示音 */
export function playStart() {
  const ctx = getCtx();
  if (!ctx) return;
  void ctx.resume();
  const t = ctx.currentTime;
  tone(ctx, { freq: 523.25, start: t, duration: 0.08, type: "square", gain: 0.05 });
  tone(ctx, {
    freq: 659.25,
    start: t + 0.09,
    duration: 0.08,
    type: "square",
    gain: 0.05,
  });
  tone(ctx, {
    freq: 783.99,
    start: t + 0.18,
    duration: 0.14,
    type: "square",
    gain: 0.06,
  });
}
