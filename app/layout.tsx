import "./globals.css";
import type { ReactNode } from "react";
import Header from "../components/Header";
import { APP_CONFIG } from "../constants/config";

// =============================================================================
// メタデータ
// =============================================================================

export const metadata = {
  title: `${APP_CONFIG.name} - ${APP_CONFIG.subtitle}`,
  description: APP_CONFIG.description,
};

// =============================================================================
// スタイル定義
// =============================================================================

const containerStyles = [
  "min-h-screen",
  "bg-gradient-to-br from-slate-50 via-white to-indigo-50/30",
  "text-slate-900",
].join(" ");

const wrapperStyles = [
  "max-w-5xl mx-auto",
  "px-4 py-6",
  "sm:px-6 sm:py-8",
  "md:px-8 md:py-10",
].join(" ");

// =============================================================================
// レイアウトコンポーネント
// =============================================================================

/**
 * ルートレイアウト
 * アプリケーション全体の構造を定義
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className={containerStyles}>
        <div className={wrapperStyles}>
          {/* ヘッダー */}
          <Header />
          
          {/* メインコンテンツ */}
          <main className="mt-6 sm:mt-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}