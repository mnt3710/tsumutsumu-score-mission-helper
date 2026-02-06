"use client";
import React, { InputHTMLAttributes } from "react";
import { cn } from "../../utils/classnames";

// =============================================================================
// 型定義
// =============================================================================

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helper?: string;
  error?: string;
}

// =============================================================================
// スタイル定義
// =============================================================================

const inputStyles = [
  "w-full",
  "px-4 py-3",
  "text-base font-medium",
  "bg-white",
  "border border-slate-200",
  "rounded-xl",
  "transition-all duration-200",
  "placeholder:text-slate-400",
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
  "block",
  "mb-1.5",
  "text-sm font-medium",
  "text-slate-700",
].join(" ");

// =============================================================================
// コンポーネント
// =============================================================================

/**
 * テキスト入力コンポーネント
 * 
 * @param label - 入力フィールドのラベル
 * @param helper - ヘルパーテキスト
 * @param error - エラーメッセージ
 */
export default function Input({
  label,
  helper,
  error,
  className = "",
  ...rest
}: InputProps) {
  return (
    <div>
      {label && <label className={labelStyles}>{label}</label>}
      
      <input
        className={cn(
          inputStyles,
          error && "border-red-400 focus:border-red-400 focus:ring-red-100",
          className
        )}
        {...rest}
      />
      
      {helper && !error && (
        <p className="mt-1.5 text-xs text-slate-500">{helper}</p>
      )}
      
      {error && (
        <p className="mt-1.5 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}
