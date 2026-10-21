"use client";
import { useState } from "react";
import { TopicCard } from "@/components/TopicCard";
import { EmptyState, Skeleton } from "@/components/ui";
import { categories, difficulties, topics } from "@/data/quizData";
import { getHistory } from "@/lib/storage";
import { useUser } from "@/lib/useUser";

function Chips({ label, items, value, onChange }: { label: string; items: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {items.map((c) => (
        <button key={c} onClick={() => onChange(c)} aria-pressed={c === value}
          className={`min-h-[44px] rounded-full border px-4 text-sm font-semibold ${c === value ? "border-indigo-600 bg-indigo-600 text-white" : "border-slate-400 bg-white text-slate-800"}`}>{c}</button>
      ))}
    </div>
  );
}

export default function ExplorePage() {
  const user = useUser();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");
  const [difficulty, setDifficulty] = useState("Semua");

  if (!user) return <div className="space-y-4"><Skeleton className="h-10 w-64" /><Skeleton className="h-48" /></div>;

  const doneIds = getHistory(user).map((h) => h.topicId);
  const shown = topics.filter(
    (t) =>
      (category === "Semua" || t.category === category) &&
      (difficulty === "Semua" || t.difficulty === difficulty) &&
      (t.title + t.desc).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-bold md:text-3xl">Pilih Topik</h1>
        <p className="text-slate-600">Pilih topik yang ingin kamu latih hari ini.</p>
      </header>

      <label className="block max-w-md font-semibold">Cari topik
        <input type="search" placeholder="Contoh: SQL, Scrum, TCP/IP" value={search} onChange={(e) => setSearch(e.target.value)}
          className="mt-1 min-h-[44px] w-full rounded-xl border border-slate-400 px-3 font-normal" />
      </label>
      <Chips label="Filter kategori" items={categories} value={category} onChange={setCategory} />
      <Chips label="Filter tingkat kesulitan" items={difficulties} value={difficulty} onChange={setDifficulty} />

      <p aria-live="polite" className="text-sm text-slate-600">{shown.length} topik ditemukan</p>
      {shown.length === 0 ? (
        <EmptyState title="Tidak ada topik yang cocok" text="Coba ubah kata kunci atau filter." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {shown.map((t) => <TopicCard key={t.id} topic={t} done={doneIds.includes(t.id)} />)}
        </div>
      )}
    </div>
  );
}
