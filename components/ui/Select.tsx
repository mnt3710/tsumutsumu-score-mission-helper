"use client";
import React, { SelectHTMLAttributes } from "react";
import { cn } from "../../utils/classnames";

// =============================================================================
// 型定義
// =============================================================================

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  label?: string;
  options: SelectOption[];
  helper?: string;
  error?: string;
}

// =============================================================================
// スタイル定義
// =============================================================================

const selectStyles = [
  "w-full",
  "px-4 py-3",
  "pr-10",
  "text-base font-medium",
  "bg-white",
  "border border-slate-200",
  "rounded-lg",
  "appearance-none",
  "cursor-pointer",
  "transition-all duration-200",
  // Focus状態
  "focus:outline-none",
  "focus:border-indigo-400",
  "focus:ring-2 focus:ring-indigo-100",
  // Disabled状態
  "disabled:bg-slate-50",
  "disabled:text-slate-400",
  "disabled:cursor-not-allowed",
].join(" ");

const labelStyles = [
  "absolute",
  "-top-2.5",
  "left-3",
  "px-1",
  "text-xs font-medium",
  "text-slate-500",
  "bg-white",
  "pointer-events-none",
].join(" ");

// =============================================================================
// コンポーネント
// =============================================================================

/**
 * セレクトコンポーネント
 * 
 * @param label - 入力フィールドのラベル
 * @param options - 選択肢の配列
 * @param helper - ヘルパーテキスト
 * @param error - エラーメッセージ
 */
export default function Select({
  label,
  options,
  helper,
  error,
  className = "",
  ...rest
}: SelectProps) {
  return (
    <div className="relative">
      <select
        className={cn(
          selectStyles,
          error && "border-red-400 focus:border-red-400 focus:ring-red-100",
          className
        )}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {label && <label className={labelStyles}>{label}</label>}
      
      {/* カスタム矢印アイコン */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <svg
          className="h-5 w-5 text-slate-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      
      {helper && !error && (
        <p className="mt-1.5 text-xs text-slate-500">{helper}</p>
      )}
      
      {error && (
        <p className="mt-1.5 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}
