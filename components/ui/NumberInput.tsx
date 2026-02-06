"use client";
import React, { InputHTMLAttributes } from "react";
import { cn } from "../../utils/classnames";

// =============================================================================
// 型定義
// =============================================================================

interface NumberInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
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
  "absolute",
  "left-4 top-3",
  "text-xs font-medium",
  "text-slate-500",
  "pointer-events-none",
  "transition-all duration-200",
  "origin-left",
].join(" ");

const labelFloatedStyles = [
  "-translate-y-6",
  "scale-90",
  "text-indigo-600",
  "bg-white",
  "px-1",
  "-ml-1",
].join(" ");

// =============================================================================
// コンポーネント
// =============================================================================

/**
 * 数値入力コンポーネント
 * フローティングラベル付きの入力フィールド
 * 
 * @param label - フローティングラベル
 * @param helper - ヘルパーテキスト
 * @param error - エラーメッセージ
 */
export default function NumberInput({
  label,
  helper,
  error,
  className = "",
  ...rest
}: NumberInputProps) {
  const hasValue = rest.value !== "" && rest.value !== undefined;

  return (
    <div className="relative">
      <input
        type="number"
        placeholder=" "
        className={cn(
          inputStyles,
          error && "border-red-400 focus:border-red-400 focus:ring-red-100",
          className
        )}
        {...rest}
      />
      
      {label && (
        <span
          className={cn(
            labelStyles,
            hasValue && labelFloatedStyles,
            "peer-focus:-translate-y-6 peer-focus:scale-90 peer-focus:text-indigo-600 peer-focus:bg-white peer-focus:px-1 peer-focus:-ml-1",
            "[input:not(:placeholder-shown)~&]:-translate-y-6",
            "[input:not(:placeholder-shown)~&]:scale-90",
            "[input:not(:placeholder-shown)~&]:text-indigo-600",
            "[input:not(:placeholder-shown)~&]:bg-white",
            "[input:not(:placeholder-shown)~&]:px-1",
            "[input:not(:placeholder-shown)~&]:-ml-1",
            "[input:focus~&]:-translate-y-6",
            "[input:focus~&]:scale-90",
            "[input:focus~&]:text-indigo-600",
            "[input:focus~&]:bg-white",
            "[input:focus~&]:px-1",
            "[input:focus~&]:-ml-1"
          )}
        >
          {label}
        </span>
      )}
      
      {helper && !error && (
        <p className="mt-1.5 text-xs text-slate-500">{helper}</p>
      )}
      
      {error && (
        <p className="mt-1.5 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}
