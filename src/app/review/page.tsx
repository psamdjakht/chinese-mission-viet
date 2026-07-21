"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import SpeakerButton from "@/components/SpeakerButton";
import { extendedKnowledgePacks } from "@/lib/data/extended-knowledge";
import { scenarios } from "@/lib/data/scenarios";
import { getActiveSlot } from "@/lib/slots";
import { getReviewQueue, getSrsStats, gradeReview, type ReviewCard, type ReviewRating } from "@/lib/srs";
import { useLearningSettings } from "@/lib/settings";

const ratingLabels: Record<ReviewRating, { title: string; subtitle: string; className: string }> = {
  again: { title: "Quên", subtitle: "ôn lại sau 10 phút", className: "bg-rose-100 text-rose-800" },
  hard: { title: "Khó", subtitle: "ôn lại sớm", className: "bg-amber-100 text-amber-800" },
  good: { title: "Nhớ", subtitle: "lịch chuẩn", className: "bg-green-100 text-green-800" },
  easy: { title: "Rất chắc", subtitle: "giãn lịch xa hơn", className: "bg-sky-100 text-sky-800" },
};

export default function ReviewPage() {
  const router = useRouter();
  const { settings } = useLearningSettings();
  const [sourceId, setSourceId] = useState<string | undefined>();
  const [queue, setQueue] = useState<ReviewCard[]>([]);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [stats, setStats] = useState(() => ({ total: 0, learned: 0, due: 0, newCards: 0, mature: 0, reviewCount: 0, nextDueAt: undefined as string | undefined }));
  const [sessionGrades, setSessionGrades] = useState<Record<ReviewRating, number>>({ again: 0, hard: 0, good: 0, easy: 0 });

  const load = (filter?: string) => {
    setQueue(getReviewQueue(20, filter));
    setIndex(0);
    setRevealed(false);
    setStats(getSrsStats());
  };

  useEffect(() => {
    const slot = getActiveSlot();
    if (!slot) {
      router.replace("/slots");
      return;
    }
    const querySource = new URLSearchParams(window.location.search).get("source") || undefined;
    setSourceId(querySource);
    load(querySource);
  }, [router]);

  const current = queue[index];
  const sourceTitle = useMemo(() => {
    if (!sourceId) return "Toàn bộ nội dung";
    return extendedKnowledgePacks.find((pack) => pack.id === sourceId)?.titleVi || scenarios.find((scenario) => scenario.id === sourceId)?.nameVi || "Nội dung đã chọn";
  }, [sourceId]);

  const grade = (rating: ReviewRating) => {
    if (!current) return;
    gradeReview(current.id, rating);
    setSessionGrades((grades) => ({ ...grades, [rating]: grades[rating] + 1 }));
    setStats(getSrsStats());
    setRevealed(false);
    setIndex((value) => value + 1);
  };

  const finished = queue.length > 0 && index >= queue.length;

  return (
    <div className="app-shell">
      <header className="border-b border-green-100 bg-white/90 px-5 py-4">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button onClick={() => router.push("/missions")} className="text-green-800">←</button>
            <div><h1 className="text-xl font-bold text-green-950">Ôn lặp ngắt quãng</h1><p className="text-xs text-slate-500">{sourceTitle}</p></div>
          </div>
          <button onClick={() => router.push("/knowledge")} className="rounded-xl bg-green-100 px-3 py-2 text-xs font-semibold text-green-800">5 chuyên đề mới</button>
        </div>
      </header>

      <main className="mx-auto max-w-2xl space-y-5 px-5 py-6">
        <section className="grid grid-cols-3 gap-3">
          <div className="app-card p-3 text-center"><div className="text-xl font-bold text-rose-700">{stats.due}</div><div className="text-[11px] text-slate-500">Đến hạn</div></div>
          <div className="app-card p-3 text-center"><div className="text-xl font-bold text-green-800">{stats.learned}</div><div className="text-[11px] text-slate-500">Đã đưa vào lịch</div></div>
          <div className="app-card p-3 text-center"><div className="text-xl font-bold text-sky-700">{stats.mature}</div><div className="text-[11px] text-slate-500">Đã nhớ lâu</div></div>
        </section>

        {!current && !finished && (
          <section className="app-card p-6 text-center">
            <div className="text-4xl">🌱</div>
            <h2 className="mt-3 font-bold text-green-950">Chưa có thẻ phù hợp</h2>
            <p className="mt-2 text-sm text-slate-500">Bạn có thể quay lại danh sách chuyên đề hoặc ôn toàn bộ nội dung.</p>
            <button onClick={() => { setSourceId(undefined); history.replaceState(null, "", "/review"); load(); }} className="mt-4 mint-button px-5 py-3">Ôn toàn bộ</button>
          </section>
        )}

        {current && (
          <>
            <div className="flex items-center justify-between text-xs text-slate-500"><span>Thẻ {index + 1}/{queue.length}</span><span>{current.sourceTitleVi}</span></div>
            <section className="app-card min-h-[360px] overflow-hidden">
              <div className="border-b border-green-100 bg-green-50 px-5 py-3 text-xs font-semibold text-green-800">{current.frontVi}</div>
              <div className="flex min-h-[300px] flex-col items-center justify-center p-6 text-center">
                {current.kind === "mistake" && <div className="mb-4 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-800">{current.frontVi}</div>}
                <div className="flex items-start justify-center gap-3">
                  <div lang="zh" className="text-3xl font-bold leading-relaxed text-green-950">{current.hanzi}</div>
                  {current.hanzi && !current.hanzi.includes("→") && <SpeakerButton text={current.hanzi} />}
                </div>
                {!revealed ? (
                  <>
                    <p className="mt-5 text-sm text-slate-500">Bạn hãy tự nhớ nghĩa, cách dùng hoặc câu sửa đúng trước khi mở đáp án.</p>
                    <button onClick={() => setRevealed(true)} className="mt-6 mint-button px-8 py-3 font-semibold">Mở đáp án</button>
                  </>
                ) : (
                  <div className="mt-5 w-full rounded-2xl bg-green-50 p-5 text-left">
                    {settings.showPinyin && current.pinyin && <div className="text-sm font-medium text-green-700">{current.pinyin}</div>}
                    <div className="mt-2 text-base font-semibold text-slate-800">{current.answerVi}</div>
                    {current.noteVi && <div className="mt-3 rounded-xl bg-white px-3 py-2 text-xs leading-5 text-slate-600">{current.noteVi}</div>}
                  </div>
                )}
              </div>
            </section>
            {revealed && (
              <section>
                <div className="mb-2 text-center text-xs text-slate-500">Bạn nhớ thẻ này ở mức nào?</div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {(Object.keys(ratingLabels) as ReviewRating[]).map((rating) => {
                    const label = ratingLabels[rating];
                    return <button key={rating} onClick={() => grade(rating)} className={`rounded-xl px-3 py-3 text-center ${label.className}`}><div className="font-semibold">{label.title}</div><div className="mt-1 text-[10px] opacity-80">{label.subtitle}</div></button>;
                  })}
                </div>
              </section>
            )}
          </>
        )}

        {finished && (
          <section className="app-card p-6 text-center">
            <div className="text-4xl">✅</div>
            <h2 className="mt-3 text-xl font-bold text-green-950">Hoàn thành phiên ôn</h2>
            <p className="mt-2 text-sm text-slate-500">Hệ thống đã tính lịch ôn tiếp theo dựa trên mức độ bạn tự đánh giá.</p>
            <div className="mt-5 grid grid-cols-4 gap-2 text-xs"><div className="rounded-lg bg-rose-50 p-2">Quên<br/><b>{sessionGrades.again}</b></div><div className="rounded-lg bg-amber-50 p-2">Khó<br/><b>{sessionGrades.hard}</b></div><div className="rounded-lg bg-green-50 p-2">Nhớ<br/><b>{sessionGrades.good}</b></div><div className="rounded-lg bg-sky-50 p-2">Rất chắc<br/><b>{sessionGrades.easy}</b></div></div>
            <button onClick={() => { setSessionGrades({ again: 0, hard: 0, good: 0, easy: 0 }); load(sourceId); }} className="mt-5 mint-button px-6 py-3">Tạo phiên ôn tiếp theo</button>
          </section>
        )}

        <section className="rounded-2xl border border-green-200 bg-white p-4 text-xs leading-5 text-slate-600">
          <div className="font-semibold text-green-900">Cách hệ thống xếp lịch</div>
          <p className="mt-1">Thẻ quên sẽ quay lại sớm; thẻ khó có khoảng cách ngắn; thẻ nhớ tốt được giãn dần từ 1 ngày, 3 ngày rồi tăng theo độ ổn định. Toàn bộ lịch ôn được lưu theo slot và tự đồng bộ Supabase cùng tiến độ học.</p>
        </section>
      </main>
    </div>
  );
}
