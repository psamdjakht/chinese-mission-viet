"use client";

export const LOCAL_DATA_CHANGED_EVENT = "cm-local-data-changed";
export const LOCAL_DATA_RESTORED_EVENT = "cm-local-data-restored";
export const LOCAL_UPDATED_AT_KEY = "chinese-mission-local-updated-at";

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function getLocalDataRevision(): string | null {
  if (!canUseStorage()) return null;
  return localStorage.getItem(LOCAL_UPDATED_AT_KEY);
}

export function setLocalDataRevision(value: string, emit = false): void {
  if (!canUseStorage()) return;
  localStorage.setItem(LOCAL_UPDATED_AT_KEY, value);
  if (emit) window.dispatchEvent(new CustomEvent(LOCAL_DATA_CHANGED_EVENT, { detail: { updatedAt: value } }));
}

export function markLocalDataChanged(): string {
  const updatedAt = new Date().toISOString();
  setLocalDataRevision(updatedAt, true);
  return updatedAt;
}

export function notifyLocalDataRestored(updatedAt: string): void {
  if (!canUseStorage()) return;
  setLocalDataRevision(updatedAt, false);
  window.dispatchEvent(new CustomEvent(LOCAL_DATA_RESTORED_EVENT, { detail: { updatedAt } }));
  window.dispatchEvent(new CustomEvent("cm-slots-changed"));
  window.dispatchEvent(new CustomEvent("cm-active-slot-changed"));
}
