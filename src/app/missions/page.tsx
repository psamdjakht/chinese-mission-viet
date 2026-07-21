"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { scenarios } from "@/lib/data/scenarios";
import { getMissionObjectiveVi, getMissionTitleVi, getScenarioNameVi } from "@/lib/i18n/vi";
import { getQuotaSummary } from "@/lib/entitlements";
import { getStudyStreak } from "@/lib/storage";
import { getActiveSlot, getActiveSlotId, getSlotItem } from "@/lib/slots";

const category: Record<string, string> = {
  survival: "Giao tiếp thiết yếu",
  social: "Giao tiếp xã hội",
  work: "Giao tiếp công việc",
  travel: "Du lịch và di chuyển",
};

export default function MissionsPage() {
  const router = useRouter();
  const [done, setDone] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [goal, setGoal] = useState("survival");
  const [learnerName, setLearnerName] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const slotId = getActiveSlotId();
    if (!slotId) {
      router.replace("/slots");
      return;
    }
    setLearnerName(getActiveSlot()?.name || "Người học");
    try {
      const user = JSON.parse(getSlotItem("chinese-mission-user") || "null");
      if (!user?.onboardingCompleted) {
        router.replace("/onboarding");
        return;
      }
      setGoal(user.goal || "survival");
      setDone(JSON.parse(getSlotItem("chinese-mission-completed") || "[]"));
    } catch {
      router.replace("/onboarding");
    }
  }, [router]);

  const all = useMemo(() => scenarios.flatMap((scenario) => scenario.missions.map((mission) => ({ mission, scenario }))), []);
  const recommended = all.find(({ mission }) => !done.includes(mission.id));
  const ordered = useMemo(
    () => [...scenarios].sort((a, b) => Number(b.category === goal) - Number(a.category === goal)),
    [goal],
  );
  const quota = mounted ? getQuotaSummary() : null;
  const matches = (mission: { id: string; title: string; titleEn: string; titleVi?: string }) =>
    !query || `${getMissionTitleVi(mission as never)} ${mission.title} ${mission.titleEn}`.toLowerCase().includes(query.toLowerCase());

  return (
    <div className="app-shell">
      <header className="sticky top-0 z-20 border-b border-green-100 bg-white/90 px-5 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-green-950">Chinese Mission Việt</h1>
              <button onClick={() => router.push("/slots")} className="rounded-full bg-green-100 px-2.5 py-1 text-[11px] font-semibold text-green-800">👤 {learnerName}</button>
            </div>
            <p className="text-xs text-green-700">
              {done.length}/{all.length} bài hoàn thành · 🔥 {mounted ? getStudyStreak() : 0} ngày
              {quota ? <span> · còn {quota.premium ? "∞" : quota.remaining} lượt</span> : null}
            </p>
          </div>
          <nav className="flex gap-2 text-xs">
            <Link href="/phrasebook" className="rounded-lg bg-green-50 px-3 py-2 text-green-800">Sổ câu</Link>
            <Link href="/profile" className="rounded-lg bg-green-50 px-3 py-2 text-green-800">Hồ sơ</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-3xl space-y-6 px-5 py-6">
        <section className="grid grid-cols-3 gap-3">
          <div className="app-card p-3 text-center"><div className="text-xl font-bold text-green-800">50</div><div className="text-[11px] text-slate-500">Bài thực tế</div></div>
          <div className="app-card p-3 text-center"><div className="text-xl font-bold text-green-800">15</div><div className="text-[11px] text-slate-500">Nhóm tình huống</div></div>
          <div className="app-card p-3 text-center"><div className="text-xl font-bold text-green-800">A0–A2</div><div className="text-[11px] text-slate-500">Mức độ</div></div>
        </section>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm bài học hoặc tình huống…" className="w-full rounded-xl border border-green-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-green-400" />
        {recommended && (
          <section className="mint-gradient rounded-3xl p-6 text-white shadow-lg">
            <div className="text-xs font-semibold uppercase tracking-wider text-green-100">Đề xuất tiếp theo</div>
            <h2 className="mt-2 text-xl font-bold">{getMissionTitleVi(recommended.mission)}</h2>
            <p className="mt-1 text-sm text-green-50">{getMissionObjectiveVi(recommended.mission)}</p>
            <div className="mt-3 text-xs text-green-100">{recommended.mission.level} · khoảng {recommended.mission.estimatedMinutes} phút · {getScenarioNameVi(recommended.scenario)}</div>
            <Link href={`/missions/${recommended.mission.id}/warmup`} className="mt-5 inline-block rounded-xl bg-white px-5 py-3 font-semibold text-green-800">Bắt đầu nhiệm vụ</Link>
          </section>
        )}
        {ordered.map((scenario) => {
          const missions = scenario.missions.filter(matches);
          if (!missions.length) return null;
          return (
            <section key={scenario.id}>
              <div className="mb-3 flex items-end justify-between">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-green-700">{category[scenario.category]}</div>
                  <h2 className="text-lg font-bold text-green-950">{scenario.icon} {getScenarioNameVi(scenario)}</h2>
                  <p className="mt-0.5 text-xs text-slate-500">{scenario.descriptionVi || scenario.descriptionEn}</p>
                </div>
                <div className="text-xs text-slate-500">{scenario.missions.filter((mission) => done.includes(mission.id)).length}/{scenario.missions.length}</div>
              </div>
              <div className="app-card divide-y divide-green-100 overflow-hidden">
                {missions.map((mission) => (
                  <Link key={mission.id} href={`/missions/${mission.id}/warmup`} className={`flex items-center justify-between gap-4 p-4 hover:bg-green-50 ${done.includes(mission.id) ? "opacity-60" : ""}`}>
                    <div className="flex items-center gap-3">
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm ${done.includes(mission.id) ? "bg-green-600 text-white" : "bg-green-100 text-green-700"}`}>{done.includes(mission.id) ? "✓" : mission.id.replace("m", "")}</div>
                      <div><div className="font-semibold text-green-950">{getMissionTitleVi(mission)}</div><div lang="zh" className="text-xs text-slate-500">{mission.title}</div></div>
                    </div>
                    <div className="shrink-0 text-right text-xs text-slate-500"><div>{mission.level}</div><div>{mission.estimatedMinutes} phút</div></div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/cloud" className="app-card p-4"><div className="font-semibold text-green-900">☁ Đồng bộ</div><div className="mt-1 text-xs text-slate-500">Sao lưu tùy chọn</div></Link>
          <Link href="/profile" className="app-card p-4"><div className="font-semibold text-green-900">⚙ Cài đặt học</div><div className="mt-1 text-xs text-slate-500">Pinyin, nghĩa, tốc độ đọc</div></Link>
        </div>
      </main>
    </div>
  );
}
