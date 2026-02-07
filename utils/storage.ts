/**
 * ローカルストレージのユーティリティ関数
 */

const STORAGE_KEYS = {
  level: "tsumutsumu-user-level",
  targetDigit: "tsumutsumu-target-digit",
} as const;

/**
 * ローカルストレージから設定を読み込む
 */
export function loadSettings() {
  if (typeof window === "undefined") {
    return { level: null, targetDigit: null };
  }

  const savedLevel = localStorage.getItem(STORAGE_KEYS.level);
  const savedTargetDigit = localStorage.getItem(STORAGE_KEYS.targetDigit);

  return {
    level: savedLevel ? Number(savedLevel) : null,
    targetDigit: savedTargetDigit ? Number(savedTargetDigit) : null,
  };
}

/**
 * ローカルストレージに設定を保存する
 */
export function saveSettings(level: number, targetDigit: number) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(STORAGE_KEYS.level, String(level));
  localStorage.setItem(STORAGE_KEYS.targetDigit, String(targetDigit));
}
