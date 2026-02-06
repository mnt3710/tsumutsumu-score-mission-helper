"use client";
import React from "react";
import { cn } from "../../utils/classnames";

// =============================================================================
// 型定義
// =============================================================================

type BadgeVariant = "primary" | "success" | "error" | "warning" | "secondary";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

// =============================================================================
// スタイル定義
// =============================================================================

const baseStyles = "inline-flex items-center gap-1.5 font-semibold rounded-full";

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
};

const variantStyles: Record<BadgeVariant, string> = {
  primary: [
    "bg-gradient-to-r from-indigo-100 to-indigo-50",
    "text-indigo-700",
    "border border-indigo-200/50",
  ].join(" "),
  success: [
    "bg-gradient-to-r from-emerald-100 to-emerald-50",
    "text-emerald-700",
    "border border-emerald-200/50",
  ].join(" "),
  error: [
    "bg-gradient-to-r from-red-100 to-red-50",
    "text-red-700",
    "border border-red-200/50",
  ].join(" "),
  warning: [
    "bg-gradient-to-r from-amber-100 to-amber-50",
    "text-amber-700",
    "border border-amber-200/50",
  ].join(" "),
  secondary: [
    "bg-slate-100",
    "text-slate-600",
    "border border-slate-200",
  ].join(" "),
};

// =============================================================================
// コンポーネント
// =============================================================================

/**
 * バッジコンポーネント
 * ステータスやカテゴリを表示するラベル
 * 
 * @param variant - バッジのスタイルバリアント
 * @param size - バッジのサイズ
 */
export default function Badge({
  children,
  variant = "primary",
  size = "md",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
