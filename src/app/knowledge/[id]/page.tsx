"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import SpeakerButton from "@/components/SpeakerButton";
import { getExtendedKnowledgePack } from "@/lib/data/extended-knowledge";
import { getCompletedKnowledgeIds, setKnowledgeCompleted } from "@/lib/knowledge-progress";
import { useLearningSettings } from "@/lib/settings";
import { getActiveSlot } from "@/lib/slots";

export default function KnowledgeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { settings } = useLearningSettings();
  const pack = getExtendedKnowledgePack(String(params.id));
  const [completed, setCompleted] = useState(false);
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (!getActiveSlot()) {
      router.replace("/slots");
      return;
    }
    setCompleted(getCompletedKnowledgeIds().includes(String(params.id)));
  }, [params.id, router]);

  if (!pack) return <div className="app-shell flex items-center justify-center"><button onClick={() => router.push("/knowledge")} className="text-green-800 underline">Không tìm thấy chuyên đề. Quay lại.</button></div>;

  const toggleCompleted = () => {
    const next = !completed;
    setKnowledgeCompleted(pack.id, next);
    setCompleted(next);
  };

  return (
    <div className="app-shell">
      <header className="border-b border-green-100 bg-white/90 px-5 py-4">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <button onClick={() => router.push("/knowledge")} className="text-green-800">←</button>
          <div>
            <h1 className="font-bold text-green-950">{pack.icon} {pack.titleVi}</h1>
            <p lang="zh" className="text-xs text-green-700">{pack.titleCn} · {pack.level}</p>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-3xl space-y-5 px-5 py-6">
        <section className="rounded-3xl bg-gradient-to-br from-emerald-700 to-green-600 p-6 text-white shadow-lg">
          <p className="text-sm leading-6 text-green-50">{pack.summaryVi}</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {pack.objectives.map((objective, index) => <div key={objective} className="rounded-xl bg-white/10 px-3 py-2 text-xs leading-5"><span className="font-bold">{index + 1}.</span> {objective}</div>)}
          </div>
        </section>

        <section className="app-card p-5">
          <h2 className="font-bold text-green-950">Khái niệm và từ khóa</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {pack.terms.map((term) => (
              <div key={term.hanzi} className="rounded-xl border border-green-100 bg-green-50/60 p-3">
                <div className="flex items-start justify-between gap-2">
                  <div><div lang="zh" className="text-lg font-semibold text-green-950">{term.hanzi}</div>{settings.showPinyin && <div className="text-xs text-green-700">{term.pinyin}</div>}</div>
                  <SpeakerButton text={term.hanzi} />
                </div>
                <div className="mt-2 text-sm font-medium text-slate-700">{term.vi}</div>
                <div className="mt-1 text-xs leading-5 text-slate-500">{term.noteVi}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="app-card p-5">
          <h2 className="font-bold text-green-950">Cấu trúc cốt lõi</h2>
          <div className="mt-4 space-y-3">
            {pack.patterns.map((pattern) => (
              <div key={pattern.hanzi} className="rounded-xl border border-green-100 p-4">
                <div className="flex items-start justify-between gap-2"><div><div lang="zh" className="font-semibold text-green-950">{pattern.hanzi}</div>{settings.showPinyin && <div className="mt-1 text-xs text-green-700">{pattern.pinyin}</div>}</div><SpeakerButton text={pattern.hanzi} /></div>
                <div className="mt-2 text-sm text-slate-700">{pattern.vi}</div>
                <div className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-800">{pattern.usageVi}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="app-card p-5">
          <h2 className="font-bold text-green-950">Ví dụ trong tình huống thật</h2>
          <div className="mt-4 space-y-3">
            {pack.examples.map((example) => (
              <div key={example.hanzi} className="rounded-xl bg-sky-50 p-4">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-sky-700">{example.contextVi}</div>
                <div className="mt-2 flex items-start justify-between gap-2"><div><div lang="zh" className="font-semibold text-slate-900">{example.hanzi}</div>{settings.showPinyin && <div className="mt-1 text-xs text-sky-700">{example.pinyin}</div>}</div><SpeakerButton text={example.hanzi} /></div>
                <div className="mt-2 text-sm text-slate-600">{example.vi}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="app-card p-5">
          <h2 className="font-bold text-green-950">Lỗi cần tránh</h2>
          <div className="mt-4 space-y-3">
            {pack.pitfalls.map((pitfall) => (
              <div key={pitfall.wrong} className="rounded-xl border border-rose-100 bg-rose-50/60 p-4">
                <div className="grid gap-2 sm:grid-cols-2"><div className="rounded-lg bg-white p-3"><div className="text-[11px] font-semibold text-rose-600">KHÔNG NÊN</div><div lang="zh" className="mt-1 font-semibold text-rose-800">✕ {pitfall.wrong}</div></div><div className="rounded-lg bg-white p-3"><div className="text-[11px] font-semibold text-green-600">NÊN NÓI</div><div lang="zh" className="mt-1 font-semibold text-green-800">✓ {pitfall.right}</div></div></div>
                <p className="mt-2 text-xs leading-5 text-slate-600">{pitfall.explanationVi}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="app-card p-5">
          <h2 className="font-bold text-green-950">Bài luyện chủ động</h2>
          <p className="mt-1 text-xs text-slate-500">Bạn tự nói trước, sau đó mới mở đáp án để so sánh.</p>
          <div className="mt-4 space-y-3">
            {pack.drills.map((drill, index) => (
              <div key={drill.promptVi} className="rounded-xl border border-green-100 p-4">
                <div className="text-sm font-medium text-slate-800">{index + 1}. {drill.promptVi}</div>
                {!revealed[index] ? <button onClick={() => setRevealed((current) => ({ ...current, [index]: true }))} className="mt-3 rounded-lg bg-green-100 px-3 py-2 text-xs font-semibold text-green-800">Mở đáp án</button> : <div className="mt-3 rounded-xl bg-green-50 p-3"><div className="flex items-start justify-between gap-2"><div><div lang="zh" className="font-semibold text-green-950">{drill.answerHanzi}</div>{settings.showPinyin && <div className="mt-1 text-xs text-green-700">{drill.answerPinyin}</div>}</div><SpeakerButton text={drill.answerHanzi} /></div><div className="mt-2 text-xs text-slate-600">{drill.answerVi}</div></div>}
              </div>
            ))}
          </div>
        </section>

        <button onClick={toggleCompleted} className={`w-full rounded-2xl px-5 py-4 font-semibold ${completed ? "border border-green-300 bg-white text-green-800" : "mint-button"}`}>{completed ? "✓ Đã đánh dấu hoàn thành — bấm để bỏ đánh dấu" : "Đánh dấu chuyên đề đã học"}</button>
        <button onClick={() => router.push(`/review?source=${pack.id}`)} className="w-full rounded-2xl border border-green-300 bg-white px-5 py-4 font-semibold text-green-800">Ôn riêng chuyên đề này bằng lặp ngắt quãng</button>
      </main>
    </div>
  );
}
