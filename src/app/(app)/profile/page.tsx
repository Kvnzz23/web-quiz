"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut } from "lucide-react";
import { ProgressBar, Skeleton, StatCard } from "@/components/ui";
import { XP_PER_LEVEL } from "@/data/quizData";
import { clearHistory, getHistory, getStats, logout } from "@/lib/storage";
import { useUser } from "@/lib/useUser";

export default function ProfilePage() {
  const user = useUser();
  const router = useRouter();
  const [confirmReset, setConfirmReset] = useState(false); // konfirmasi tindakan
  const [message, setMessage] = useState(""); // umpan balik berhasil

  if (!user) return <div className="space-y-3"><Skeleton className="h-10 w-48" /><Skeleton className="h-40" /></div>;

  const stats = getStats(user);

  function handleReset() {
    clearHistory(user!);
    setConfirmReset(false);
    setMessage("Progres kuis berhasil direset.");
  }

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold md:text-3xl">Profil</h1>

      <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5">
        <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-100 text-5xl" aria-hidden>{user.avatar}</span>
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-bold">{user.name} <span className="ml-1 rounded-full bg-indigo-100 px-2.5 py-0.5 text-sm text-indigo-800">Level {stats.level}</span></h2>
          <p className="text-sm text-slate-600">{user.email}</p>
          <div className="mt-3 max-w-sm">
            <p className="mb-1 text-sm font-semibold">{XP_PER_LEVEL - stats.xpInLevel} XP lagi menuju level {stats.level + 1}</p>
            <ProgressBar value={stats.xpInLevel} max={XP_PER_LEVEL} label="Progres menuju level berikutnya" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Total XP" value={`⚡ ${stats.xp.toLocaleString("id-ID")}`} />
        <StatCard label="Streak" value={`🔥 ${stats.streak} hari`} />
        <StatCard label="Akurasi" value={`🎯 ${stats.accuracy === null ? "-" : stats.accuracy + "%"}`} />
        <StatCard label="Kuis selesai" value={`✅ ${getHistory(user).length}`} />
      </div>

      {message && <p role="status" className="rounded-xl bg-emerald-50 p-3 font-semibold text-emerald-800">✓ {message}</p>}

      {confirmReset && (
        <div role="alertdialog" aria-label="Konfirmasi reset" className="rounded-2xl border border-amber-300 bg-amber-50 p-4">
          <p className="font-semibold">Reset semua progres kuis?</p>
          <p className="mb-3 text-sm text-slate-700">Riwayat, XP dari kuis, dan streak akan kembali seperti awal.</p>
          <div className="flex gap-2">
            <button onClick={() => setConfirmReset(false)} className="min-h-[44px] rounded-xl border border-slate-400 bg-white px-4 font-semibold">Batal</button>
            <button onClick={handleReset} className="min-h-[44px] rounded-xl bg-red-700 px-4 font-semibold text-white">Ya, reset</button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <button onClick={() => { setMessage(""); setConfirmReset(true); }} className="min-h-[44px] rounded-xl border-2 border-indigo-600 px-4 font-semibold text-indigo-700">Reset progres</button>
        <button onClick={() => { logout(); router.push("/login"); }} className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-400 px-4 font-semibold">
          <LogOut size={18} aria-hidden /> Keluar
        </button>
      </div>
    </div>
  );
}
