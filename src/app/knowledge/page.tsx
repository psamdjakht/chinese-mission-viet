"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { extendedKnowledgePacks } from "@/lib/data/extended-knowledge";
import { getCompletedKnowledgeIds } from "@/lib/knowledge-progress";
import { getActiveSlot } from "@/lib/slots";

export default function KnowledgePage() {
  const router = useRouter();
  const [completed, setCompleted] = useState<string[]>([]);
  const [learnerName, setLearnerName] = useState("");

  useEffect(() => {
    const slot = getActiveSlot();
    if (!slot) {
      router.replace("/slots");
      return;
    }
    setLearnerName(slot.name);
    setCompleted(getCompletedKnowledgeIds());
  }, [router]);

  return (
    <div className="app-shell">
      <header className="border-b border-green-100 bg-white/90 px-5 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button onClick={() => router.push("/missions")} className="text-green-800">←</button>
            <div>
              <h1 className="text-xl font-bold text-green-950">5 chuyên đề kiến thức mới</h1>
              <p className="text-xs text-slate-500">{learnerName} · {completed.length}/5 chuyên đề đã học</p>
            </div>
          </div>
          <Link href="/review" className="rounded-xl bg-green-100 px-3 py-2 text-xs font-semibold text-green-800">Ôn lặp ngắt quãng</Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl space-y-5 px-5 py-6">
        <section className="rounded-3xl border border-green-200 bg-gradient-to-br from-green-50 to-white p-6">
          <div className="text-xs font-bold uppercase tracking-[0.16em] text-green-700">Bổ sung, không thay đổi bộ cũ</div>
          <h2 className="mt-2 text-xl font-bold text-green-950">Nền tảng giao tiếp dùng được trong nhiều tình huống</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Năm chuyên đề này bổ sung các điểm ngữ âm, số lượng, thời gian, nối ý và xử lý khi không nghe kịp. Toàn bộ 15 bộ kiến thức tình huống cũ được giữ nguyên.</p>
        </section>
        <div className="grid gap-4 sm:grid-cols-2">
          {extendedKnowledgePacks.map((pack) => {
            const done = completed.includes(pack.id);
            return (
              <Link key={pack.id} href={`/knowledge/${pack.id}`} className="app-card p-5 transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <div className="text-3xl">{pack.icon}</div>
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${done ? "bg-green-600 text-white" : "bg-green-100 text-green-800"}`}>{done ? "Đã học" : pack.level}</span>
                </div>
                <h2 className="mt-4 font-bold text-green-950">{pack.titleVi}</h2>
                <div lang="zh" className="mt-1 text-sm text-green-700">{pack.titleCn}</div>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{pack.summaryVi}</p>
                <div className="mt-4 text-xs text-slate-500">{pack.terms.length} khái niệm · {pack.patterns.length} cấu trúc · {pack.drills.length} bài luyện</div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
