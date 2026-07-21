"use client";

import SpeakerButton from "@/components/SpeakerButton";
import { getSlotVi } from "@/lib/i18n/vi";
import { useLearningSettings } from "@/lib/settings";
import type { ScenarioLessonGuide } from "@/lib/data/lesson-guides";

interface LessonKnowledgePanelProps {
  guide: ScenarioLessonGuide;
  challenge: string;
  requiredSlots: string[];
  optionalSlots: string[];
}

export default function LessonKnowledgePanel({
  guide,
  challenge,
  requiredSlots,
  optionalSlots,
}: LessonKnowledgePanelProps) {
  const { settings } = useLearningSettings();

  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-5">
        <div className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Kiến thức mở rộng đã chuẩn hóa</div>
        <p className="mt-2 text-sm leading-6 text-slate-700">{guide.summaryVi}</p>
        <div className="mt-4 rounded-xl bg-emerald-700 px-4 py-3 text-sm text-white">
          <span className="font-semibold">Thử thách bài này:</span> {challenge}
        </div>
      </div>

      <details className="app-card overflow-hidden" open>
        <summary className="cursor-pointer list-none px-4 py-4 font-semibold text-green-950">
          <div className="flex items-center justify-between gap-3">
            <span>🧩 Từ và cụm từ trọng tâm</span>
            <span className="text-xs font-normal text-slate-500">{guide.vocabulary.length} mục</span>
          </div>
        </summary>
        <div className="grid grid-cols-1 gap-2 border-t border-green-100 p-4 sm:grid-cols-2">
          {guide.vocabulary.map((item) => (
            <div key={`${item.hanzi}-${item.pinyin}`} className="flex items-start justify-between gap-3 rounded-xl bg-green-50/70 px-3 py-3">
              <div>
                <div lang="zh" className="text-lg font-semibold text-green-950">{item.hanzi}</div>
                {settings.showPinyin && <div className="text-xs font-medium text-green-700">{item.pinyin}</div>}
                <div className="mt-1 text-xs text-slate-600">{item.vi}</div>
              </div>
              <SpeakerButton text={item.hanzi} />
            </div>
          ))}
        </div>
      </details>

      <details className="app-card overflow-hidden" open>
        <summary className="cursor-pointer list-none px-4 py-4 font-semibold text-green-950">🧱 Khung câu có thể tái sử dụng</summary>
        <div className="space-y-3 border-t border-green-100 p-4">
          {guide.sentenceFrames.map((frame, index) => (
            <div key={`${frame.hanzi}-${index}`} className="rounded-xl border border-green-100 bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div lang="zh" className="text-lg font-semibold text-green-950">{frame.hanzi}</div>
                  {settings.showPinyin && <div className="mt-1 text-sm text-green-700">{frame.pinyin}</div>}
                </div>
                <SpeakerButton text={frame.hanzi} />
              </div>
              <div className="mt-2 text-sm text-slate-700">{frame.vi}</div>
              <div className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-800">💡 {frame.noteVi}</div>
            </div>
          ))}
        </div>
      </details>

      <details className="app-card overflow-hidden">
        <summary className="cursor-pointer list-none px-4 py-4 font-semibold text-green-950">💬 Hội thoại mẫu hoàn chỉnh</summary>
        <div className="space-y-3 border-t border-green-100 p-4">
          {guide.dialogue.map((turn, index) => {
            const isLearner = turn.speakerVi === "Bạn";
            return (
              <div key={`${turn.hanzi}-${index}`} className={`flex ${isLearner ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[92%] rounded-2xl px-4 py-3 ${isLearner ? "bg-green-700 text-white" : "bg-green-50 text-green-950"}`}>
                  <div className={`text-[11px] font-semibold uppercase tracking-wider ${isLearner ? "text-green-100" : "text-green-700"}`}>{turn.speakerVi}</div>
                  <div className="mt-1 flex items-start gap-2">
                    <div>
                      <div lang="zh" className="text-base font-semibold">{turn.hanzi}</div>
                      {settings.showPinyin && <div className={`mt-1 text-xs ${isLearner ? "text-green-100" : "text-green-700"}`}>{turn.pinyin}</div>}
                    </div>
                    <SpeakerButton text={turn.hanzi} />
                  </div>
                  <div className={`mt-2 text-xs leading-5 ${isLearner ? "text-green-50" : "text-slate-600"}`}>{turn.vi}</div>
                </div>
              </div>
            );
          })}
        </div>
      </details>

      <details className="app-card overflow-hidden">
        <summary className="cursor-pointer list-none px-4 py-4 font-semibold text-green-950">🎯 Cách dùng thực tế và phép lịch sự</summary>
        <div className="space-y-2 border-t border-green-100 p-4">
          {guide.pragmatics.map((tip, index) => (
            <div key={tip} className="flex gap-3 rounded-xl bg-sky-50 px-3 py-3 text-sm leading-6 text-slate-700">
              <span className="font-bold text-sky-700">{index + 1}</span>
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </details>

      <details className="app-card overflow-hidden">
        <summary className="cursor-pointer list-none px-4 py-4 font-semibold text-green-950">⚠️ Lỗi người Việt dễ mắc</summary>
        <div className="space-y-3 border-t border-green-100 p-4">
          {guide.commonMistakes.map((mistake, index) => (
            <div key={`${mistake.wrong}-${index}`} className="rounded-xl border border-rose-100 bg-rose-50/60 p-4">
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="rounded-lg bg-white px-3 py-2">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-rose-600">Không nên</div>
                  <div lang="zh" className="mt-1 font-semibold text-rose-800">✕ {mistake.wrong}</div>
                </div>
                <div className="rounded-lg bg-white px-3 py-2">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-green-600">Nên nói</div>
                  <div lang="zh" className="mt-1 font-semibold text-green-800">✓ {mistake.right}</div>
                </div>
              </div>
              <div className="mt-2 text-xs leading-5 text-slate-600">{mistake.explanationVi}</div>
            </div>
          ))}
        </div>
      </details>

      <details className="app-card overflow-hidden">
        <summary className="cursor-pointer list-none px-4 py-4 font-semibold text-green-950">🔊 Trọng điểm phát âm</summary>
        <div className="space-y-2 border-t border-green-100 p-4">
          {guide.pronunciationFocus.map((tip, index) => (
            <div key={tip} className="flex gap-3 text-sm leading-6 text-slate-700">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">{index + 1}</span>
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </details>

      <section className="rounded-2xl border border-green-200 bg-white p-5">
        <h3 className="font-semibold text-green-950">Tự kiểm tra trước khi bắt đầu hội thoại</h3>
        <div className="mt-3 space-y-3 text-sm text-slate-700">
          <label className="flex items-start gap-3"><input type="checkbox" className="mt-1 accent-green-700" /><span>Tôi nói được ít nhất một câu cốt lõi mà không nhìn pinyin.</span></label>
          <label className="flex items-start gap-3"><input type="checkbox" className="mt-1 accent-green-700" /><span>Tôi có thể truyền đạt đủ: {requiredSlots.map(getSlotVi).join(", ")}.</span></label>
          <label className="flex items-start gap-3"><input type="checkbox" className="mt-1 accent-green-700" /><span>Tôi sẵn sàng trả lời ít nhất một câu hỏi phụ của nhân vật.</span></label>
          {optionalSlots.length > 0 && <label className="flex items-start gap-3"><input type="checkbox" className="mt-1 accent-green-700" /><span>Tôi sẽ thử thêm một ý mở rộng: {optionalSlots.map(getSlotVi).join(", ")}.</span></label>}
        </div>
      </section>
    </section>
  );
}
