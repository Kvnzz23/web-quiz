"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Compass, History, LayoutDashboard, LogOut, Trophy, User, Zap } from "lucide-react";
import { logout } from "@/lib/storage";

const items = [
  { href: "/dashboard", label: "Beranda", icon: LayoutDashboard, match: ["/dashboard"] },
  { href: "/explore", label: "Pilih Topik", icon: Compass, match: ["/explore", "/quiz"] },
  { href: "/leaderboard", label: "Peringkat", icon: Trophy, match: ["/leaderboard"] },
  { href: "/history", label: "Riwayat", icon: History, match: ["/history"] },
  { href: "/profile", label: "Profil", icon: User, match: ["/profile"] },
];

export function AppNav() {
  const pathname = usePathname();
  const router = useRouter();
  const active = (match: string[]) => match.some((m) => pathname.startsWith(m));

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-20 flex-col border-r border-slate-200 bg-white p-3 md:flex lg:w-60">
        <Link href="/dashboard" className="mb-6 flex min-h-[44px] items-center gap-2 px-2 text-xl font-extrabold text-indigo-950">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-400"><Zap size={20} aria-hidden /></span>
          <span className="hidden lg:inline">QuizQuest</span>
        </Link>

        <nav aria-label="Menu utama" className="flex flex-1 flex-col gap-1">
          {items.map(({ href, label, icon: Icon, match }) => (
            <Link key={href} href={href} aria-label={label} aria-current={active(match) ? "page" : undefined}
              className={`flex min-h-[44px] items-center gap-3 rounded-xl px-3 font-semibold ${active(match) ? "bg-indigo-600 text-white" : "text-slate-700 hover:bg-slate-100"}`}>
              <Icon size={20} aria-hidden className="shrink-0" />
              <span className="hidden lg:inline">{label}</span>
            </Link>
          ))}
        </nav>

        <button onClick={handleLogout} aria-label="Keluar"
          className="flex min-h-[44px] items-center gap-3 rounded-xl px-3 font-semibold text-slate-700 hover:bg-slate-100">
          <LogOut size={20} aria-hidden className="shrink-0" />
          <span className="hidden lg:inline">Keluar</span>
        </button>
      </aside>

      {/* mobile version */}
      <nav aria-label="Menu utama" className="fixed inset-x-0 bottom-0 z-20 flex border-t border-slate-200 bg-white md:hidden">
        {items.map(({ href, label, icon: Icon, match }) => (
          <Link key={href} href={href} aria-current={active(match) ? "page" : undefined}
            className={`flex min-h-[56px] flex-1 flex-col items-center justify-center gap-0.5 text-xs font-semibold ${active(match) ? "text-indigo-700" : "text-slate-600"}`}>
            <Icon size={22} aria-hidden />
            {label}
          </Link>
        ))}
      </nav>
    </>
  );
}
