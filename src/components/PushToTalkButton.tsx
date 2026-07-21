"use client";
import { useCallback, useRef, useState } from "react";
import { useVoice } from "@/lib/hooks/useVoice";

interface PushToTalkButtonProps {
  onTranscript: (text: string) => void;
  disabled?: boolean;
}

const errorVi = (error: string) => {
  const normalized = error.toLowerCase();
  if (normalized.includes("not-allowed") || normalized.includes("permission") || normalized.includes("denied")) return "Bạn chưa cấp quyền micro. Hãy cho phép micro trong trình duyệt rồi thử lại.";
  if (normalized.includes("no-speech")) return "Chưa nghe thấy tiếng nói. Hãy nói gần micro và rõ hơn.";
  if (normalized.includes("network")) return "Nhận giọng nói đang lỗi mạng. Hãy kiểm tra Internet rồi thử lại.";
  if (normalized.includes("audio-capture")) return "Không tìm thấy micro đang hoạt động.";
  return error || "Không nhận được giọng nói. Hãy thử lại.";
};

export default function PushToTalkButton({ onTranscript, disabled = false }: PushToTalkButtonProps) {
  const transcriptRef = useRef("");
  const deliveredRef = useRef("");
  const [message, setMessage] = useState("");

  const deliver = useCallback((text: string) => {
    const cleaned = text.trim();
    if (!cleaned || deliveredRef.current === cleaned) return;
    deliveredRef.current = cleaned;
    transcriptRef.current = cleaned;
    setMessage(`Đã nhận: ${cleaned}`);
    onTranscript(cleaned);
  }, [onTranscript]);

  const { startListening, stopListening, isListening, transcript, asrSupported } = useVoice({
    lang: "zh-CN",
    onResult: deliver,
    onError: (error) => setMessage(errorVi(error)),
  });

  const toggle = useCallback(async () => {
    if (disabled) return;
    if (isListening) {
      setMessage("Đang hoàn tất nhận dạng…");
      const finalText = await stopListening();
      if (finalText.trim()) deliver(finalText);
      else setMessage("Chưa nhận được tiếng Trung. Hãy thử nói chậm, rõ và gần micro hơn.");
      return;
    }
    transcriptRef.current = "";
    deliveredRef.current = "";
    setMessage("Đang nghe tiếng Trung… Bấm lại nút micro khi nói xong.");
    await startListening();
  }, [deliver, disabled, isListening, startListening, stopListening]);

  if (!asrSupported) {
    return <div className="flex flex-col items-center gap-1">
      <button disabled className="rounded-xl bg-slate-100 px-3 py-3 text-slate-400" title="Trình duyệt chưa hỗ trợ nhận giọng nói">🎙️</button>
      <span className="max-w-40 text-center text-[10px] text-slate-500">Hãy dùng Chrome hoặc Edge và cho phép micro.</span>
    </div>;
  }

  return <div className="flex max-w-44 flex-col items-center gap-1">
    <button type="button" onClick={toggle} disabled={disabled} className={`rounded-xl px-3 py-3 transition-all ${isListening ? "animate-pulse bg-red-500 text-white shadow-lg shadow-red-200" : "bg-green-100 text-green-800 hover:bg-green-200"} ${disabled ? "cursor-not-allowed opacity-40" : ""}`} title={isListening ? "Bấm để dừng và nhận dạng" : "Bấm để bắt đầu nói tiếng Trung"} aria-label={isListening ? "Dừng ghi âm" : "Bắt đầu ghi âm"}>
      {isListening ? <div className="flex h-5 w-5 items-center justify-center gap-0.5"><span className="h-3 w-0.5 animate-pulse rounded-full bg-white"/><span className="h-5 w-0.5 animate-pulse rounded-full bg-white"/><span className="h-2 w-0.5 animate-pulse rounded-full bg-white"/><span className="h-4 w-0.5 animate-pulse rounded-full bg-white"/></div> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect x="9" y="1" width="6" height="11" rx="3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>}
    </button>
    {(isListening || transcript || message) && <span className={`max-w-44 text-center text-[10px] leading-tight ${message.startsWith("Đã nhận") ? "text-green-700" : isListening ? "text-red-600" : "text-slate-500"}`}>{isListening && transcript ? transcript : message}</span>}
  </div>;
}
