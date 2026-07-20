"use client";
import SpeakerButton from "./SpeakerButton";
import { useLearningSettings } from "@/lib/settings";
interface ChatBubbleProps{role:"user"|"npc"|"system";textCn:string;textVi?:string;textEn?:string;understood?:boolean;npcRole?:string;timestamp?:string}
export default function ChatBubble({role,textCn,textVi,textEn,understood,npcRole}:ChatBubbleProps){
  const {settings}=useLearningSettings();
  if(role==="system")return <div className="my-2 flex justify-center"><div className="rounded-full bg-green-100 px-3 py-1.5 text-xs text-green-800">{textCn}</div></div>;
  const user=role==="user";
  return <div className={`mb-3 flex ${user?"justify-end":"justify-start"}`}><div className="max-w-[86%]">{!user&&npcRole&&<div className="mb-1 ml-1 text-xs text-green-700">{npcRole}</div>}<div className={`rounded-2xl px-4 py-3 ${user?"rounded-br-md bg-green-700 text-white":"rounded-bl-md border border-green-200 bg-white text-green-950"}`}><div className="flex items-start gap-2"><div lang="zh" className="flex-1 text-base">{textCn}</div>{!user&&<SpeakerButton text={textCn}/>}</div>{!user&&settings.showTranslation&&textVi&&<div className="mt-1 text-sm text-slate-600">{textVi}</div>}{!user&&settings.showEnglish&&textEn&&<div className="mt-1 text-xs text-slate-400">{textEn}</div>}</div>{user&&understood!==undefined&&<div className={`mt-1 text-right text-xs ${understood?"text-green-700":"text-amber-600"}`}>{understood?"✓ Đã hiểu":"△ Chưa nhận đủ ý; thử câu mẫu hoặc mở gợi ý"}</div>}</div></div>;
}
