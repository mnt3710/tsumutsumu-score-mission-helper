"use client";
import { useState, useCallback, useEffect, ChangeEvent } from "react";
import NumberInput from "./ui/NumberInput";
import Select from "./ui/Select";
import Button from "./ui/Button";
import Card from "./ui/Card";
import Tooltip from "./ui/Tooltip";
import { INPUT_LIMITS } from "../constants/config";
import { getLevelBonusRatePercent } from "../utils/levelBonus";

// =============================================================================
// 型定義
// =============================================================================

interface CommonSettingsProps {
  /** ユーザーレベル */
  level: number;
  /** 目標の一の位 */
  targetDigit: number;
  /** レベル変更時のコールバック */
  onLevelChange: (level: number) => void;
  /** 目標の一の位変更時のコールバック */
  onTargetDigitChange: (digit: number) => void;
}

// =============================================================================
// 定数
// =============================================================================

const LABELS = {
  commonSettings: "共通設定",
  settingsDescription: "レベルと目標を設定してから各機能をご利用ください",
  userLevelSection: "ユーザーレベル",
  userLevelTooltip: "ツムツムのプレイヤーレベルを入力してください。レベルが高いほどスコアにボーナスが加算されます。",
  targetDigitSection: "目標の一の位",
  targetDigitTooltip: "達成したいスコアの一の位（0〜9）を選択してください。スコアミッションで指定された数字を選びます。",
  userLevel: "レベル",
  targetDigit: "一の位",
  save: "保存",
} as const;

const STORAGE_KEYS = {
  level: "tsumutsumu-user-level",
  targetDigit: "tsumutsumu-target-digit",
} as const;

const TARGET_DIGIT_OPTIONS = Array.from({ length: 10 }, (_, i) => ({
  value: i,
  label: String(i),
}));

// =============================================================================
// メインコンポーネント
// =============================================================================

/**
 * 共通設定コンポーネント
 * ユーザーレベルと目標の一の位を設定
 */
export default function CommonSettings({
  level,
  targetDigit,
  onLevelChange,
  onTargetDigitChange,
}: CommonSettingsProps) {
  const [levelInput, setLevelInput] = useState<string>(String(level));

  // levelが外部から変更された場合、levelInputも更新
  useEffect(() => {
    setLevelInput(String(level));
  }, [level]);

  // レベル入力の変更
  const handleLevelChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLevelInput(value);
    
    // 空文字の場合は何もしない（Backspaceで空にできるように）
    if (value === "") {
      return;
    }
    
    const numValue = Number(value);
    if (!isNaN(numValue)) {
      const clampedValue = Math.max(INPUT_LIMITS.level.min, Math.min(INPUT_LIMITS.level.max, numValue));
      onLevelChange(clampedValue);
    }
  }, [onLevelChange]);

  // レベル入力のフォーカスアウト
  const handleLevelBlur = useCallback(() => {
    // フォーカスを外したときに空なら、デフォルト値を設定
    if (levelInput === "") {
      onLevelChange(INPUT_LIMITS.level.default);
      setLevelInput(String(INPUT_LIMITS.level.default));
    } else {
      // 入力値とlevelが異なる場合（クランプされた場合）、表示を更新
      setLevelInput(String(level));
    }
  }, [levelInput, level, onLevelChange]);

  // 目標の一の位の変更
  const handleTargetDigitChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    onTargetDigitChange(Number(e.target.value));
  }, [onTargetDigitChange]);

  // 設定の保存
  const handleSave = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.level, String(level));
      localStorage.setItem(STORAGE_KEYS.targetDigit, String(targetDigit));
    }
  }, [level, targetDigit]);

  return (
    <Card variant="glass">
      {/* ヘッダー */}
      <div className="pb-5 border-b border-slate-200/60">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          {LABELS.commonSettings}
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          {LABELS.settingsDescription}
        </p>
      </div>

      {/* 設定項目 */}
      <div className="space-y-6 pt-5">
        {/* ユーザーレベル設定 */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
            <span className="text-xl">📊</span>
            <span>{LABELS.userLevelSection}</span>
            <Tooltip content={LABELS.userLevelTooltip}>
              <span className="inline-flex items-center justify-center w-4 h-4 text-xs text-white bg-slate-400 rounded-full hover:bg-slate-500 transition-colors">
                i
              </span>
            </Tooltip>
          </h3>
          
          <div className="space-y-3 pl-1">
            {/* レベル入力 */}
            <NumberInput
              label={LABELS.userLevel}
              min={INPUT_LIMITS.level.min}
              max={INPUT_LIMITS.level.max}
              value={levelInput}
              onChange={handleLevelChange}
              onBlur={handleLevelBlur}
            />
            
            {/* レベルボーナス表示 */}
            <div className="inline-flex items-center gap-3 text-sm text-slate-700 font-medium px-4 py-2 bg-blue-50/50 border border-blue-100 rounded-lg">
              <span className="text-slate-600">ボーナス</span>
              <span className="text-blue-600 font-bold text-base">{getLevelBonusRatePercent(level).toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* 区切り線 */}
        <div className="border-t border-slate-200/60"></div>

        {/* 目標の一の位設定 */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
            <span className="text-xl">🎯</span>
            <span>{LABELS.targetDigitSection}</span>
            <Tooltip content={LABELS.targetDigitTooltip}>
              <span className="inline-flex items-center justify-center w-4 h-4 text-xs text-white bg-slate-400 rounded-full hover:bg-slate-500 transition-colors">
                i
              </span>
            </Tooltip>
          </h3>
          <div className="pl-1">
            <Select
              label={LABELS.targetDigit}
              value={targetDigit}
              onChange={handleTargetDigitChange}
              options={TARGET_DIGIT_OPTIONS}
            />
          </div>
        </div>

        {/* 保存ボタン */}
        <div className="flex justify-center pt-4 border-t border-slate-200/60">
          <Button variant="primary" onClick={handleSave} className="w-full sm:w-auto sm:min-w-[200px]">
            💾 {LABELS.save}
          </Button>
        </div>
      </div>
    </Card>
  );
}
