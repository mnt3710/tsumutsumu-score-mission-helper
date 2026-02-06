"use client";
import React from "react";
import { cn } from "../../utils/classnames";

// =============================================================================
// 型定義
// =============================================================================

type ButtonVariant = "primary" | "secondary" | "tertiary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

// =============================================================================
// スタイル定義
// =============================================================================

const baseStyles = [
  "inline-flex items-center justify-center gap-2",
  "font-semibold",
  "transition-all duration-200",
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
].join(" ");

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-2 text-xs rounded-lg",
  md: "px-4 py-2.5 text-sm rounded-xl",
  lg: "px-6 py-3 text-base rounded-xl",
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    "bg-gradient-to-r from-indigo-600 to-indigo-500",
    "text-white",
    "shadow-md shadow-indigo-500/20",
    "hover:shadow-lg hover:shadow-indigo-500/30",
    "hover:from-indigo-700 hover:to-indigo-600",
    "active:scale-[0.98]",
    "focus-visible:ring-indigo-500",
  ].join(" "),
  secondary: [
    "bg-gradient-to-r from-violet-500 to-purple-500",
    "text-white",
    "shadow-md shadow-purple-500/20",
    "hover:shadow-lg hover:shadow-purple-500/30",
    "hover:from-violet-600 hover:to-purple-600",
    "active:scale-[0.98]",
    "focus-visible:ring-purple-500",
  ].join(" "),
  tertiary: [
    "bg-slate-100",
    "text-slate-700",
    "border border-slate-200",
    "hover:bg-slate-200 hover:border-slate-300",
    "active:bg-slate-300",
    "focus-visible:ring-slate-400",
  ].join(" "),
  ghost: [
    "bg-transparent",
    "text-slate-600",
    "hover:bg-slate-100",
    "active:bg-slate-200",
    "focus-visible:ring-slate-400",
  ].join(" "),
};

// =============================================================================
// コンポーネント
// =============================================================================

/**
 * ボタンコンポーネント
 * 
 * @param variant - ボタンのスタイルバリアント
 * @param size - ボタンのサイズ
 * @param fullWidth - 幅を100%にするかどうか
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  disabled = false,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        fullWidth && "w-full",
        className
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
