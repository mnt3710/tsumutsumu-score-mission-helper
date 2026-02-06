"use client";
import React, { ReactNode } from "react";
import { cn } from "../../utils/classnames";

// =============================================================================
// 型定義
// =============================================================================

type CardVariant = "default" | "highlight" | "glass";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: CardVariant;
  compact?: boolean;
  noPadding?: boolean;
}

// =============================================================================
// スタイル定義
// =============================================================================

const baseStyles = [
  "rounded-2xl",
  "border",
  "backdrop-blur-sm",
  "transition-all duration-200",
].join(" ");

const spacingStyles = {
  default: "p-5 sm:p-6 md:p-8",
  compact: "p-4 sm:p-5",
  none: "",
};

const variantStyles: Record<CardVariant, string> = {
  default: [
    "bg-white/95",
    "border-slate-200/60",
    "shadow-sm",
  ].join(" "),
  highlight: [
    "bg-gradient-to-br from-white via-indigo-50/30 to-white",
    "border-indigo-200/50",
    "shadow-md shadow-indigo-500/5",
  ].join(" "),
  glass: [
    "bg-white/80",
    "border-white/50",
    "shadow-lg shadow-slate-900/5",
  ].join(" "),
};

// =============================================================================
// コンポーネント
// =============================================================================

/**
 * カードコンポーネント
 * コンテンツを囲むコンテナとして使用
 * 
 * @param variant - カードのスタイルバリアント
 * @param compact - コンパクトなパディングを使用
 * @param noPadding - パディングなし
 */
export default function Card({
  children,
  className = "",
  variant = "default",
  compact = false,
  noPadding = false,
}: CardProps) {
  const spacing = noPadding ? "none" : compact ? "compact" : "default";

  return (
    <div
      className={cn(
        baseStyles,
        variantStyles[variant],
        spacingStyles[spacing],
        className
      )}
    >
      {children}
    </div>
  );
}
