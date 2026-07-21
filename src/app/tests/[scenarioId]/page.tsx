"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import SpeakerButton from "@/components/SpeakerButton";
import { getGroupTest } from "@/lib/data/group-tests";
import { saveGroupTestAttempt } from "@/lib/group-test-progress";
import { getActiveSlot } from "@/lib/slots";

export default function GroupTestPage() {
  const params = useParams();
  const router = useRouter();
  const test = useMemo(() => getGroupTest(String(params.scenarioId)), [params.scenarioId]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!getActiveSlot()) router.replace("/slots");
  }, [router]);

  if (!test) return <div className="app-shell flex items-center justify-center"><button onClick={() => router.push("/tests")} className="text-green-800 underline">Không tìm thấy bài kiểm tra. Quay lại.</button></div>;

  const question = test.questions[currentIndex];
  const score = test.questions.filter((item) => answers[item.id] === item.correctId).length;
  const percent = Math.round((score / test.questions.length) * 100);
  const passed = percent >= test.passScore;
  const answeredCount = Object.keys(answers).length;

  const submit = () => {
    if (answeredCount < test.questions.length) {
      const missing = test.questions.findIndex((item) => !answers[item.id]);
      setCurrentIndex(Math.max(0, missing));
      alert("Bạn cần trả lời đủ tất cả câu trước khi nộp bài.");
      return;
    }
    setSubmitted(true);
    if (!saved) {
      saveGroupTestAttempt({
        scenarioId: test.scenarioId,
        score,
        total: test.questions.length,
        percent,
        passed,
        answers,
        completedAt: new Date().toISOString(),
      });
      setSaved(true);
    }
  };

  const restart = () => {
    setAnswers({});
    setSubmitted(false);
    setSaved(false);
    setCurrentIndex(0);
  };

  return (
    <div className="app-shell">
      <header className="border-b border-green-100 bg-white/90 px-5 py-4">
        <div className="mx-auto flex max-w-2xl items-center gap-3"><button onClick={() => router.push("/tests")} className="text-green-800">←</button><div><h1 className="font-bold text-green-950">{test.titleVi}</h1><p className="text-xs text-slate-500">10 câu · đạt từ {test.passScore}%</p></div></div>
      </header>
      <main className="mx-auto max-w-2xl space-y-5 px-5 py-6">
        {!submitted ? (
          <>
            <div className="flex items-center justify-between text-xs text-slate-500"><span>Câu {currentIndex + 1}/{test.questions.length}</span><span>Đã trả lời {answeredCount}/{test.questions.length}</span></div>
            <div className="h-2 overflow-hidden rounded-full bg-green-100"><div className="h-full rounded-full bg-green-600 transition-all" style={{ width: `${((currentIndex + 1) / test.questions.length) * 100}%` }} /></div>
            <section className="app-card p-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-green-700">{question.skillVi}</div>
              <h2 className="mt-2 text-base font-bold leading-6 text-green-950">{question.promptVi}</h2>
              {question.stemHanzi && <div className="mt-5 rounded-2xl bg-green-50 p-5 text-center"><div className="flex items-center justify-center gap-3"><div lang="zh" className="text-3xl font-bold text-green-950">{question.stemHanzi}</div><SpeakerButton text={question.stemHanzi} /></div>{question.stemPinyin && <div className="mt-2 text-sm text-green-700">{question.stemPinyin}</div>}</div>}
              <div className="mt-5 space-y-3">
                {question.options.map((option, index) => {
                  const selected = answers[question.id] === option.id;
                  return <button key={option.id} onClick={() => setAnswers((current) => ({ ...current, [question.id]: option.id }))} className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left transition ${selected ? "border-green-600 bg-green-50 ring-2 ring-green-200" : "border-green-100 bg-white hover:bg-green-50"}`}><span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${selected ? "bg-green-700 text-white" : "bg-green-100 text-green-800"}`}>{String.fromCharCode(65 + index)}</span><span lang={option.lang === "zh" ? "zh" : undefined} className={`${option.lang === "zh" ? "text-base font-semibold text-green-950" : "text-sm leading-6 text-slate-700"}`}>{option.text}</span></button>;
                })}
              </div>
            </section>
            <div className="flex gap-3">
              <button disabled={currentIndex === 0} onClick={() => setCurrentIndex((value) => Math.max(0, value - 1))} className="flex-1 rounded-xl border border-green-200 bg-white px-4 py-3 font-semibold text-green-800 disabled:opacity-40">Câu trước</button>
              {currentIndex < test.questions.length - 1 ? <button onClick={() => setCurrentIndex((value) => Math.min(test.questions.length - 1, value + 1))} className="mint-button flex-1 px-4 py-3 font-semibold">Câu tiếp</button> : <button onClick={submit} className="mint-button flex-1 px-4 py-3 font-semibold">Nộp bài</button>}
            </div>
            <div className="flex flex-wrap justify-center gap-2">{test.questions.map((item, index) => <button key={item.id} onClick={() => setCurrentIndex(index)} className={`h-8 w-8 rounded-full text-xs font-semibold ${index === currentIndex ? "bg-green-700 text-white" : answers[item.id] ? "bg-green-100 text-green-800" : "bg-slate-100 text-slate-500"}`}>{index + 1}</button>)}</div>
          </>
        ) : (
          <>
            <section className={`rounded-3xl p-6 text-center text-white ${passed ? "bg-gradient-to-br from-green-700 to-emerald-600" : "bg-gradient-to-br from-amber-600 to-orange-500"}`}>
              <div className="text-5xl font-bold">{percent}%</div>
              <h2 className="mt-2 text-xl font-bold">{passed ? "Bạn đã đạt bài kiểm tra" : "Bạn nên ôn lại trước khi làm lại"}</h2>
              <p className="mt-2 text-sm opacity-90">Đúng {score}/{test.questions.length} câu · chuẩn đạt {test.passScore}%</p>
            </section>
            <section className="space-y-3">
              {test.questions.map((item, index) => {
                const correct = answers[item.id] === item.correctId;
                const selectedText = item.options.find((option) => option.id === answers[item.id])?.text;
                const correctText = item.options.find((option) => option.id === item.correctId)?.text;
                return <details key={item.id} className={`app-card overflow-hidden ${correct ? "border-green-200" : "border-rose-200"}`} open={!correct}><summary className="cursor-pointer list-none px-4 py-4"><div className="flex items-center gap-3"><span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${correct ? "bg-green-600 text-white" : "bg-rose-100 text-rose-700"}`}>{correct ? "✓" : "✕"}</span><div><div className="text-xs text-slate-500">Câu {index + 1} · {item.skillVi}</div><div className="mt-1 text-sm font-semibold text-green-950">{item.promptVi}</div></div></div></summary><div className="border-t border-green-100 p-4 text-sm"><div className="text-slate-600">Bạn chọn: <span className={correct ? "font-semibold text-green-700" : "font-semibold text-rose-700"}>{selectedText}</span></div>{!correct && <div className="mt-1 text-slate-600">Đáp án đúng: <span className="font-semibold text-green-700">{correctText}</span></div>}<div className="mt-3 rounded-xl bg-green-50 px-3 py-2 text-xs leading-5 text-slate-700">{item.explanationVi}</div></div></details>;
              })}
            </section>
            <div className="grid grid-cols-2 gap-3"><button onClick={restart} className="rounded-xl border border-green-300 bg-white px-4 py-3 font-semibold text-green-800">Làm lại</button><button onClick={() => router.push(`/review?source=${test.scenarioId}`)} className="mint-button px-4 py-3 font-semibold">Ôn nhóm này</button></div>
          </>
        )}
      </main>
    </div>
  );
}
