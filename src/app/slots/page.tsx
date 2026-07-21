"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getLearnerSlots,
  getSlotProgress,
  resetLearnerSlot,
  saveLearnerSlotName,
  setActiveSlotId,
  type LearnerSlot,
} from "@/lib/slots";

export default function SlotsPage() {
  const router = useRouter();
  const [slots, setSlots] = useState<LearnerSlot[]>([]);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [mounted, setMounted] = useState(false);

  const refresh = () => {
    const next = getLearnerSlots();
    setSlots(next);
    setDrafts(Object.fromEntries(next.map((slot) => [slot.id, slot.name])));
  };

  useEffect(() => {
    setMounted(true);
    refresh();
  }, []);

  const usedCount = useMemo(() => slots.filter((slot) => slot.name).length, [slots]);

  const enter = (slot: LearnerSlot) => {
    const name = (drafts[slot.id] || slot.name).trim();
    if (!name) return;
    saveLearnerSlotName(slot.id, name);
    setActiveSlotId(slot.id);
    const progress = getSlotProgress(slot.id);
    router.push(progress.onboarded ? "/missions" : "/onboarding");
  };

  const reset = (slot: LearnerSlot) => {
    if (!slot.name) return;
    if (!confirm(`Xóa toàn bộ tiến độ và tên của ${slot.name}?`)) return;
    resetLearnerSlot(slot.id);
    refresh();
  };

  return (
    <div className="app-shell min-h-screen">
      <header className="border-b border-green-100 bg-white/90 px-5 py-5 backdrop-blur">
        <div className="mx-auto max-w-3xl">
          <div className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
            10 slot học độc lập · không cần mật khẩu
          </div>
          <h1 className="mt-3 text-3xl font-bold text-green-950">Chọn người học</h1>
          <p className="mt-2 text-sm text-slate-600">
            Mỗi slot lưu riêng bài đã học, sổ câu, cài đặt, lượt học và chuỗi ngày học trên thiết bị này.
          </p>
          <p className="mt-2 text-xs font-medium text-green-700">Đang dùng {usedCount}/10 slot</p>
        </div>
      </header>
      <main className="mx-auto grid max-w-3xl gap-4 px-5 py-6 sm:grid-cols-2">
        {!mounted
          ? null
          : slots.map((slot) => {
              const progress = getSlotProgress(slot.id);
              const hasName = Boolean(slot.name);
              return (
                <section key={slot.id} className="app-card p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100 text-lg font-bold text-green-800">
                      {slot.index}
                    </div>
                    {hasName && (
                      <button onClick={() => reset(slot)} className="text-xs text-rose-500">
                        Đặt lại slot
                      </button>
                    )}
                  </div>
                  <label className="mt-4 block text-xs font-semibold uppercase tracking-wide text-green-700">
                    Tên người học
                  </label>
                  <input
                    value={drafts[slot.id] || ""}
                    onChange={(event) => setDrafts((current) => ({ ...current, [slot.id]: event.target.value }))}
                    onBlur={() => {
                      const name = (drafts[slot.id] || "").trim();
                      if (name) {
                        saveLearnerSlotName(slot.id, name);
                        refresh();
                      }
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") enter(slot);
                    }}
                    placeholder={`Ví dụ: Người học ${slot.index}`}
                    maxLength={40}
                    className="mt-2 w-full rounded-xl border border-green-200 bg-white px-4 py-3 font-semibold text-green-950 outline-none focus:ring-2 focus:ring-green-400"
                  />
                  <div className="mt-3 flex min-h-5 gap-3 text-xs text-slate-500">
                    {hasName ? (
                      <>
                        <span>✓ {progress.completed}/50 bài</span>
                        <span>📖 {progress.phraseCount} câu</span>
                      </>
                    ) : (
                      <span>Slot còn trống</span>
                    )}
                  </div>
                  <button
                    onClick={() => enter(slot)}
                    disabled={!(drafts[slot.id] || "").trim()}
                    className="mint-button mt-4 w-full py-3 font-semibold disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {progress.onboarded ? "Tiếp tục học" : hasName ? "Thiết lập người học" : "Tạo slot và bắt đầu"}
                  </button>
                </section>
              );
            })}
      </main>
    </div>
  );
}
