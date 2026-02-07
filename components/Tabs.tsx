"use client";
import { useState, useMemo } from "react";
import { Tab } from "@headlessui/react";
import CurrentCheck from "./CurrentCheck";
import StrategySuggest from "./StrategySuggest";
import TargetList from "./TargetList";
import { TAB_CONFIG } from "../constants/config";
import { cn } from "../utils/classnames";

// =============================================================================
// 型定義
// =============================================================================

interface TabsProps {
  /** ユーザーレベル */
  level: number;
  /** 目標の一の位 */
  targetDigit: number;
  /** 目標の一の位変更ハンドラ */
  onTargetDigitChange: (value: number) => void;
}

// =============================================================================
// スタイル定義
// =============================================================================

const tabListStyles = [
  "flex",
  "gap-1",
  "p-1",
  "bg-slate-100/80",
  "rounded-xl",
  "mb-6",
].join(" ");

const getTabButtonStyles = (selected: boolean) =>
  cn(
    "flex-1",
    "px-3 py-2.5 sm:px-4 sm:py-3",
    "text-xs sm:text-sm font-semibold",
    "rounded-lg",
    "transition-all duration-200",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
    "whitespace-nowrap",
    selected
      ? "bg-white text-indigo-600 shadow-sm"
      : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
  );

const tabPanelStyles = [
  "focus:outline-none",
  "tab-panel-enter",
].join(" ");

// =============================================================================
// コンポーネント
// =============================================================================

/**
 * タブコンポーネント
 * 3つの機能（現在スコア判定、攻略方法提案、目標達成スコア一覧）を切り替える
 */
export default function Tabs({ level, targetDigit, onTargetDigitChange }: TabsProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // タブパネルの内容をメモ化
  const panels = useMemo(
    () => [
      <CurrentCheck key="current-check" level={level} targetDigit={targetDigit} onTargetDigitChange={onTargetDigitChange} />,
      <StrategySuggest key="strategy-suggest" level={level} targetDigit={targetDigit} onTargetDigitChange={onTargetDigitChange} />,
      <TargetList key="target-list" level={level} targetDigit={targetDigit} onTargetDigitChange={onTargetDigitChange} />,
    ],
    [level, targetDigit, onTargetDigitChange]
  );

  return (
    <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
      {/* タブリスト */}
      <Tab.List className={tabListStyles}>
        {TAB_CONFIG.items.map((tab) => (
          <Tab
            key={tab.id}
            className={({ selected }) => getTabButtonStyles(selected)}
          >
            <span className="hidden sm:inline mr-1.5">{tab.icon}</span>
            <span>{tab.label}</span>
          </Tab>
        ))}
      </Tab.List>

      {/* タブパネル */}
      <Tab.Panels>
        {panels.map((panel, index) => (
          <Tab.Panel key={TAB_CONFIG.items[index].id} className={tabPanelStyles}>
            {panel}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}