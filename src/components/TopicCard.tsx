import Link from "next/link";
import type { Difficulty, Topic } from "@/types";

const badgeColor: Record<Difficulty, string> = {
  Easy: "bg-emerald-100 text-emerald-800",
  Medium: "bg-amber-100 text-amber-800",
  Hard: "bg-red-100 text-red-800",
};

export function TopicCard({ topic, done }: { topic: Topic; done: boolean }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="text-4xl">{topic.icon}</div>
      <h3 className="mt-2 font-bold">{topic.title}</h3>
      <p className="text-sm text-slate-600">{topic.desc}</p>
      <p className="my-3 flex items-center gap-2 text-sm">
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${badgeColor[topic.difficulty]}`}>{topic.difficulty}</span>
        <span className="text-slate-600">{topic.questions.length} soal</span>
        {done && <span className="font-semibold text-emerald-700">✓ Selesai</span>}
      </p>
      <Link href={`/quiz/${topic.id}`} className="inline-flex min-h-[44px] items-center rounded-xl bg-indigo-600 px-5 font-semibold text-white hover:bg-indigo-700">
        Mulai
      </Link>
    </div>
  );
}
