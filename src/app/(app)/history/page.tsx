"use client";
import { EmptyState, Skeleton } from "@/components/ui";
import { getHistory } from "@/lib/storage";
import { useUser } from "@/lib/useUser";

export default function HistoryPage() {
  const user = useUser();
  if (!user) return <div className="space-y-3"><Skeleton className="h-10 w-48" /><Skeleton className="h-48" /></div>;

  const history = getHistory(user);

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold md:text-3xl">📜 Riwayat Kuis</h1>
      {history.length === 0 ? (
        <EmptyState icon="📝" title="Belum ada riwayat" text="Hasil kuis yang kamu kerjakan akan muncul di sini." href="/explore" action="Mulai kuis pertama" />
      ) : (
        <ul className="rounded-2xl border border-slate-200 bg-white px-4">
          {history.map((h, i) => (
            <li key={i} className="flex items-center justify-between border-b border-slate-100 py-3 last:border-0">
              <div><p className="font-semibold">{h.title}</p><p className="text-sm text-slate-600">Skor {h.score}/{h.total} · {h.date}</p></div>
              <b className="text-amber-700">+{h.xp} XP</b>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
