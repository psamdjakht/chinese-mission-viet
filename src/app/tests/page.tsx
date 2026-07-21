"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { scenarios } from "@/lib/data/scenarios";
import { getAllGroupTests } from "@/lib/data/group-tests";
import { getGroupTestResults, type GroupTestResultMap } from "@/lib/group-test-progress";
import { getActiveSlot, getSlotItem } from "@/lib/slots";
import { getScenarioNameVi } from "@/lib/i18n/vi";

export default function TestsPage() {
  const router = useRouter();
  const tests = useMemo(() => getAllGroupTests(), []);
  const [completedMissions, setCompletedMissions] = useState<string[]>([]);
  const [results, setResults] = useState<GroupTestResultMap>({});

  useEffect(() => {
    if (!getActiveSlot()) {
      router.replace("/slots");
      return;
    }
    try { setCompletedMissions(JSON.parse(getSlotItem("chinese-mission-completed") || "[]")); } catch {}
    setResults(getGroupTestResults());
  }, [router]);

  const passedCount = Object.values(results).filter((result) => result.passed).length;

  return (
    <div className="app-shell">
      <header className="border-b border-green-100 bg-white/90 px-5 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
          <div className="flex items-center gap-3"><button onClick={() => router.push("/missions")} className="text-green-800">←</button><div><h1 className="text-xl font-bold text-green-950">Kiểm tra tổng hợp theo nhóm</h1><p className="text-xs text-slate-500">{passedCount}/{tests.length} nhóm đã đạt từ 80%</p></div></div>
          <Link href="/review" className="rounded-xl bg-green-100 px-3 py-2 text-xs font-semibold text-green-800">Ôn trước khi kiểm tra</Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl space-y-5 px-5 py-6">
        <section className="rounded-3xl border border-green-200 bg-gradient-to-br from-green-50 to-white p-6">
          <h2 className="text-lg font-bold text-green-950">Mỗi nhóm có 10 câu bám sát nội dung đã học</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Bài kiểm tra kết hợp nghĩa từ, chọn cách nói, khung câu, sửa lỗi, phản xạ hội thoại, phép lịch sự và phát âm. Bạn nên hoàn thành các nhiệm vụ của nhóm trước, nhưng vẫn có thể mở bài kiểm tra để xem mức hiện tại.</p>
        </section>
        <div className="space-y-4">
          {tests.map((test) => {
            const scenario = scenarios.find((item) => item.id === test.scenarioId)!;
            const done = test.missionIds.filter((id) => completedMissions.includes(id)).length;
            const result = results[test.scenarioId];
            const ready = done === test.missionIds.length;
            return (
              <section key={test.scenarioId} className="app-card overflow-hidden">
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div><div className="text-xs font-semibold uppercase tracking-wider text-green-700">{scenario.icon} {getScenarioNameVi(scenario)}</div><h2 className="mt-1 font-bold text-green-950">{test.titleVi}</h2></div>
                    {result ? <span className={`rounded-full px-3 py-1 text-xs font-semibold ${result.passed ? "bg-green-600 text-white" : "bg-amber-100 text-amber-800"}`}>{result.bestPercent}% tốt nhất</span> : <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">Chưa làm</span>}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{test.descriptionVi}</p>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-green-100"><div className="h-full rounded-full bg-green-600" style={{ width: `${test.missionIds.length ? (done / test.missionIds.length) * 100 : 0}%` }} /></div>
                  <div className="mt-2 flex items-center justify-between text-xs text-slate-500"><span>Đã học {done}/{test.missionIds.length} bài trong nhóm</span><span>{ready ? "Sẵn sàng kiểm tra" : "Nên học đủ bài trước"}</span></div>
                </div>
                <Link href={`/tests/${test.scenarioId}`} className={`block border-t border-green-100 px-5 py-3 text-center text-sm font-semibold ${ready ? "bg-green-700 text-white" : "bg-green-50 text-green-800"}`}>{result ? "Làm lại bài kiểm tra" : ready ? "Bắt đầu kiểm tra" : "Kiểm tra trình độ hiện tại"}</Link>
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}
