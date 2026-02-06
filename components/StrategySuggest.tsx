"use client";
import { useEffect, useState, useCallback, useMemo, ChangeEvent } from "react";
import { findTsumCandidates, CHAIN_SCORE, TsumCandidate } from "../utils/calculators";
import { INPUT_LIMITS, CHAIN_CONFIG, DISPLAY_CONFIG, TSUM_SCORE_INFO } from "../constants/config";
import NumberInput from "./ui/NumberInput";
import Card from "./ui/Card";
import Badge from "./ui/Badge";
import Button from "./ui/Button";

// =============================================================================
// 型定義
// =============================================================================

interface StrategySuggestProps {
  /** ユーザーレベル */
  level: number;
}

// =============================================================================
// 定数
// =============================================================================

const LABELS = {
  paramSection: "攻略パラメータ",
  targetDigit: "目標の一の位",
  maxTsumScore: "探索最大ツムスコア",
  userLevel: "ユーザーレベル",
  chain: "チェーン",
  chainLabel: "Chain",
  baseScore: "Base Score",
  tsumScore: "ツムスコア",
  base: "基礎",
  finalScore: "最終スコア",
  candidatesFound: "候補が見つかりました",
  showingTop: "上位{count}件を表示",
  moreAvailable: "他にも {count} 件の候補あり",
  copyCsv: "CSV をコピー",
  hint: "ヒント",
} as const;

// =============================================================================
// サブコンポーネント
// =============================================================================

interface ChainResultCardProps {
  chainCount: number;
  candidates: TsumCandidate[];
  maxDisplay: number;
}

function ChainResultCard({ chainCount, candidates, maxDisplay }: ChainResultCardProps) {
  const displayedCandidates = candidates.slice(0, maxDisplay);
  const remainingCount = candidates.length - maxDisplay;

  const handleCopyCsv = useCallback(() => {
    const header = "chain,tsum,base,final";
    const rows = displayedCandidates.map(
      (r) => `${chainCount},${r.tsum},${r.base},${r.final}`
    );
    const csv = [header, ...rows].join("\n");
    navigator.clipboard?.writeText(csv);
  }, [chainCount, displayedCandidates]);

  return (
    <div className="result-card">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 gap-3">
        <div>
          <Badge variant="primary">{chainCount}{LABELS.chain}</Badge>
          <h4 className="text-xl sm:text-2xl font-bold mt-2 text-slate-900">
            {chainCount} {LABELS.chainLabel}
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            {LABELS.baseScore}: {CHAIN_SCORE[chainCount]}
          </p>
        </div>
        <div className="text-right">
          <p className="text-3xl sm:text-4xl font-bold text-gradient">
            {candidates.length}
          </p>
          <p className="text-xs text-slate-500 mt-1">{LABELS.candidatesFound}</p>
        </div>
      </div>

      {/* 候補一覧 */}
      {candidates.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {displayedCandidates.map((r) => (
              <div
                key={r.tsum}
                className="px-4 py-3 rounded-lg bg-slate-50 border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all"
              >
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <span className="section-label">{LABELS.tsumScore}</span>
                    <p className="text-lg font-bold text-slate-900 mt-1">{r.tsum}</p>
                  </div>
                  <div className="text-right">
                    <span className="section-label">{LABELS.base}</span>
                    <p className="text-lg font-bold text-indigo-600 mt-1">
                      {r.base.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-100">
                  <span className="section-label">{LABELS.finalScore}</span>
                  <p className="text-xl font-bold text-gradient mt-1">
                    {r.final.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {remainingCount > 0 && (
            <p className="mt-4 text-xs text-slate-500 text-center">
              {LABELS.showingTop.replace("{count}", String(maxDisplay))} • {LABELS.moreAvailable.replace("{count}", String(remainingCount))}
            </p>
          )}

          <div className="mt-4 flex justify-center">
            <Button variant="tertiary" size="sm" onClick={handleCopyCsv}>
              📋 {LABELS.copyCsv}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

// =============================================================================
// メインコンポーネント
// =============================================================================

/**
 * 攻略方法提案コンポーネント
 * チェーン数ごとに目標達成に必要なツムスコアを探索
 */
export default function StrategySuggest({ level }: StrategySuggestProps) {
  const [targetDigit, setTargetDigit] = useState<number>(INPUT_LIMITS.targetDigit.default);
  const [maxTsumScore, setMaxTsumScore] = useState<number>(INPUT_LIMITS.tsumScore.default);
  const [results, setResults] = useState<Record<number, TsumCandidate[]>>({});

  // 探索実行
  useEffect(() => {
    const res = findTsumCandidates(
      level,
      targetDigit,
      CHAIN_CONFIG.suggestChains,
      maxTsumScore
    );
    setResults(res);
  }, [level, targetDigit, maxTsumScore]);

  // イベントハンドラ
  const handleTargetChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const clampedValue = Math.max(
      INPUT_LIMITS.targetDigit.min,
      Math.min(INPUT_LIMITS.targetDigit.max, value)
    );
    setTargetDigit(clampedValue);
  }, []);

  const handleMaxTsumChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setMaxTsumScore(Math.max(INPUT_LIMITS.tsumScore.searchMin, value));
  }, []);

  // チェーン数配列をメモ化
  const chainCounts = useMemo(() => [...CHAIN_CONFIG.suggestChains], []);

  return (
    <Card>
      {/* パラメータ入力セクション */}
      <section className="mb-6 pb-6 border-b border-slate-100">
        <h3 className="section-label section-label-primary mb-4">
          🎯 {LABELS.paramSection}
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <NumberInput
            label={LABELS.targetDigit}
            min={INPUT_LIMITS.targetDigit.min}
            max={INPUT_LIMITS.targetDigit.max}
            value={targetDigit}
            onChange={handleTargetChange}
          />
          
          <NumberInput
            label={LABELS.maxTsumScore}
            min={INPUT_LIMITS.tsumScore.searchMin}
            max={INPUT_LIMITS.tsumScore.max}
            value={maxTsumScore}
            onChange={handleMaxTsumChange}
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
        {chainCounts.map((n) => (
          <ChainResultCard
            key={n}
            chainCount={n}
            candidates={results[n] ?? []}
            maxDisplay={DISPLAY_CONFIG.maxStrategyCandidates}
          />
        ))}
      </div>

      {/* ヒント */}
      <div className="mt-6 px-4 py-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-sm">
        <div className="flex gap-3">
          <span className="flex-shrink-0">💡</span>
          <p>
            <strong>{LABELS.hint}:</strong> {TSUM_SCORE_INFO.hint}
          </p>
        </div>
      </div>
    </Card>
  );
}