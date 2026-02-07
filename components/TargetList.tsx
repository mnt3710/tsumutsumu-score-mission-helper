"use client";
import { useEffect, useState, useCallback, ChangeEvent } from "react";
import { listBaseScoresMatchingLastDigit, ScorePair } from "../utils/calculators";
import { INPUT_LIMITS, DISPLAY_CONFIG } from "../constants/config";
import NumberInput from "./ui/NumberInput";
import Select from "./ui/Select";
import Card from "./ui/Card";
import Button from "./ui/Button";

// =============================================================================
// 型定義
// =============================================================================

interface TargetListProps {
  /** ユーザーレベル */
  level: number;
  /** 目標の一の位 */
  targetDigit: number;
  /** 目標の一の位変更ハンドラ */
  onTargetDigitChange: (value: number) => void;
}

// =============================================================================
// 定数
// =============================================================================

const LABELS = {
  paramSection: "検索パラメータ",
  searchLimit: "探索上限（基礎スコア）",
  step: "ステップ",
  userLevel: "ユーザーレベル",
  foundCount: "見つかった件数",
  baseScore: "基礎スコア",
  finalScore: "最終",
  copyCsv: "CSV をコピー",
  showingTop: "上位 {count} 件を表示しています",
} as const;

const STEP_OPTIONS = DISPLAY_CONFIG.stepOptions.map((opt) => ({
  value: opt.value,
  label: opt.label,
}));

// =============================================================================
// コンポーネント
// =============================================================================

/**
 * 目標達成スコア一覧コンポーネント
 * 指定した一の位を達成できる基礎スコアの一覧を表示
 */
export default function TargetList({ level, targetDigit, onTargetDigitChange }: TargetListProps) {
  const [searchLimit, setSearchLimit] = useState<number>(INPUT_LIMITS.baseScore.searchLimit);
  const [step, setStep] = useState<number>(10);
  const [results, setResults] = useState<ScorePair[]>([]);

  // 探索実行
  useEffect(() => {
    const list = listBaseScoresMatchingLastDigit(level, targetDigit, searchLimit, step);
    setResults(list);
  }, [level, targetDigit, searchLimit, step]);

  // イベントハンドラ
  const handleLimitChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setSearchLimit(Math.max(100, value));
  }, []);

  const handleStepChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setStep(Number(e.target.value));
  }, []);

  const handleCopyCsv = useCallback(() => {
    const displayedResults = results.slice(0, DISPLAY_CONFIG.maxTargetListItems);
    const header = "base,final";
    const rows = displayedResults.map((r) => `${r.base},${r.final}`);
    const csv = [header, ...rows].join("\n");
    navigator.clipboard?.writeText(csv);
  }, [results]);

  const displayedResults = results.slice(0, DISPLAY_CONFIG.maxTargetListItems);
  const hasMore = results.length > DISPLAY_CONFIG.maxTargetListItems;

  return (
    <Card>
      {/* パラメータ入力セクション */}
      <section className="mb-6 pb-6 border-b border-slate-100">
        <h3 className="section-label section-label-primary mb-4">
          ✨ {LABELS.paramSection}
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <NumberInput
            label={LABELS.searchLimit}
            min={100}
            max={INPUT_LIMITS.baseScore.max}
            value={searchLimit}
            onChange={handleLimitChange}
          />
          
          <Select
            label={LABELS.step}
            value={step}
            onChange={handleStepChange}
            options={STEP_OPTIONS}
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

      {/* 結果セクション */}
      <div className="space-y-6">
        {/* ヘッダー */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <span className="section-label section-label-primary">{LABELS.foundCount}</span>
            <p className="text-4xl sm:text-5xl font-bold text-gradient mt-2">
              {results.length}
            </p>
          </div>
          
          <Button variant="primary" onClick={handleCopyCsv}>
            📋 {LABELS.copyCsv}
          </Button>
        </div>

        {/* 結果一覧 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {displayedResults.map((r) => (
            <div key={r.base} className="result-card">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <span className="section-label">{LABELS.baseScore}</span>
                  <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                    {r.base.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <span className="section-label section-label-primary">{LABELS.finalScore}</span>
                  <p className="text-xl sm:text-2xl font-bold text-gradient mt-1">
                    {r.final.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <p className="text-sm text-slate-500 text-center py-4">
            ⭐ {LABELS.showingTop.replace("{count}", String(DISPLAY_CONFIG.maxTargetListItems))}
          </p>
        )}
      </div>
    </Card>
  );
}