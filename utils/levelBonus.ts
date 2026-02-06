/**
 * レベルに応じたボーナス率を返すユーティリティ
 * 
 * レベルボーナスはツムツムのスコア計算において重要な要素で、
 * 最終スコア = 基礎スコア × (1 + レベルボーナス率) で計算される
 */

// =============================================================================
// 型定義
// =============================================================================

/** レベル範囲の型定義 */
export interface LevelRange {
  /** 開始レベル */
  start: number;
  /** 終了レベル */
  end: number;
  /** ボーナス率（パーセント表記） */
  ratePercent: number;
}

// =============================================================================
// レベルボーナス率テーブル
// =============================================================================

/**
 * レベル範囲とボーナス率のマッピング
 * 仕様書に基づいた正確な値を使用
 */
const LEVEL_BONUS_TABLE: readonly LevelRange[] = [
  // レベル1-2: ボーナスなし
  { start: 1, end: 2, ratePercent: 0 },
  // レベル3以上: ボーナス適用
  { start: 3, end: 3, ratePercent: 1 },
  { start: 4, end: 5, ratePercent: 2 },
  { start: 6, end: 7, ratePercent: 3 },
  { start: 8, end: 9, ratePercent: 4 },
  { start: 10, end: 12, ratePercent: 5 },
  { start: 13, end: 14, ratePercent: 6 },
  { start: 15, end: 17, ratePercent: 7 },
  { start: 18, end: 19, ratePercent: 8 },
  { start: 20, end: 23, ratePercent: 9 },
  { start: 24, end: 26, ratePercent: 10 },
  { start: 27, end: 29, ratePercent: 11 },
  { start: 30, end: 34, ratePercent: 12 },
  { start: 35, end: 39, ratePercent: 13 },
  { start: 40, end: 49, ratePercent: 14 },
  { start: 50, end: 59, ratePercent: 15 },
  { start: 60, end: 69, ratePercent: 16 },
  { start: 70, end: 79, ratePercent: 17 },
  { start: 80, end: 89, ratePercent: 18 },
  { start: 90, end: 99, ratePercent: 19 },
  { start: 100, end: 109, ratePercent: 20 },
  { start: 110, end: 119, ratePercent: 21 },
  { start: 120, end: 129, ratePercent: 22 },
  { start: 130, end: 139, ratePercent: 23 },
  { start: 140, end: 149, ratePercent: 24 },
  { start: 150, end: 215, ratePercent: 25 },
  { start: 216, end: 360, ratePercent: 26 },
  { start: 361, end: 510, ratePercent: 27 },
  { start: 511, end: 660, ratePercent: 28 },
  // 高レベル帯: 小数点を含むボーナス率
  { start: 661, end: 675, ratePercent: 29 },
  { start: 676, end: 690, ratePercent: 29.1 },
  { start: 691, end: 705, ratePercent: 29.2 },
  { start: 706, end: 720, ratePercent: 29.3 },
  { start: 721, end: 735, ratePercent: 29.4 },
  { start: 736, end: 750, ratePercent: 29.5 },
  { start: 751, end: 765, ratePercent: 29.6 },
  { start: 766, end: 780, ratePercent: 29.7 },
  { start: 781, end: 795, ratePercent: 29.8 },
  { start: 796, end: 810, ratePercent: 29.9 },
  { start: 811, end: 825, ratePercent: 30 },
  { start: 826, end: 840, ratePercent: 30.1 },
  { start: 841, end: 855, ratePercent: 30.2 },
  { start: 856, end: 870, ratePercent: 30.3 },
  { start: 871, end: 885, ratePercent: 30.4 },
  { start: 886, end: 900, ratePercent: 30.5 },
] as const;

// =============================================================================
// ユーティリティ関数
// =============================================================================

/**
 * 指定されたレベルに対応するボーナス率を取得する
 * 
 * @param level - ユーザーレベル（1-900）
 * @returns ボーナス率（小数表記、例: 0.01 = 1%）
 * 
 * @example
 * getLevelBonusRate(3)   // => 0.01 (1%)
 * getLevelBonusRate(100) // => 0.20 (20%)
 * getLevelBonusRate(900) // => 0.305 (30.5%)
 */
export function getLevelBonusRate(level: number): number {
  // レベルが範囲外の場合は0を返す
  if (level < 1) return 0;
  
  for (const range of LEVEL_BONUS_TABLE) {
    if (level >= range.start && level <= range.end) {
      return range.ratePercent / 100;
    }
  }
  
  // テーブルに含まれないレベル（901以上）は最大値を返す
  return 0.305;
}

/**
 * 指定されたレベルに対応するボーナス率をパーセント表記で取得する
 * 
 * @param level - ユーザーレベル（1-900）
 * @returns ボーナス率（パーセント表記、例: 1, 20, 30.5）
 */
export function getLevelBonusRatePercent(level: number): number {
  return getLevelBonusRate(level) * 100;
}

/**
 * レベルボーナステーブルを取得する（読み取り専用）
 */
export function getLevelBonusTable(): readonly LevelRange[] {
  return LEVEL_BONUS_TABLE;
}