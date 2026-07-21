"use client";
import { useCallback, useEffect, useState } from "react";
import { getSlotItem, setSlotItem } from "@/lib/slots";

export interface LearningSettings {
  showPinyin: boolean;
  showTranslation: boolean;
  showWordGloss: boolean;
  showEnglish: boolean;
  autoplayVoice: boolean;
  speechRate: number;
  repeatCount: number;
}

export const defaults: LearningSettings = {
  showPinyin: true,
  showTranslation: true,
  showWordGloss: true,
  showEnglish: false,
  autoplayVoice: true,
  speechRate: 0.82,
  repeatCount: 3,
};

const KEY = "chinese-mission-settings";

export function readSettings() {
  if (typeof window === "undefined") return defaults;
  try {
    return { ...defaults, ...JSON.parse(getSlotItem(KEY) || "{}") };
  } catch {
    return defaults;
  }
}

export function saveSettings(value: LearningSettings) {
  setSlotItem(KEY, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent("cm-settings", { detail: value }));
}

export function useLearningSettings() {
  const [settings, setState] = useState(defaults);
  useEffect(() => {
    setState(readSettings());
    const handler = (event: Event) =>
      setState((event as CustomEvent<LearningSettings>).detail || readSettings());
    window.addEventListener("cm-settings", handler);
    return () => window.removeEventListener("cm-settings", handler);
  }, []);
  const updateSettings = useCallback(
    (partial: Partial<LearningSettings>) =>
      setState((current) => {
        const next = { ...current, ...partial };
        saveSettings(next);
        return next;
      }),
    [],
  );
  return { settings, updateSettings };
}
