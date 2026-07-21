"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getActiveSlot, getActiveSlotId, getSlotItem, setSlotItem } from "@/lib/slots";

type Goal = "survival" | "social" | "work" | "travel";
type Level = "A0" | "A1" | "A2";
type Mode = "text" | "voice" | "mixed";

const goals: [Goal, string, string, string][] = [
  ["survival", "Giao tiếp thiết yếu", "🏠", "Ăn uống, mua sắm, sức khỏe và sinh hoạt hằng ngày"],
  ["social", "Kết bạn và đời sống", "👋", "Tự giới thiệu, kết bạn, hẹn gặp và xử lý hiểu lầm"],
  ["work", "Công việc", "💼", "Chào hỏi, nhờ hỗ trợ, báo cáo và trao đổi thời hạn"],
  ["travel", "Du lịch", "✈️", "Taxi, khách sạn, sân bay, tàu và tình huống an toàn"],
];
const levels: [Level, string, string][] = [
  ["A0", "Mới bắt đầu", "Chưa biết hoặc chỉ biết vài từ"],
  ["A1", "Biết một số câu", "Có thể nói chào hỏi và câu rất ngắn"],
  ["A2", "Nói được câu đơn giản", "Có thể xử lý hội thoại cơ bản"],
];
const modes: [Mode, string, string][] = [
  ["text", "Ưu tiên gõ", "⌨️"],
  ["mixed", "Gõ và nói", "🔄"],
  ["voice", "Ưu tiên nói", "🎤"],
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [level, setLevel] = useState<Level | null>(null);
  const [mode, setMode] = useState<Mode>("mixed");
  const [returning, setReturning] = useState(false);
  const [learnerName, setLearnerName] = useState("");

  useEffect(() => {
    const slotId = getActiveSlotId();
    if (!slotId) {
      router.replace("/slots");
      return;
    }
    setLearnerName(getActiveSlot()?.name || "Người học");
    try {
      const profile = JSON.parse(getSlotItem("chinese-mission-user") || "null");
      if (profile?.onboardingCompleted) {
        setReturning(true);
        setGoal(profile.goal || null);
        setLevel(profile.level || null);
        setMode(profile.mode || "mixed");
      }
    } catch {}
  }, [router]);

  const save = () => {
    if (!goal || !level) return;
    const slot = getActiveSlot();
    if (!slot) {
      router.replace("/slots");
      return;
    }
    setSlotItem(
      "chinese-mission-user",
      JSON.stringify({
        id: slot.id,
        name: slot.name,
        nativeLanguage: "vi",
        bridgeLanguage: "vi",
        goal,
        level,
        currentLevel: level,
        mode,
        preferredMode: mode,
        onboardingCompleted: true,
        createdAt: new Date().toISOString(),
      }),
    );
    router.push("/missions");
  };

  return (
    <div className="app-shell">
      <div className="mx-auto max-w-lg px-5 py-8">
        <div className="mb-4 flex items-center justify-between text-xs">
          <button onClick={() => router.push("/slots")} className="font-semibold text-green-800">← Đổi người học</button>
          <span className="rounded-full bg-white px-3 py-1 text-green-800 shadow-sm">👤 {learnerName}</span>
        </div>
        <div className="mb-8 flex gap-2">
          {[0, 1, 2].map((value) => <div key={value} className={`h-1.5 flex-1 rounded-full ${value <= step ? "bg-green-600" : "bg-green-100"}`} />)}
        </div>
        {returning && (
          <div className="mb-6 flex items-center justify-between rounded-xl border border-green-200 bg-green-50 p-4">
            <span className="text-sm text-green-900">Slot này đã có tiến độ học.</span>
            <button onClick={() => router.push("/missions")} className="text-sm font-semibold text-green-800 underline">Tiếp tục học</button>
          </div>
        )}
        {step === 0 && (
          <section className="space-y-6">
            <div>
              <div className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">50 bài · Dạy bằng tiếng Việt</div>
              <h1 className="mt-3 text-3xl font-bold text-green-950">Học tiếng Trung qua nhiệm vụ thực tế</h1>
              <p className="mt-2 text-slate-600">Bạn muốn ưu tiên mục tiêu nào trước?</p>
            </div>
            <div className="space-y-3">
              {goals.map(([value, label, icon, description]) => (
                <button key={value} onClick={() => { setGoal(value); setStep(1); }} className={`app-card flex w-full gap-4 p-4 text-left ${goal === value ? "ring-2 ring-green-500" : ""}`}>
                  <span className="text-2xl">{icon}</span>
                  <span><span className="block font-semibold text-green-950">{label}</span><span className="text-sm text-slate-500">{description}</span></span>
                </button>
              ))}
            </div>
          </section>
        )}
        {step === 1 && (
          <section className="space-y-6">
            <div><h1 className="text-2xl font-bold text-green-950">Trình độ hiện tại</h1><p className="mt-2 text-slate-600">Mức này dùng để sắp xếp gợi ý và độ khó.</p></div>
            <div className="space-y-3">{levels.map(([value, label, description]) => <button key={value} onClick={() => { setLevel(value); setStep(2); }} className={`app-card w-full p-4 text-left ${level === value ? "ring-2 ring-green-500" : ""}`}><span className="font-semibold text-green-950">{value} · {label}</span><span className="mt-1 block text-sm text-slate-500">{description}</span></button>)}</div>
            <button onClick={() => setStep(0)} className="text-sm text-green-800">← Quay lại</button>
          </section>
        )}
        {step === 2 && (
          <section className="space-y-6">
            <div><h1 className="text-2xl font-bold text-green-950">Cách luyện chính</h1><p className="mt-2 text-slate-600">Có thể đổi bất kỳ lúc nào trong hồ sơ.</p></div>
            <div className="flex gap-3">{modes.map(([value, label, icon]) => <button key={value} onClick={() => setMode(value)} className={`app-card flex-1 p-4 text-center ${mode === value ? "ring-2 ring-green-500" : ""}`}><span className="block text-2xl">{icon}</span><span className="mt-2 block text-sm font-semibold text-green-950">{label}</span></button>)}</div>
            <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-900"><b>Kho bài học:</b> 50 nhiệm vụ về ăn uống, mua sắm, di chuyển, khách sạn, sức khỏe, công việc và tình huống an toàn.</div>
            <button onClick={save} className="mint-button w-full py-4 text-lg font-semibold">Bắt đầu học →</button>
            <button onClick={() => setStep(1)} className="text-sm text-green-800">← Quay lại</button>
          </section>
        )}
      </div>
    </div>
  );
}
