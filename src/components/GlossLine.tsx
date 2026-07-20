"use client";
import { useState } from "react";
import SpeakerButton from "@/components/SpeakerButton";
import { useLearningSettings } from "@/lib/settings";
import { getGlossVi,getNaturalVi,getNoteVi } from "@/lib/i18n/vi";
import type { GlossItem } from "@/lib/types";

interface GlossLineProps extends Pick<GlossItem,"hanzi"|"pinyin"|"chunks"|"gloss"|"naturalEn"|"naturalVi"|"glossVi"|"note"|"noteVi"> { showPinyin?:boolean; compact?:boolean; }
export default function GlossLine(props:GlossLineProps){
  const {settings}=useLearningSettings(); const [expanded,setExpanded]=useState(false);
  const translated=getGlossVi(props); const natural=getNaturalVi(props); const note=getNoteVi(props);
  const content=<>
    <div className="flex items-start justify-between gap-2"><div><div lang="zh" className="text-xl font-semibold text-green-950">{props.hanzi}</div>{settings.showPinyin&&props.showPinyin!==false&&props.pinyin&&<div className="mt-1 text-sm font-medium text-green-700">{props.pinyin}</div>}</div><SpeakerButton text={props.hanzi}/></div>
    {settings.showWordGloss&&<div className="flex flex-wrap gap-x-4 gap-y-2 border-y border-green-100 py-3">{props.chunks.map((c,i)=><div key={`${c}-${i}`} className="text-center"><div lang="zh" className="font-medium text-green-950">{c}</div><div className="text-xs text-green-700">{translated[i]||props.gloss[i]}</div></div>)}</div>}
    {settings.showTranslation&&<div className="text-sm text-slate-600"><span className="font-medium text-green-800">Nghĩa Việt:</span> {natural}</div>}
    {settings.showEnglish&&<div className="text-xs italic text-slate-400">English: {props.naturalEn}</div>}
    {note&&<div className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">💡 {note}</div>}
  </>;
  if(props.compact)return <div className="app-card overflow-hidden"><button type="button" onClick={()=>setExpanded(v=>!v)} className="w-full p-4 text-left"><div className="flex items-center justify-between"><div><div lang="zh" className="text-xl font-semibold text-green-950">{props.hanzi}</div>{settings.showPinyin&&props.pinyin&&<div className="mt-1 text-sm text-green-700">{props.pinyin}</div>}</div><span className="text-xs text-green-700">{expanded?"Thu gọn":"Xem cấu trúc"}</span></div></button>{expanded&&<div className="space-y-3 border-t border-green-100 px-4 pb-4 pt-3">{content}</div>}</div>;
  return <div className="app-card space-y-3 p-4">{content}</div>;
}
