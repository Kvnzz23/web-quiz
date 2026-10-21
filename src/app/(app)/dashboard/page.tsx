"use client";
import Link from "next/link";
import { TopicCard } from "@/components/TopicCard";
import { EmptyState, ProgressBar, Skeleton, StatCard } from "@/components/ui";
import { topics, XP_PER_LEVEL } from "@/data/quizData";
import { getHistory, getStats } from "@/lib/storage";
import { useUser } from "@/lib/useUser";

export default function DashboardPage() {
  const user = useUser();

  if (!user) return <div className="space-y-4"><Skeleton className="h-10 w-64" /><Skeleton /><Skeleton className="h-48" /></div>;

  const stats = getStats(user);
  const history = getHistory(user);
  const doneIds = history.map((h) => h.topicId);
  const resume = topics.find((t) => !doneIds.includes(t.id));
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold md:text-3xl">Halo, {user.name}! 👋</h1>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="XP" value={`⚡ ${stats.xp.toLocaleString("id-ID")}`} />
        <StatCard label="Streak" value={`🔥 ${stats.streak} hari`} />
        <StatCard label="Akurasi" value={`🎯 ${stats.accuracy === null ? "-" : stats.accuracy + "%"}`} />
        <StatCard label="Level" value={`🏅 ${stats.level}`} extra={
          <div className="mt-1"><ProgressBar value={stats.xpInLevel} max={XP_PER_LEVEL} label="Progres menuju level berikutnya" />
            <p className="mt-1 text-xs text-slate-600">{XP_PER_LEVEL - stats.xpInLevel} XP lagi</p></div>} />
      </div>

      {/* Satu aksi utama paling menonjol: lanjutkan belajar */}
      <section className="rounded-2xl bg-indigo-600 p-5 text-white">
        {resume ? (
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-4xl" aria-hidden>{resume.icon}</span>
            <div className="flex-1">
              <p className="text-sm text-indigo-100">Lanjutkan belajar</p>
              <p className="text-lg font-bold">{resume.title}</p>
            </div>
            <Link href={`/quiz/${resume.id}`} className="inline-flex min-h-[44px] items-center rounded-xl bg-amber-400 px-6 font-bold text-indigo-950 hover:bg-amber-300">Mulai misi</Link>
          </div>
        ) : (
          <p className="font-bold">🎉 Semua topik sudah kamu selesaikan. Hebat!</p>
        )}
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold">Topik untuk Kamu</h2>
          <Link href="/explore" className="min-h-[44px] content-center text-sm font-semibold text-indigo-700 underline">Lihat semua</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {topics.slice(0, 3).map((t) => <TopicCard key={t.id} topic={t} done={doneIds.includes(t.id)} />)}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-bold">Aktivitas Terakhir</h2>
        {history.length === 0 ? (
          <EmptyState icon="🚀" title="Belum ada aktivitas" text="Kerjakan kuis pertamamu untuk mendapatkan XP." href="/explore" action="Pilih topik" />
        ) : (
          <ul className="rounded-2xl border border-slate-200 bg-white px-4">
            {history.slice(0, 3).map((h, i) => (
              <li key={i} className="flex items-center justify-between border-b border-slate-100 py-3 last:border-0">
                <div><p className="font-semibold">{h.title}</p><p className="text-sm text-slate-600">Skor {h.score}/{h.total} · {h.date}</p></div>
                <b className="text-amber-700">+{h.xp} XP</b>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
