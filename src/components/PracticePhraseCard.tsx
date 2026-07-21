"use client";
import { useRef, useState } from "react";
import GlossLine from "./GlossLine";
import { useVoice } from "@/lib/hooks/useVoice";
import { useLearningSettings } from "@/lib/settings";
import type { GlossItem } from "@/lib/types";

const pause = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));

export default function PracticePhraseCard({ pattern }: { pattern: GlossItem }) {
  const { settings } = useLearningSettings();
  const { speak, stopSpeaking } = useVoice({ lang: "zh-CN", rate: settings.speechRate });
  const [done, setDone] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);
  const [currentRepeat, setCurrentRepeat] = useState(0);
  const sequenceRef = useRef(0);

  const repeat = async () => {
    if (isRepeating) {
      sequenceRef.current += 1;
      stopSpeaking();
      setIsRepeating(false);
      setCurrentRepeat(0);
      return;
    }
    const sequence = ++sequenceRef.current;
    setIsRepeating(true);
    try {
      for (let index = 0; index < settings.repeatCount; index += 1) {
        if (sequenceRef.current !== sequence) break;
        setCurrentRepeat(index + 1);
        await speak(pattern.hanzi, "zh-CN");
        if (sequenceRef.current !== sequence) break;
        if (index < settings.repeatCount - 1) await pause(450);
      }
    } finally {
      if (sequenceRef.current === sequence) {
        setIsRepeating(false);
        setCurrentRepeat(0);
      }
    }
  };

  return <div className="space-y-2">
    <GlossLine {...pattern} compact />
    <div className="flex gap-2">
      <button type="button" onClick={repeat} className={`flex-1 rounded-xl border py-2 text-sm font-medium ${isRepeating ? "border-rose-200 bg-rose-50 text-rose-700" : "border-green-200 bg-white text-green-800"}`}>
        {isRepeating ? `■ Dừng · lần ${currentRepeat}/${settings.repeatCount}` : `🔁 Nghe ${settings.repeatCount} lần`}
      </button>
      <button type="button" onClick={() => setDone((value) => !value)} className={`flex-1 rounded-xl py-2 text-sm font-medium ${done ? "bg-green-700 text-white" : "bg-green-100 text-green-800"}`}>
        {done ? "✓ Đã thuộc tạm" : "Đánh dấu đã luyện"}
      </button>
    </div>
    {isRepeating && <p className="text-center text-xs text-slate-500">Phần mềm sẽ đợi đọc xong từng câu rồi mới lặp lần tiếp theo.</p>}
  </div>;
}
