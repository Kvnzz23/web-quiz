import Link from "next/link";

export function Skeleton({ className = "h-24" }: { className?: string }) {
  return <div aria-hidden className={`animate-pulse rounded-2xl bg-slate-200 ${className}`} />;
}

export function EmptyState({ icon = "📭", title, text, href, action }: {
  icon?: string; title: string; text?: string; href?: string; action?: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
      <div className="text-4xl" aria-hidden>{icon}</div>
      <p className="mt-2 font-bold">{title}</p>
      {text && <p className="text-sm text-slate-600">{text}</p>}
      {href && action && (
        <Link href={href} className="mt-4 inline-flex min-h-[44px] items-center rounded-xl bg-indigo-600 px-5 font-semibold text-white hover:bg-indigo-700">{action}</Link>
      )}
    </div>
  );
}

export function StatCard({ label, value, extra }: { label: string; value: string; extra?: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="text-sm text-slate-600">{label}</p>
      <p className="text-xl font-extrabold md:text-2xl">{value}</p>
      {extra}
    </div>
  );
}

export function ProgressBar({ value, max, label }: { value: number; max: number; label: string }) {
  return (
    <div role="progressbar" aria-label={label} aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}
      className="h-2.5 overflow-hidden rounded-full bg-slate-200">
      <div className="h-full bg-amber-400 transition-all" style={{ width: `${(value / max) * 100}%` }} />
    </div>
  );
}
