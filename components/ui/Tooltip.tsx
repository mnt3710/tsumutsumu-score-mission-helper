"use client";
import { ReactNode, useState } from "react";

interface TooltipProps {
  /** ツールチップの内容 */
  content: string;
  /** トリガーとなる要素 */
  children: ReactNode;
  /** 位置（デフォルト: top） */
  position?: "top" | "bottom" | "left" | "right";
}

/**
 * ツールチップコンポーネント
 * ホバーまたはフォーカス時に説明テキストを表示
 */
export default function Tooltip({ content, children, position = "right" }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-0 ml-3",
  };

  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-[rgba(51,65,85,0.85)]",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-[rgba(51,65,85,0.85)]",
    left: "left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-[rgba(51,65,85,0.85)]",
    right: "right-full top-3 border-t-transparent border-b-transparent border-l-transparent border-r-[rgba(51,65,85,0.85)]",
  };

  return (
    <div className="relative inline-flex items-center">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        tabIndex={0}
        className="cursor-help focus:outline-none"
      >
        {children}
      </div>
      
      {isVisible && (
        <div
          className={`absolute z-50 ${positionClasses[position]} pointer-events-none`}
          role="tooltip"
        >
          {/* ツールチップ本体 */}
          <div
            style={{ background: "rgba(51,65,85,0.85)" }}
            className="text-white text-sm leading-relaxed rounded-lg px-4 py-3 shadow-xl min-w-[280px] max-w-[400px] whitespace-normal"
          >
            {content}
          </div>
          {/* 矢印 */}
          <div
            className={`absolute w-0 h-0 border-4 border-t-[rgba(51,65,85,0.85)] ${arrowClasses[position]}`}
          />
        </div>
      )}
    </div>
  );
}
