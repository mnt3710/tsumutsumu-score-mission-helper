"use client";
import React from "react";
import { cn } from "../../utils/classnames";

// =============================================================================
// 型定義
// =============================================================================

interface ModalProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

// =============================================================================
// スタイル定義
// =============================================================================

const containerStyles = "w-full max-w-4xl mx-auto";

const cardStyles = [
  "bg-white/95",
  "backdrop-blur-sm",
  "rounded-2xl",
  "shadow-xl shadow-slate-900/5",
  "border border-slate-200/60",
  "overflow-hidden",
].join(" ");

const headerStyles = [
  "px-6 py-5",
  "sm:px-8 sm:py-6",
  "border-b border-slate-100",
  "bg-gradient-to-r from-slate-50 via-white to-indigo-50/30",
].join(" ");

const contentStyles = "p-6 sm:p-8";

const footerStyles = [
  "px-6 py-4",
  "sm:px-8 sm:py-5",
  "border-t border-slate-100",
  "bg-gradient-to-r from-slate-50 to-white",
].join(" ");

// =============================================================================
// コンポーネント
// =============================================================================

/**
 * モーダル/カードラッパーコンポーネント
 * メインコンテンツを囲むコンテナとして使用
 * 
 * @param title - ヘッダーのタイトル
 * @param description - ヘッダーの説明文
 * @param footer - フッターコンテンツ
 */
export default function Modal({
  title,
  description,
  children,
  footer,
  className = "",
}: ModalProps) {
  const hasHeader = title || description;

  return (
    <div className={cn(containerStyles, className)}>
      <div className={cardStyles}>
        {hasHeader && (
          <div className={headerStyles}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                {title && (
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {title}
                  </h1>
                )}
                {description && (
                  <p className="mt-1 text-sm text-slate-500">
                    {description}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
        
        <div className={contentStyles}>
          {children}
        </div>
        
        {footer && (
          <div className={footerStyles}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
