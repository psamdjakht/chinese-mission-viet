"use client";
import type { User } from "@supabase/supabase-js";
import { getSupabaseClient } from "@/lib/supabase/client";
import { collectLocalData, hasLocalLearningData, restoreLocalData, type BackupPayload } from "@/lib/storage";
import { getLocalDataRevision, setLocalDataRevision } from "@/lib/data-events";

export const CLOUD_SYNC_STATUS_EVENT = "cm-cloud-sync-status";
export const CLOUD_SYNC_STATUS_KEY = "cm-cloud-sync-status";
const CLOUD_BOUND_USER_KEY = "cm-cloud-bound-user";

export interface CloudSyncStatus {
  state: "off" | "idle" | "syncing" | "saved" | "restored" | "error";
  message: string;
  at: string;
}

export interface CloudBackupRow {
  payload: BackupPayload;
  updated_at: string;
}

function learningScore(data: Record<string, string>): number {
  let score = 0;
  for (const [key, value] of Object.entries(data)) {
    try {
      if (key.includes("chinese-mission-completed")) score += (JSON.parse(value) as unknown[]).length * 10;
      else if (key.includes("chinese-mission-phrasebook")) score += (JSON.parse(value) as unknown[]).length * 2;
      else if (key.includes("chinese-mission-session-")) score += 3;
      else if (key.includes("chinese-mission-user")) {
        const user = JSON.parse(value) as { onboardingCompleted?: boolean };
        if (user.onboardingCompleted) score += 2;
      }
      else if (key === "chinese-mission-slots") {
        const slots = JSON.parse(value) as Array<{ name?: string }>;
        score += slots.filter((slot) => Boolean(slot.name?.trim())).length * 0.1;
      }
    } catch {}
  }
  return score;
}

function bindCloudUser(userId: string): void {
  if (typeof window !== "undefined") localStorage.setItem(CLOUD_BOUND_USER_KEY, userId);
}

export function publishCloudSyncStatus(state: CloudSyncStatus["state"], message: string): CloudSyncStatus {
  const status = { state, message, at: new Date().toISOString() } satisfies CloudSyncStatus;
  if (typeof window !== "undefined") {
    localStorage.setItem(CLOUD_SYNC_STATUS_KEY, JSON.stringify(status));
    window.dispatchEvent(new CustomEvent(CLOUD_SYNC_STATUS_EVENT, { detail: status }));
  }
  return status;
}

export function readCloudSyncStatus(): CloudSyncStatus {
  if (typeof window === "undefined") return { state: "idle", message: "Chưa đồng bộ", at: new Date(0).toISOString() };
  try {
    return JSON.parse(localStorage.getItem(CLOUD_SYNC_STATUS_KEY) || "null") || { state: "idle", message: "Chưa đồng bộ", at: new Date(0).toISOString() };
  } catch {
    return { state: "idle", message: "Chưa đồng bộ", at: new Date(0).toISOString() };
  }
}

export async function uploadCloudBackup(user: User): Promise<string> {
  const supabase = getSupabaseClient();
  if (!supabase) throw new Error("Supabase chưa được cấu hình.");
  const updatedAt = new Date().toISOString();
  setLocalDataRevision(updatedAt, false);
  publishCloudSyncStatus("syncing", "Đang lưu tiến độ lên Supabase…");
  const { error } = await supabase.from("learner_backups").upsert({ user_id: user.id, payload: collectLocalData(), updated_at: updatedAt }, { onConflict: "user_id" });
  if (error) {
    publishCloudSyncStatus("error", error.message);
    throw error;
  }
  bindCloudUser(user.id);
  publishCloudSyncStatus("saved", "Đã tự động lưu tiến độ của cả 10 slot.");
  return updatedAt;
}

export async function fetchCloudBackup(user: User): Promise<CloudBackupRow | null> {
  const supabase = getSupabaseClient();
  if (!supabase) throw new Error("Supabase chưa được cấu hình.");
  const { data, error } = await supabase.from("learner_backups").select("payload,updated_at").eq("user_id", user.id).maybeSingle();
  if (error) throw error;
  if (!data?.payload) return null;
  return data as CloudBackupRow;
}

export async function restoreCloudBackup(user: User): Promise<CloudBackupRow | null> {
  publishCloudSyncStatus("syncing", "Đang tải tiến độ từ Supabase…");
  const row = await fetchCloudBackup(user);
  if (!row) {
    publishCloudSyncStatus("idle", "Tài khoản chưa có bản sao trên Supabase.");
    return null;
  }
  restoreLocalData(row.payload, { replace: true, updatedAt: row.updated_at });
  bindCloudUser(user.id);
  publishCloudSyncStatus("restored", "Đã khôi phục tiến độ của cả 10 slot từ Supabase.");
  return row;
}

export async function reconcileCloudBackup(user: User): Promise<"uploaded" | "restored" | "unchanged"> {
  publishCloudSyncStatus("syncing", "Đang kiểm tra tiến độ gần nhất…");
  const cloud = await fetchCloudBackup(user);
  const localHasData = hasLocalLearningData();
  let localRevision = getLocalDataRevision();

  if (!cloud) {
    if (localHasData) {
      await uploadCloudBackup(user);
      return "uploaded";
    }
    publishCloudSyncStatus("idle", "Đã kết nối Supabase; chưa có tiến độ để lưu.");
    return "unchanged";
  }

  if (!localHasData) {
    restoreLocalData(cloud.payload, { replace: true, updatedAt: cloud.updated_at });
    bindCloudUser(user.id);
    publishCloudSyncStatus("restored", "Đã tự động tải tiến độ gần nhất từ Supabase.");
    return "restored";
  }

  const boundUser = typeof window !== "undefined" ? localStorage.getItem(CLOUD_BOUND_USER_KEY) : null;
  if (boundUser !== user.id) {
    const localScore = learningScore(collectLocalData().data);
    const cloudScore = learningScore(cloud.payload.data || {});
    if (cloudScore > localScore) {
      restoreLocalData(cloud.payload, { replace: true, updatedAt: cloud.updated_at });
      bindCloudUser(user.id);
      publishCloudSyncStatus("restored", "Đã ưu tiên bản Supabase có nhiều tiến độ hơn trên thiết bị mới.");
      return "restored";
    }
  }

  if (!localRevision) {
    localRevision = new Date().toISOString();
    setLocalDataRevision(localRevision, false);
    await uploadCloudBackup(user);
    return "uploaded";
  }

  const cloudTime = Date.parse(cloud.updated_at || "");
  const localTime = Date.parse(localRevision || "");
  if (Number.isFinite(cloudTime) && Number.isFinite(localTime) && cloudTime > localTime + 1500) {
    restoreLocalData(cloud.payload, { replace: true, updatedAt: cloud.updated_at });
    bindCloudUser(user.id);
    publishCloudSyncStatus("restored", "Đã tự động tải tiến độ mới hơn từ Supabase.");
    return "restored";
  }
  if (Number.isFinite(localTime) && (!Number.isFinite(cloudTime) || localTime > cloudTime + 1500)) {
    await uploadCloudBackup(user);
    return "uploaded";
  }
  publishCloudSyncStatus("saved", "Tiến độ trên thiết bị và Supabase đã đồng bộ.");
  return "unchanged";
}
