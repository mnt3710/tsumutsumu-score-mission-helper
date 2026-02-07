"use client";
import { useState, useEffect } from "react";
import Tabs from "../components/Tabs";
import CommonSettings from "../components/CommonSettings";
import { INPUT_LIMITS } from "../constants/config";
import { loadSettings } from "../utils/storage";

// =============================================================================
// メインコンポーネント
// =============================================================================

/**
 * メインページコンポーネント
 * ユーザーレベルの設定と各機能タブを表示
 */
export default function Page() {
  const [level, setLevel] = useState<number>(INPUT_LIMITS.level.default);
  const [targetDigit, setTargetDigit] = useState<number>(INPUT_LIMITS.targetDigit.default);

  // localStorageから初期値を読み込み
  useEffect(() => {
    const settings = loadSettings();
    
    if (settings.level !== null && !isNaN(settings.level)) {
      setLevel(settings.level);
    }
    
    if (settings.targetDigit !== null && !isNaN(settings.targetDigit)) {
      setTargetDigit(settings.targetDigit);
    }
  }, []);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* 共通設定カード */}
      <CommonSettings
        level={level}
        targetDigit={targetDigit}
        onLevelChange={setLevel}
        onTargetDigitChange={setTargetDigit}
      />

      {/* メイン機能タブ */}
      <Tabs level={level} targetDigit={targetDigit} onTargetDigitChange={setTargetDigit} />
    </div>
  );
}