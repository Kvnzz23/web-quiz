"use client";
import { Skeleton } from "@/components/ui";
import { rivals, users } from "@/data/quizData";
import { getStats } from "@/lib/storage";
import { useUser } from "@/lib/useUser";

export default function LeaderboardPage() {
  const user = useUser();
  if (!user) return <div className="space-y-3"><Skeleton className="h-10 w-48" /><Skeleton className="h-72" /></div>;

  // Gabungkan semua teman sekelas; akun yang login memakai XP terbaru
  const everyone = [
    ...users.map((u) => ({ ...u, xp: u.email === user.email ? getStats(user).xp : u.xp })),
    ...rivals,
  ].sort((a, b) => b.xp - a.xp);

  return (
    <div>
      <h1 className="text-2xl font-bold md:text-3xl">🏆 Peringkat Kelas</h1>
      <p className="mb-4 text-slate-600">Kumpulkan XP untuk naik peringkat.</p>
      <ol className="rounded-2xl border border-slate-200 bg-white p-2">
        {everyone.map((p, i) => (
          <li key={p.name} className={`flex min-h-[56px] items-center gap-3 rounded-xl px-3 ${p.name === user.name ? "bg-indigo-50 font-bold" : ""}`}>
            <span className="w-8 text-center" aria-label={`Peringkat ${i + 1}`}>{["🥇", "🥈", "🥉"][i] ?? i + 1}</span>
            <span aria-hidden>{p.avatar}</span>
            <span className="flex-1">{p.name}{p.name === user.name && " (kamu)"}</span>
            <span>{p.xp.toLocaleString("id-ID")} XP</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
