"use client";
import { useState, useCallback, ChangeEvent } from "react";
import Tabs from "../components/Tabs";
import NumberInput from "../components/ui/NumberInput";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { INPUT_LIMITS } from "../constants/config";

// =============================================================================
// 定数
// =============================================================================

const LABELS = {
  levelSettings: "ユーザーレベル設定",
  levelDescription: "レベルを設定してから各機能をご利用ください",
  userLevel: "ユーザーレベル",
  reset: "リセット",
} as const;

// =============================================================================
// スタイル定義
// =============================================================================

const levelCardStyles = [
  "bg-white/80",
  "border border-slate-200/60",
  "rounded-2xl",
  "p-5 sm:p-6",
  "backdrop-blur-sm",
].join(" ");

// =============================================================================
// メインコンポーネント
// =============================================================================

/**
 * メインページコンポーネント
 * ユーザーレベルの設定と各機能タブを表示
 */
export default function Page() {
  const [level, setLevel] = useState<number>(INPUT_LIMITS.level.default);

  // イベントハンドラ
  const handleLevelChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const clampedValue = Math.max(INPUT_LIMITS.level.min, Math.min(INPUT_LIMITS.level.max, value));
    setLevel(clampedValue);
  }, []);

  const handleReset = useCallback(() => {
    setLevel(INPUT_LIMITS.level.default);
  }, []);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* レベル設定カード */}
      <Card variant="glass">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              {LABELS.levelSettings}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {LABELS.levelDescription}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3 w-full sm:w-auto">
            <div className="sm:w-48">
              <NumberInput
                label={LABELS.userLevel}
                min={INPUT_LIMITS.level.min}
                max={INPUT_LIMITS.level.max}
                value={level}
                onChange={handleLevelChange}
              />
            </div>
            
            <Button variant="tertiary" onClick={handleReset}>
              🔄 {LABELS.reset}
            </Button>
          </div>
        </div>
      </Card>

      {/* メイン機能タブ */}
      <Tabs level={level} />
    </div>
  );
}