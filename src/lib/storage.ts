"use client";
import { getActiveSlot, getSlotItem, setSlotItem } from "@/lib/slots";
import { notifyLocalDataRestored } from "@/lib/data-events";

const PREFIX = "chinese-mission";
const ACT = `${PREFIX}-activity`;

export interface BackupPayload {
  app: "Chinese Mission Việt";
  version: 2 | 3 | 4;
  exportedAt: string;
  data: Record<string, string>;
}

const day = (date = new Date()) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

export function recordStudyActivity() {
  let activity: { dates: string[]; lastStudyAt?: string } = { dates: [] };
  try { activity = JSON.parse(getSlotItem(ACT) || '{"dates":[]}'); } catch {}
  setSlotItem(ACT, JSON.stringify({ dates: Array.from(new Set([...(activity.dates || []), day()])), lastStudyAt: new Date().toISOString() }));
}

export function getStudyStreak() {
  let dates: string[] = [];
  try { dates = JSON.parse(getSlotItem(ACT) || '{"dates":[]}').dates || []; } catch { return 0; }
  const set = new Set(dates);
  const date = new Date();
  if (!set.has(day(date))) date.setDate(date.getDate() - 1);
  let streak = 0;
  while (set.has(day(date))) { streak += 1; date.setDate(date.getDate() - 1); }
  return streak;
}

export function collectLocalData(): BackupPayload {
  const data: Record<string, string> = {};
  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index);
    if (key?.startsWith(PREFIX)) data[key] = localStorage.getItem(key) || "";
  }
  return { app: "Chinese Mission Việt", version: 4, exportedAt: new Date().toISOString(), data };
}

export function hasLocalLearningData(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const slots = JSON.parse(localStorage.getItem("chinese-mission-slots") || "[]") as Array<{ name?: string }>;
    if (slots.some((slot) => Boolean(slot.name?.trim()))) return true;
  } catch {}
  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index);
    if (key?.startsWith(PREFIX) && key.includes("::slot=")) return true;
  }
  return false;
}

export function restoreLocalData(payload: BackupPayload, options: { replace?: boolean; updatedAt?: string } = {}) {
  if (payload?.app !== "Chinese Mission Việt" || !payload.data) throw new Error("Tệp sao lưu không đúng định dạng.");
  if (options.replace) {
    const remove: string[] = [];
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (key?.startsWith(PREFIX)) remove.push(key);
    }
    remove.forEach((key) => localStorage.removeItem(key));
  }
  Object.entries(payload.data).forEach(([key, value]) => {
    if (key.startsWith(PREFIX)) localStorage.setItem(key, value);
  });
  notifyLocalDataRestored(options.updatedAt || payload.exportedAt || new Date().toISOString());
}

export function downloadBackup() {
  const backup = new Blob([JSON.stringify(collectLocalData(), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(backup);
  const anchor = document.createElement("a");
  const slotName = getActiveSlot()?.name.replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "") || "tat-ca-slot";
  anchor.href = url;
  anchor.download = `chinese-mission-viet-${slotName}-${day()}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}
