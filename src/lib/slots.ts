"use client";
import { markLocalDataChanged } from "@/lib/data-events";

export const SLOT_COUNT = 10;
const SLOT_REGISTRY_KEY = "chinese-mission-slots";
const ACTIVE_SLOT_KEY = "chinese-mission-active-slot";
const SLOT_SUFFIX = "::slot=";

export interface LearnerSlot {
  id: string;
  index: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

const defaults = (): LearnerSlot[] =>
  Array.from({ length: SLOT_COUNT }, (_, index) => ({
    id: `slot-${index + 1}`,
    index: index + 1,
    name: "",
  }));

function safeWindow(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function migrateLegacyData(): void {
  if (!safeWindow()) return;
  const alreadyMigrated = localStorage.getItem("chinese-mission-slot-migration-v1");
  if (alreadyMigrated) return;
  const legacyUser = localStorage.getItem("chinese-mission-user");
  if (!legacyUser) {
    localStorage.setItem("chinese-mission-slot-migration-v1", "done");
    return;
  }

  const slotId = "slot-1";
  const keys: string[] = [];
  for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i);
    if (
      key?.startsWith("chinese-mission-") &&
      !key.includes(SLOT_SUFFIX) &&
      ![SLOT_REGISTRY_KEY, ACTIVE_SLOT_KEY, "chinese-mission-slot-migration-v1"].includes(key)
    ) {
      keys.push(key);
    }
  }
  for (const key of keys) {
    const value = localStorage.getItem(key);
    if (value !== null) localStorage.setItem(`${key}${SLOT_SUFFIX}${slotId}`, value);
  }

  let legacyName = "Người học 1";
  try {
    const parsed = JSON.parse(legacyUser) as { name?: string };
    if (parsed?.name?.trim()) legacyName = parsed.name.trim();
  } catch {}
  const slots = defaults();
  slots[0] = {
    ...slots[0],
    name: legacyName,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(SLOT_REGISTRY_KEY, JSON.stringify(slots));
  localStorage.setItem(ACTIVE_SLOT_KEY, slotId);
  localStorage.setItem("chinese-mission-slot-migration-v1", "done");
}

export function getLearnerSlots(): LearnerSlot[] {
  if (!safeWindow()) return defaults();
  migrateLegacyData();
  try {
    const stored = JSON.parse(localStorage.getItem(SLOT_REGISTRY_KEY) || "[]") as LearnerSlot[];
    const byId = new Map(stored.map((slot) => [slot.id, slot]));
    return defaults().map((slot) => ({ ...slot, ...(byId.get(slot.id) || {}) }));
  } catch {
    return defaults();
  }
}

export function saveLearnerSlotName(slotId: string, name: string): LearnerSlot[] {
  const cleaned = name.trim().slice(0, 40);
  const now = new Date().toISOString();
  const slots = getLearnerSlots().map((slot) =>
    slot.id === slotId
      ? {
          ...slot,
          name: cleaned,
          createdAt: slot.createdAt || now,
          updatedAt: now,
        }
      : slot,
  );
  localStorage.setItem(SLOT_REGISTRY_KEY, JSON.stringify(slots));
  markLocalDataChanged();
  window.dispatchEvent(new CustomEvent("cm-slots-changed", { detail: slots }));
  return slots;
}

export function getActiveSlotId(): string | null {
  if (!safeWindow()) return null;
  migrateLegacyData();
  const id = localStorage.getItem(ACTIVE_SLOT_KEY);
  if (!id) return null;
  const slot = getLearnerSlots().find((item) => item.id === id);
  return slot?.name ? id : null;
}

export function setActiveSlotId(slotId: string): void {
  const slot = getLearnerSlots().find((item) => item.id === slotId);
  if (!slot?.name) throw new Error("Vui lòng đặt tên cho slot học trước.");
  localStorage.setItem(ACTIVE_SLOT_KEY, slotId);
  markLocalDataChanged();
  window.dispatchEvent(new CustomEvent("cm-active-slot-changed", { detail: slotId }));
}

export function clearActiveSlot(): void {
  if (!safeWindow()) return;
  localStorage.removeItem(ACTIVE_SLOT_KEY);
  markLocalDataChanged();
}

export function getActiveSlot(): LearnerSlot | null {
  const id = getActiveSlotId();
  return id ? getLearnerSlots().find((slot) => slot.id === id) || null : null;
}

export function slotStorageKey(baseKey: string, slotId?: string | null): string {
  const id = slotId || getActiveSlotId();
  if (!id) throw new Error("Chưa chọn slot học.");
  return `${baseKey}${SLOT_SUFFIX}${id}`;
}

export function getSlotItem(baseKey: string, slotId?: string | null): string | null {
  if (!safeWindow()) return null;
  try {
    return localStorage.getItem(slotStorageKey(baseKey, slotId));
  } catch {
    return null;
  }
}

export function setSlotItem(baseKey: string, value: string, slotId?: string | null): void {
  if (!safeWindow()) return;
  localStorage.setItem(slotStorageKey(baseKey, slotId), value);
  markLocalDataChanged();
}

export function removeSlotItem(baseKey: string, slotId?: string | null): void {
  if (!safeWindow()) return;
  try {
    localStorage.removeItem(slotStorageKey(baseKey, slotId));
    markLocalDataChanged();
  } catch {}
}

export function getSlotProgress(slotId: string): { completed: number; phraseCount: number; onboarded: boolean } {
  if (!safeWindow()) return { completed: 0, phraseCount: 0, onboarded: false };
  try {
    const completed = JSON.parse(getSlotItem("chinese-mission-completed", slotId) || "[]") as string[];
    const phrases = JSON.parse(getSlotItem("chinese-mission-phrasebook", slotId) || "[]") as unknown[];
    const user = JSON.parse(getSlotItem("chinese-mission-user", slotId) || "null") as { onboardingCompleted?: boolean } | null;
    return {
      completed: Array.isArray(completed) ? completed.length : 0,
      phraseCount: Array.isArray(phrases) ? phrases.length : 0,
      onboarded: Boolean(user?.onboardingCompleted),
    };
  } catch {
    return { completed: 0, phraseCount: 0, onboarded: false };
  }
}

export function resetLearnerSlot(slotId: string): void {
  if (!safeWindow()) return;
  const suffix = `${SLOT_SUFFIX}${slotId}`;
  const toRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i);
    if (key?.endsWith(suffix)) toRemove.push(key);
  }
  toRemove.forEach((key) => localStorage.removeItem(key));
  const slots = getLearnerSlots().map((slot) =>
    slot.id === slotId ? { ...slot, name: "", createdAt: undefined, updatedAt: undefined } : slot,
  );
  localStorage.setItem(SLOT_REGISTRY_KEY, JSON.stringify(slots));
  if (localStorage.getItem(ACTIVE_SLOT_KEY) === slotId) localStorage.removeItem(ACTIVE_SLOT_KEY);
  markLocalDataChanged();
  window.dispatchEvent(new CustomEvent("cm-slots-changed", { detail: slots }));
}

export function renameActiveSlot(name: string): void {
  const id = getActiveSlotId();
  if (!id) throw new Error("Chưa chọn slot học.");
  saveLearnerSlotName(id, name);
}
