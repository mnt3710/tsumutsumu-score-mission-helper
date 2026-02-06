"use client";
import { useState, useEffect, useCallback, ChangeEvent } from "react";
import { finalScoreFromBase, isFinalLastDigitTarget } from "../utils/calculators";
import { INPUT_LIMITS } from "../constants/config";
import NumberInput from "./ui/NumberInput";
import Card from "./ui/Card";
import Badge from "./ui/Badge";
import Button from "./ui/Button";

// =============================================================================
// 型定義
// =============================================================================

interface CurrentCheckProps {
  /** ユーザーレベル */
  level: number;
}

interface CheckResult {
  finalScore: number;
  isMatch: boolean;
}

// =============================================================================
// 定数
// =============================================================================

const LABELS = {
  inputSection: "入力設定",
  baseScore: "現在の基礎スコア",
  targetDigit: "目標の一の位",
  userLevel: "ユーザーレベル",
  finalScore: "最終スコア",
  judgement: "一の位判定",
  match: "目標と一致",
  reset: "リセット",
  copyScore: "スコアをコピー",
  validationError: "基礎スコアは0以上の数値を入力してください",
} as const;

// =============================================================================
// コンポーネント
// =============================================================================

/**
 * 現在スコア判定コンポーネント
 * 基礎スコアから最終スコアを計算し、一の位が目標と一致するか判定
 */
export default function CurrentCheck({ level }: CurrentCheckProps) {
  // 状態管理
  const [baseScore, setBaseScore] = useState<number | "">("");
  const [targetDigit, setTargetDigit] = useState<number>(INPUT_LIMITS.targetDigit.default);
  const [result, setResult] = useState<CheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // スコア計算
  useEffect(() => {
    setError(null);

    if (baseScore === "") {
      setResult(null);
      return;
    }

    if (baseScore < 0) {
      setError(LABELS.validationError);
      setResult(null);
      return;
    }

    const finalScore = finalScoreFromBase(Number(baseScore), level);
    const isMatch = isFinalLastDigitTarget(Number(baseScore), level, targetDigit);
    setResult({ finalScore, isMatch });
  }, [baseScore, level, targetDigit]);

  // イベントハンドラ
  const handleBaseScoreChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBaseScore(value === "" ? "" : Number(value));
  }, []);

  const handleTargetChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const clampedValue = Math.max(
      INPUT_LIMITS.targetDigit.min,
      Math.min(INPUT_LIMITS.targetDigit.max, value)
    );
    setTargetDigit(clampedValue);
  }, []);

  const handleReset = useCallback(() => {
    setBaseScore("");
    setTargetDigit(INPUT_LIMITS.targetDigit.default);
  }, []);

  const handleCopyScore = useCallback(() => {
    if (result?.finalScore != null) {
      navigator.clipboard?.writeText(String(result.finalScore));
    }
  }, [result?.finalScore]);

  return (
    <Card>
      {/* 入力セクション */}
      <section className="mb-6 pb-6 border-b border-slate-100">
        <h3 className="section-label section-label-primary mb-4">
          📊 {LABELS.inputSection}
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <NumberInput
            label={LABELS.baseScore}
            min={INPUT_LIMITS.baseScore.min}
            value={baseScore}
            onChange={handleBaseScoreChange}
          />
          
          <NumberInput
            label={LABELS.targetDigit}
            min={INPUT_LIMITS.targetDigit.min}
            max={INPUT_LIMITS.targetDigit.max}
            value={targetDigit}
            onChange={handleTargetChange}
          />
          
          <div className="relative">
            <div className="w-full px-4 py-3 text-base font-medium bg-slate-50 border border-slate-200 rounded-xl text-slate-700">
              {level}
            </div>
            <span className="absolute -top-2.5 left-3 px-1 text-xs font-medium text-slate-500 bg-white">
              {LABELS.userLevel}
            </span>
          </div>
        </div>
      </section>

      {/* エラーメッセージ */}
      {error && (
        <div className="mb-6 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium flex items-start gap-3">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {/* 結果セクション */}
      {result && (
        <div className="space-y-6">
          <div className="result-card">
            <div className="grid grid-cols-2 gap-6">
              {/* 最終スコア */}
              <div>
                <span className="section-label section-label-primary mb-2 block">
                  {LABELS.finalScore}
                </span>
                <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient">
                  {result.finalScore.toLocaleString()}
                </p>
              </div>
              
              {/* 判定結果 */}
              <div className="text-right">
                <span className="section-label section-label-primary mb-2 block">
                  {LABELS.judgement}
                </span>
                <p
                  className={`text-3xl sm:text-4xl font-bold ${
                    result.isMatch ? "text-emerald-500" : "text-red-500"
                  }`}
                >
                  {result.isMatch ? "✓" : "✕"}
                </p>
                {result.isMatch && (
                  <Badge variant="success" className="mt-2">
                    {LABELS.match}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* アクションボタン */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="tertiary" onClick={handleReset}>
              🔄 {LABELS.reset}
            </Button>
            <Button variant="primary" onClick={handleCopyScore}>
              📋 {LABELS.copyScore}
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}