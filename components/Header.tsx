"use client";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { APP_CONFIG } from "../constants/config";

// =============================================================================
// スタイル定義
// =============================================================================

const containerStyles = [
  "bg-gradient-to-r from-white via-white to-indigo-50/30",
  "rounded-2xl",
  "p-4 sm:p-5 md:p-6",
  "border border-slate-200/60",
].join(" ");

const iconContainerStyles = [
  "w-12 h-12 sm:w-14 sm:h-14",
  "rounded-xl",
  "flex items-center justify-center",
  "text-white",
  "shadow-lg shadow-indigo-500/25",
  "flex-shrink-0",
  "bg-gradient-to-br from-indigo-500 to-pink-500",
].join(" ");

const versionBadgeStyles = [
  "inline-flex items-center",
  "px-2.5 py-1",
  "rounded-full",
  "text-xs font-semibold",
  "bg-gradient-to-r from-indigo-100 to-pink-100",
  "text-indigo-700",
  "border border-indigo-200/50",
].join(" ");

// =============================================================================
// コンポーネント
// =============================================================================

/**
 * ヘッダーコンポーネント
 * アプリケーションのタイトルとバージョン情報を表示
 */
export default function Header() {
  return (
    <header className={containerStyles}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* ロゴとタイトル */}
        <div className="flex items-center gap-3 sm:gap-4 flex-1">
          <div className={iconContainerStyles}>
            <SparklesIcon className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900">
              {APP_CONFIG.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {APP_CONFIG.subtitle}
            </p>
          </div>
        </div>
        
        {/* バージョン情報 */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={versionBadgeStyles}>
            {APP_CONFIG.version}
          </span>
        </div>
      </div>
    </header>
  );
}
