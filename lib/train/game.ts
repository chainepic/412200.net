import {
  LEVELS,
  type LevelId,
  type TrainWord,
  shuffleWords,
} from "./words";

export const HIGH_SCORE_KEY = "liling-typing-train-best";
export const UNLOCK_KEY = "liling-typing-train-unlock";
export const LEVEL_BEST_PREFIX = "liling-typing-train-best-lv";

export type RoundStats = {
  stations: number;
  chars: number;
  combo: number;
  maxCombo: number;
  mistakes: number;
};

export function createDeck(levelId: LevelId): TrainWord[] {
  return shuffleWords(LEVELS[levelId].words);
}

export function emptyStats(): RoundStats {
  return {
    stations: 0,
    chars: 0,
    combo: 0,
    maxCombo: 0,
    mistakes: 0,
  };
}

export function normalizeInput(value: string) {
  return value.replace(/\s+/g, "").trim();
}

export function matchesPlace(
  input: string,
  place: { text: string; pinyinPlain: string },
) {
  const value = normalizeInput(input);
  if (!value) return false;
  if (value === place.text) return true;
  const ascii = value.toLowerCase().replace(/[^a-z]/g, "");
  return ascii.length > 0 && ascii === place.pinyinPlain;
}

export function scoreForRound(stats: RoundStats, levelId: LevelId) {
  const level = LEVELS[levelId];
  const accuracy =
    stats.stations + stats.mistakes === 0
      ? 100
      : Math.round(
          (stats.stations / (stats.stations + stats.mistakes)) * 100,
        );
  const comboBonus = Math.max(0, stats.maxCombo - 1) * 8;
  const raw = stats.stations * 100 + stats.chars * 12 + comboBonus;
  return {
    score: Math.round(raw * level.scoreMultiplier),
    accuracy,
    passed: stats.stations >= level.passStations,
  };
}

export function readUnlockedLevel(): LevelId {
  if (typeof window === "undefined") return 1;
  try {
    const value = Number(localStorage.getItem(UNLOCK_KEY) ?? "1");
    if (value >= 3) return 3;
    if (value >= 2) return 2;
    return 1;
  } catch {
    return 1;
  }
}

export function writeUnlockedLevel(levelId: LevelId) {
  if (typeof window === "undefined") return;
  try {
    const current = readUnlockedLevel();
    if (levelId > current) {
      localStorage.setItem(UNLOCK_KEY, String(levelId));
    }
  } catch {
    /* ignore */
  }
}

export function readBestScore(levelId?: LevelId): number {
  if (typeof window === "undefined") return 0;
  try {
    if (levelId != null) {
      return (
        Number(localStorage.getItem(`${LEVEL_BEST_PREFIX}-${levelId}`) ?? "0") ||
        0
      );
    }
    return Number(localStorage.getItem(HIGH_SCORE_KEY) ?? "0") || 0;
  } catch {
    return 0;
  }
}

export function writeBestScore(score: number, levelId: LevelId) {
  if (typeof window === "undefined") return score;
  try {
    const levelBest = Math.max(score, readBestScore(levelId));
    localStorage.setItem(`${LEVEL_BEST_PREFIX}-${levelId}`, String(levelBest));
    const globalBest = Math.max(score, readBestScore());
    localStorage.setItem(HIGH_SCORE_KEY, String(globalBest));
    return levelBest;
  } catch {
    return score;
  }
}
