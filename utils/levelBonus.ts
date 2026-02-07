/**
 * レベルに応じたボーナス率を返すユーティリティ
 * 
 * レベルボーナスはツムツムのスコア計算において重要な要素で、
 * 最終スコア = 基礎スコア × (1 + レベルボーナス率) で計算される
 */

import { LEVEL_BONUS_TABLE, type LevelRange } from './levelBonusTable';

// =============================================================================
// ユーティリティ関数
// =============================================================================

/**
 * 指定されたレベルに対応するボーナス率を取得する
 * 
 * @param level - ユーザーレベル（1-1100）
 * @returns ボーナス率（小数表記、例: 0.015 = 1.5%）
 * 
 * @example
 * getLevelBonusRate(3)   // => 0.015 (1.5%)
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
  
  // テーブルに含まれないレベル（1101以上）は最大値を返す
  return 0.319;
}

/**
 * 指定されたレベルに対応するボーナス率をパーセント表記で取得する
 * 
 * @param level - ユーザーレベル（1-1100）
 * @returns ボーナス率（パーセント表記、例: 1.5, 20, 30.5）
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