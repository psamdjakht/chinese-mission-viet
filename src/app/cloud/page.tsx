"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { CLOUD_SYNC_STATUS_EVENT, readCloudSyncStatus, restoreCloudBackup, uploadCloudBackup, type CloudSyncStatus } from "@/lib/supabase/sync";

export default function CloudPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<CloudSyncStatus>(() => ({ state: "idle", message: "Đang kiểm tra…", at: new Date(0).toISOString() }));
  const configured = isSupabaseConfigured();

  useEffect(() => {
    setStatus(readCloudSyncStatus());
    const supabase = getSupabaseClient();
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user || null));
    const onStatus = (event: Event) => setStatus((event as CustomEvent<CloudSyncStatus>).detail);
    window.addEventListener(CLOUD_SYNC_STATUS_EVENT, onStatus);
    return () => {
      data.subscription.unsubscribe();
      window.removeEventListener(CLOUD_SYNC_STATUS_EVENT, onStatus);
    };
  }, []);

  const sendMagicLink = async () => {
    const supabase = getSupabaseClient();
    if (!supabase || !email.trim()) return;
    setBusy(true);
    setMessage("");
    const { error } = await supabase.auth.signInWithOtp({ email: email.trim(), options: { emailRedirectTo: `${location.origin}/cloud` } });
    setMessage(error ? error.message : "Đã gửi liên kết đăng nhập. Bạn mở email và bấm liên kết; không cần mật khẩu.");
    setBusy(false);
  };

  const upload = async () => {
    if (!user) return;
    setBusy(true);
    try { await uploadCloudBackup(user); setMessage("Đã lưu ngay tiến độ của cả 10 slot lên Supabase."); }
    catch (error) { setMessage(error instanceof Error ? error.message : String(error)); }
    setBusy(false);
  };

  const download = async () => {
    if (!user) return;
    if (!confirm("Tải dữ liệu từ Supabase sẽ thay thế tiến độ đang có trên thiết bị này. Tiếp tục?")) return;
    setBusy(true);
    try {
      const row = await restoreCloudBackup(user);
      setMessage(row ? "Đã khôi phục dữ liệu. Trang sẽ tải lại." : "Tài khoản chưa có bản sao trên Supabase.");
      if (row) setTimeout(() => location.reload(), 500);
    } catch (error) { setMessage(error instanceof Error ? error.message : String(error)); }
    setBusy(false);
  };

  const signOut = async () => {
    if (!confirm("Đăng xuất sẽ dừng tự động đồng bộ trên thiết bị này. Tiến độ cục bộ vẫn còn. Tiếp tục?")) return;
    await getSupabaseClient()?.auth.signOut();
    setMessage("Đã đăng xuất Supabase.");
  };

  const statusStyle = status.state === "error" ? "border-rose-200 bg-rose-50 text-rose-800" : status.state === "saved" || status.state === "restored" ? "border-green-200 bg-green-50 text-green-900" : "border-blue-200 bg-blue-50 text-blue-900";

  return <div className="app-shell">
    <header className="border-b border-green-100 bg-white/90 px-5 py-4"><div className="mx-auto flex max-w-xl items-center gap-3"><button onClick={() => router.back()} className="text-green-800">←</button><div><h1 className="text-lg font-bold text-green-950">Lưu tiến độ bằng Supabase</h1><p className="text-xs text-slate-500">Tự động lưu và khôi phục cả 10 slot sau khi đăng nhập một lần</p></div></div></header>
    <main className="mx-auto max-w-xl space-y-5 px-5 py-6">
      {!configured ? <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5"><h2 className="font-bold text-amber-900">Supabase chưa được cấu hình</h2><p className="mt-2 text-sm text-amber-800">Thêm <code>NEXT_PUBLIC_SUPABASE_URL</code> và <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> vào Environment Variables trên Vercel, rồi chạy <code>supabase/schema.sql</code> trong SQL Editor.</p></section> : !user ? <section className="app-card p-5"><h2 className="font-bold text-green-950">Đăng nhập không mật khẩu</h2><p className="mt-1 text-sm text-slate-500">Nhập email một lần. Supabase gửi liên kết xác nhận; sau đó phần mềm tự lưu mỗi khi tiến độ thay đổi và tự tải lại khi bạn quay lại.</p><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") sendMagicLink(); }} placeholder="email@example.com" className="mt-4 w-full rounded-xl border border-green-200 px-4 py-3 outline-none focus:ring-2 focus:ring-green-400"/><button onClick={sendMagicLink} disabled={busy || !email.trim()} className="mint-button mt-3 w-full py-3 font-semibold disabled:opacity-40">Gửi liên kết đăng nhập</button></section> : <>
        <section className="app-card p-5"><div className="text-sm text-slate-500">Đang đồng bộ bằng tài khoản</div><div className="font-semibold text-green-950">{user.email || "Tài khoản Supabase"}</div><p className="mt-2 text-sm text-slate-600">Mỗi lần bạn hoàn thành bài, lưu câu, đổi cài đặt hoặc chỉnh slot, dữ liệu sẽ tự đẩy lên Supabase sau khoảng 1–2 giây.</p><div className="mt-4 grid grid-cols-2 gap-3"><button onClick={upload} disabled={busy} className="rounded-xl bg-green-700 py-3 text-sm font-semibold text-white disabled:opacity-40">Lưu ngay</button><button onClick={download} disabled={busy} className="rounded-xl border border-green-300 py-3 text-sm font-semibold text-green-800 disabled:opacity-40">Khôi phục từ cloud</button></div><button onClick={signOut} className="mt-4 text-sm text-rose-600">Đăng xuất Supabase</button></section>
        <section className="rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900"><b>Không ảnh hưởng 10 slot:</b> người học vẫn chỉ chọn tên slot, không phải nhập mật khẩu. Email chỉ dùng để nhận diện bản sao cloud và đồng bộ sang lần truy cập sau hoặc thiết bị khác.</section>
      </>}
      <section className={`rounded-2xl border p-4 text-sm ${statusStyle}`}><div className="font-semibold">Trạng thái đồng bộ</div><div className="mt-1">{status.message}</div>{status.at && Date.parse(status.at) > 0 && <div className="mt-1 text-xs opacity-70">Cập nhật: {new Date(status.at).toLocaleString("vi-VN")}</div>}</section>
      {message && <div className="rounded-xl border border-green-200 bg-white p-4 text-sm text-green-900">{message}</div>}
    </main>
  </div>;
}
