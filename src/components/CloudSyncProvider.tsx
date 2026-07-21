"use client";
import { useEffect, useRef } from "react";
import type { User } from "@supabase/supabase-js";
import { LOCAL_DATA_CHANGED_EVENT } from "@/lib/data-events";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { publishCloudSyncStatus, reconcileCloudBackup, uploadCloudBackup } from "@/lib/supabase/sync";

export default function CloudSyncProvider() {
  const userRef = useRef<User | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const syncingRef = useRef(false);
  const pendingRef = useRef(false);
  const initializedUserRef = useRef<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      publishCloudSyncStatus("off", "Supabase chưa được cấu hình; tiến độ vẫn lưu trên thiết bị.");
      return;
    }
    const supabase = getSupabaseClient();
    if (!supabase) return;
    let active = true;

    const push = async () => {
      const user = userRef.current;
      if (!user) return;
      if (syncingRef.current) {
        pendingRef.current = true;
        return;
      }
      syncingRef.current = true;
      try {
        await uploadCloudBackup(user);
      } catch (error) {
        publishCloudSyncStatus("error", error instanceof Error ? error.message : String(error));
      } finally {
        syncingRef.current = false;
        if (pendingRef.current) {
          pendingRef.current = false;
          timerRef.current = setTimeout(push, 700);
        }
      }
    };

    const schedulePush = () => {
      if (!userRef.current) return;
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(push, 1200);
    };

    const initialize = async (user: User | null, force = false) => {
      userRef.current = user;
      if (!user) {
        initializedUserRef.current = null;
        publishCloudSyncStatus("idle", "Đăng nhập bằng liên kết email để bật tự động lưu Supabase.");
        return;
      }
      if (!force && initializedUserRef.current === user.id) return;
      initializedUserRef.current = user.id;
      syncingRef.current = true;
      try {
        const action = await reconcileCloudBackup(user);
        if (action === "restored" && active) {
          const marker = `cm-restored-${user.id}`;
          if (!sessionStorage.getItem(marker)) {
            sessionStorage.setItem(marker, "1");
            setTimeout(() => location.reload(), 250);
          }
        }
      } catch (error) {
        publishCloudSyncStatus("error", error instanceof Error ? error.message : String(error));
      } finally {
        syncingRef.current = false;
        if (pendingRef.current) {
          pendingRef.current = false;
          schedulePush();
        }
      }
    };

    supabase.auth.getUser().then(({ data, error }) => {
      if (!active) return;
      if (error) publishCloudSyncStatus("error", error.message);
      initialize(data.user || null);
    });
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!active) return;
      if (event === "SIGNED_OUT") initialize(null, true);
      else if (["SIGNED_IN", "INITIAL_SESSION", "USER_UPDATED"].includes(event)) initialize(session?.user || null);
    });
    const onStorage = (event: StorageEvent) => {
      if (event.key?.startsWith("chinese-mission")) schedulePush();
    };
    window.addEventListener(LOCAL_DATA_CHANGED_EVENT, schedulePush);
    window.addEventListener("storage", onStorage);

    return () => {
      active = false;
      if (timerRef.current) clearTimeout(timerRef.current);
      authListener.subscription.unsubscribe();
      window.removeEventListener(LOCAL_DATA_CHANGED_EVENT, schedulePush);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return null;
}
