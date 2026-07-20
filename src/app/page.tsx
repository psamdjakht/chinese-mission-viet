"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Home(){
  const router=useRouter();
  useEffect(()=>{try{const p=JSON.parse(localStorage.getItem("chinese-mission-user")||"null");router.replace(p?.onboardingCompleted?"/missions":"/onboarding")}catch{router.replace("/onboarding")}},[router]);
  return <div className="app-shell flex items-center justify-center"><div className="text-center"><div className="text-5xl">🗣️</div><h1 className="mt-4 text-2xl font-bold text-green-950">Chinese Mission Việt</h1><p className="mt-2 text-sm text-green-700">Đang mở không gian học…</p></div></div>;
}
