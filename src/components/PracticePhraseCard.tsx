"use client";
import { useState } from "react";
import GlossLine from "./GlossLine";
import { useVoice } from "@/lib/hooks/useVoice";
import { useLearningSettings } from "@/lib/settings";
import type { GlossItem } from "@/lib/types";
export default function PracticePhraseCard({pattern}:{pattern:GlossItem}){const{settings}=useLearningSettings();const{ speak,isSpeaking }=useVoice({lang:"zh-CN",rate:settings.speechRate});const[done,setDone]=useState(false);const repeat=async()=>{for(let i=0;i<settings.repeatCount;i++){speak(pattern.hanzi,"zh-CN");await new Promise(r=>setTimeout(r,Math.max(1400,pattern.hanzi.length*330)))}};return <div className="space-y-2"><GlossLine {...pattern} compact/><div className="flex gap-2"><button type="button" onClick={repeat} disabled={isSpeaking} className="flex-1 rounded-xl border border-green-200 bg-white py-2 text-sm font-medium text-green-800">🔁 Nghe {settings.repeatCount} lần</button><button type="button" onClick={()=>setDone(v=>!v)} className={`flex-1 rounded-xl py-2 text-sm font-medium ${done?"bg-green-700 text-white":"bg-green-100 text-green-800"}`}>{done?"✓ Đã thuộc tạm":"Đánh dấu đã luyện"}</button></div></div>}
