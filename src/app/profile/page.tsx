"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { scenarios } from "@/lib/data/scenarios";
import { getScenarioNameVi } from "@/lib/i18n/vi";
import { useLearningSettings } from "@/lib/settings";
import { collectLocalData, downloadBackup, getStudyStreak, restoreLocalData, type BackupPayload } from "@/lib/storage";
import { getActiveSlot, getActiveSlotId, getSlotItem, resetLearnerSlot, saveLearnerSlotName } from "@/lib/slots";
import { getSrsStats } from "@/lib/srs";
import { getGroupTestResults } from "@/lib/group-test-progress";
import { getCompletedKnowledgeIds } from "@/lib/knowledge-progress";

export default function ProfilePage() {
  const router = useRouter();
  const { settings, updateSettings } = useLearningSettings();
  const [done, setDone] = useState<string[]>([]);
  const [phraseCount, setPhraseCount] = useState(0);
  const [slotName, setSlotName] = useState("");
  const [reviewDue, setReviewDue] = useState(0);
  const [passedTests, setPassedTests] = useState(0);
  const [knowledgeDone, setKnowledgeDone] = useState(0);
  const file = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const slot = getActiveSlot();
    if (!slot) {
      router.replace("/slots");
      return;
    }
    setSlotName(slot.name);
    try {
      setDone(JSON.parse(getSlotItem("chinese-mission-completed") || "[]"));
      setPhraseCount(JSON.parse(getSlotItem("chinese-mission-phrasebook") || "[]").length);
      setReviewDue(getSrsStats().due);
      setPassedTests(Object.values(getGroupTestResults()).filter((result) => result.passed).length);
      setKnowledgeDone(getCompletedKnowledgeIds().length);
    } catch {}
  }, [router]);

  const total = scenarios.reduce((sum, scenario) => sum + scenario.missions.length, 0);
  const importFile = async (selected?: File) => {
    if (!selected) return;
    try {
      restoreLocalData(JSON.parse(await selected.text()) as BackupPayload);
      alert("Đã khôi phục dữ liệu. Trang sẽ tải lại.");
      location.reload();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Không đọc được tệp");
    }
  };
  const rename = () => {
    const id = getActiveSlotId();
    const name = slotName.trim();
    if (!id || !name) return;
    saveLearnerSlotName(id, name);
    alert("Đã đổi tên người học.");
  };
  const reset = () => {
    const slot = getActiveSlot();
    if (!slot) return;
    if (!confirm(`Xóa toàn bộ tiến độ và tên của ${slot.name}?`)) return;
    resetLearnerSlot(slot.id);
    router.replace("/slots");
  };

  return (
    <div className="app-shell">
      <header className="border-b border-green-100 bg-white/90 px-5 py-4">
        <div className="mx-auto flex max-w-xl items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button onClick={() => router.push("/missions")} className="text-green-800">←</button>
            <div><h1 className="text-lg font-bold text-green-950">Hồ sơ và cài đặt học</h1><p className="text-xs text-slate-500">Tiến độ lưu riêng theo từng slot</p></div>
          </div>
          <button onClick={() => router.push("/slots")} className="rounded-lg bg-green-50 px-3 py-2 text-xs font-semibold text-green-800">Đổi người học</button>
        </div>
      </header>
      <main className="mx-auto max-w-xl space-y-5 px-5 py-6">
        <section className="app-card p-5">
          <h2 className="font-bold text-green-950">Người học hiện tại</h2>
          <div className="mt-3 flex gap-2"><input value={slotName} onChange={(event) => setSlotName(event.target.value)} maxLength={40} className="min-w-0 flex-1 rounded-xl border border-green-200 px-4 py-3 font-semibold outline-none focus:ring-2 focus:ring-green-400" /><button onClick={rename} className="rounded-xl bg-green-100 px-4 text-sm font-semibold text-green-800">Đổi tên</button></div>
        </section>
        <section className="grid grid-cols-3 gap-3"><Stat n={`${done.length}/${total}`} t="Bài hoàn thành" /><Stat n={String(phraseCount)} t="Câu đã lưu" /><Stat n={`${getStudyStreak()} ngày`} t="Chuỗi học" /></section>
        <section className="grid gap-3 sm:grid-cols-3"><Link href="/review" className="app-card p-4"><div className="font-semibold text-rose-800">🧠 Ôn lặp</div><div className="mt-1 text-xs text-slate-500">{reviewDue} thẻ đến hạn</div></Link><Link href="/tests" className="app-card p-4"><div className="font-semibold text-sky-800">📝 Kiểm tra nhóm</div><div className="mt-1 text-xs text-slate-500">{passedTests}/15 nhóm đã đạt</div></Link><Link href="/knowledge" className="app-card p-4"><div className="font-semibold text-violet-800">📚 Chuyên đề mới</div><div className="mt-1 text-xs text-slate-500">{knowledgeDone}/5 đã học</div></Link></section>
        <section className="app-card p-5">
          <h2 className="font-bold text-green-950">Cách hiển thị bài học</h2>
          <div className="mt-4 space-y-3">
            <Toggle label="Hiện pinyin" checked={settings.showPinyin} onChange={(value) => updateSettings({ showPinyin: value })} />
            <Toggle label="Hiện nghĩa tiếng Việt" checked={settings.showTranslation} onChange={(value) => updateSettings({ showTranslation: value })} />
            <Toggle label="Tách nghĩa từng cụm" checked={settings.showWordGloss} onChange={(value) => updateSettings({ showWordGloss: value })} />
            <Toggle label="Hiện thêm bản dịch tiếng Anh" checked={settings.showEnglish} onChange={(value) => updateSettings({ showEnglish: value })} />
            <Toggle label="Tự đọc câu của nhân vật" checked={settings.autoplayVoice} onChange={(value) => updateSettings({ autoplayVoice: value })} />
            <label className="block text-sm text-slate-700">Tốc độ đọc: {settings.speechRate.toFixed(2)}×<input type="range" min="0.55" max="1.15" step="0.05" value={settings.speechRate} onChange={(event) => updateSettings({ speechRate: Number(event.target.value) })} className="mt-2 w-full accent-green-600" /></label>
            <label className="block text-sm text-slate-700">Số lần lặp câu mẫu<select value={settings.repeatCount} onChange={(event) => updateSettings({ repeatCount: Number(event.target.value) })} className="mt-2 w-full rounded-xl border border-green-200 bg-white px-3 py-2">{[1, 2, 3, 4, 5].map((number) => <option key={number} value={number}>{number} lần</option>)}</select></label>
          </div>
        </section>
        <section className="app-card p-5">
          <h2 className="font-bold text-green-950">Tiến độ theo tình huống</h2>
          <div className="mt-4 space-y-3">{scenarios.map((scenario) => { const count = scenario.missions.filter((mission) => done.includes(mission.id)).length; return <div key={scenario.id}><div className="flex justify-between text-sm"><span>{scenario.icon} {getScenarioNameVi(scenario)}</span><span>{count}/{scenario.missions.length}</span></div><div className="mt-1 h-2 rounded-full bg-green-100"><div className="h-2 rounded-full bg-green-600" style={{ width: `${scenario.missions.length ? count / scenario.missions.length * 100 : 0}%` }} /></div></div>; })}</div>
        </section>
        <section className="app-card p-5">
          <h2 className="font-bold text-green-950">Sao lưu và đồng bộ</h2>
          <p className="mt-1 text-sm text-slate-500">Bản sao JSON chứa dữ liệu của cả 10 slot. Supabase vẫn là lựa chọn bổ sung khi cần đồng bộ nhiều thiết bị.</p>
          <div className="mt-4 grid grid-cols-2 gap-2"><button onClick={downloadBackup} className="rounded-xl bg-green-100 py-3 text-sm font-semibold text-green-800">Xuất bản sao JSON</button><button onClick={() => file.current?.click()} className="rounded-xl border border-green-200 py-3 text-sm font-semibold text-green-800">Khôi phục JSON</button><Link href="/cloud" className="col-span-2 rounded-xl bg-green-700 py-3 text-center text-sm font-semibold text-white">Mở đồng bộ Supabase</Link></div>
          <input ref={file} type="file" accept="application/json" className="hidden" onChange={(event) => importFile(event.target.files?.[0])} />
        </section>
        <section className="space-y-2"><button onClick={() => router.push("/onboarding")} className="w-full rounded-xl border border-green-200 bg-white py-3 text-green-800">Cập nhật mục tiêu và trình độ</button><button onClick={reset} className="w-full py-3 text-sm text-rose-600">Xóa toàn bộ slot học này</button></section>
      </main>
    </div>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <label className="flex items-center justify-between gap-4 text-sm text-slate-700"><span>{label}</span><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="h-5 w-5 accent-green-600" /></label>;
}
function Stat({ n, t }: { n: string; t: string }) {
  return <div className="app-card p-3 text-center"><div className="text-xl font-bold text-green-800">{n}</div><div className="mt-1 text-[11px] text-slate-500">{t}</div></div>;
}
