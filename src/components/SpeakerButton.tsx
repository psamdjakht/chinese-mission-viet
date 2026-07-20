"use client";
import { useVoice } from "@/lib/hooks/useVoice";
import { useLearningSettings } from "@/lib/settings";

interface SpeakerButtonProps { text: string; lang?: string; size?: "sm" | "md"; }
export default function SpeakerButton({ text, lang="zh-CN", size="sm" }: SpeakerButtonProps){
  const { settings }=useLearningSettings();
  const { speak,stopSpeaking,isSpeaking,ttsSupported }=useVoice({lang,rate:settings.speechRate});
  if(!ttsSupported)return null;
  const handle=(e:React.MouseEvent)=>{e.stopPropagation();e.preventDefault();isSpeaking?stopSpeaking():speak(text,lang)};
  return <button type="button" onClick={handle} title={isSpeaking?"Dừng đọc":"Nghe phát âm"} className={`inline-flex items-center justify-center rounded-full ${size==="sm"?"h-7 w-7":"h-9 w-9"} ${isSpeaking?"bg-green-100 text-green-700 animate-pulse":"text-green-700 hover:bg-green-50"}`} aria-label={isSpeaking?"Dừng đọc":"Nghe phát âm"}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={size==="sm"?"h-4 w-4":"h-5 w-5"}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
  </button>;
}
