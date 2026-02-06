/**
 * スコア計算に関するユーティリティ関数
 * 
 * ツムツムのスコア計算ロジックを集約
 * - 基礎スコアから最終スコアへの変換
 * - チェーンスコアの計算
 * - 目標達成に必要なツムスコアの探索
 */

import { getLevelBonusRate } from './levelBonus';
import { CHAIN_CONFIG } from '../constants/config';

// =============================================================================
// 型定義
// =============================================================================

/** ツムスコア候補の型 */
export interface TsumCandidate {
  /** ツムスコア */
  tsum: number;
  /** 基礎スコア */
  base: number;
  /** 最終スコア */
  final: number;
}

/** 基礎スコアと最終スコアのペア */
export interface ScorePair {
  /** 基礎スコア */
  base: number;
  /** 最終スコア */
  final: number;
}

// =============================================================================
// チェーンスコア定数
// =============================================================================

/**
 * チェーン数に対応するチェーンスコア
 * CHAIN_CONFIG から再エクスポート（後方互換性のため）
 */
export const CHAIN_SCORE: Record<number, number> = { ...CHAIN_CONFIG.scores };

// =============================================================================
// スコア計算関数
// =============================================================================

/**
 * 基礎スコアから最終スコアを計算する
 * 
 * 計算式: 最終スコア = floor(基礎スコア × (1 + レベルボーナス率))
 * 
 * @param baseScore - 基礎スコア（ゲーム画面に表示されるスコア）
 * @param level - ユーザーレベル
 * @returns 最終スコア（切り捨て）
 * 
 * @example
 * finalScoreFromBase(1000, 100) // レベル100（20%ボーナス）=> 1200
 */
export function finalScoreFromBase(baseScore: number, level: number): number {
  const bonusRate = getLevelBonusRate(level);
  const multiplier = 1 + bonusRate;
  
  // Math.floor を使用して切り捨て
  return Math.floor(baseScore * multiplier);
}

/**
 * ツムスコアとチェーン数から基礎スコアを計算する
 * 
 * 計算式: 基礎スコア = (ツムスコア × チェーン数) + チェーンスコア
 * 
 * @param tsumScore - ツム1つあたりのスコア
 * @param chainCount - チェーン数
 * @returns 基礎スコア
 * 
 * @example
 * baseScoreFromTsum(100, 3) // => 100 * 3 + 300 = 600
 */
export function baseScoreFromTsum(tsumScore: number, chainCount: number): number {
  const chainScore = CHAIN_SCORE[chainCount] ?? 0;
  return tsumScore * chainCount + chainScore;
}

/**
 * 最終スコアの一の位が目標と一致するか判定する
 * 
 * @param baseScore - 基礎スコア
 * @param level - ユーザーレベル
 * @param targetDigit - 目標の一の位（0-9）
 * @returns 一致する場合は true
 */
export function isFinalLastDigitTarget(
  baseScore: number,
  level: number,
  targetDigit: number
): boolean {
  const finalScore = finalScoreFromBase(baseScore, level);
  return getLastDigit(finalScore) === normalizeDigit(targetDigit);
}

// =============================================================================
// 探索関数
// =============================================================================

/**
 * 指定したチェーン数について、目標の一の位を満たすツムスコア候補を探索する
 * 
 * @param level - ユーザーレベル
 * @param targetDigit - 目標の一の位（0-9）
 * @param chainCounts - 探索するチェーン数の配列
 * @param maxTsumScore - 探索する最大ツムスコア
 * @returns チェーン数をキーとした候補の配列
 * 
 * @example
 * findTsumCandidates(100, 5, [3, 4, 5], 2000)
 */
export function findTsumCandidates(
  level: number,
  targetDigit: number,
  chainCounts: readonly number[] = CHAIN_CONFIG.suggestChains,
  maxTsumScore: number = 2000
): Record<number, TsumCandidate[]> {
  const results: Record<number, TsumCandidate[]> = {};
  const normalizedTarget = normalizeDigit(targetDigit);
  
  for (const chainCount of chainCounts) {
    const candidates: TsumCandidate[] = [];
    
    // 1から maxTsumScore まで探索
    for (let tsum = 1; tsum <= maxTsumScore; tsum++) {
      const base = baseScoreFromTsum(tsum, chainCount);
      const final = finalScoreFromBase(base, level);
      
      if (getLastDigit(final) === normalizedTarget) {
        candidates.push({ tsum, base, final });
      }
    }
    
    // ツムスコアが小さい順（現実的な候補が上位）にソート
    candidates.sort((a, b) => a.tsum - b.tsum);
    results[chainCount] = candidates;
  }
  
  return results;
}

/**
 * 目標の一の位を満たす基礎スコアの一覧を取得する
 * 
 * @param level - ユーザーレベル
 * @param targetDigit - 目標の一の位（0-9）
 * @param limit - 探索上限（基礎スコア）
 * @param step - 探索のステップ幅
 * @returns 条件を満たす基礎スコアと最終スコアのペアの配列
 */
export function listBaseScoresMatchingLastDigit(
  level: number,
  targetDigit: number,
  limit: number = 10000,
  step: number = 1
): ScorePair[] {
  const results: ScorePair[] = [];
  const normalizedTarget = normalizeDigit(targetDigit);
  
  for (let base = 0; base <= limit; base += step) {
    const final = finalScoreFromBase(base, level);
    
    if (getLastDigit(final) === normalizedTarget) {
      results.push({ base, final });
    }
  }
  
  return results;
}

// =============================================================================
// ヘルパー関数
// =============================================================================

/**
 * 数値の一の位を取得する
 */
function getLastDigit(value: number): number {
  return Math.abs(value) % 10;
}

/**
 * 一の位の値を正規化する（0-9の範囲に収める）
 */
function normalizeDigit(digit: number): number {
  return Math.abs(digit) % 10;
}