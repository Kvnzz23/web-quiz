"use client";
import Link from "next/link";
import { useState } from "react";
import { XP_PER_CORRECT } from "@/data/quizData";
import { ProgressBar } from "@/components/ui";
import { addHistory, getStats } from "@/lib/storage";
import type { Topic, User } from "@/types";

const LETTERS = ["A", "B", "C", "D"];

export function QuizPlayer({ topic, user }: { topic: Topic; user: User }) {

  const [index, setIndex] = useState(0); // soal ke berapa
  const [selected, setSelected] = useState<number | null>(null); // opsi yang dipilih
  const [checked, setChecked] = useState(false); // sudah diperiksa?
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [leveledUp, setLeveledUp] = useState(false);
  const [confirmExit, setConfirmExit] = useState(false);
  const [streak, setStreak] = useState(0);

  const total = topic.questions.length;
  const question = topic.questions[index];
  const isLast = index === total - 1;

  function check() {
    if (selected === question.answer) setScore((s) => s + 1);
    setChecked(true);
  }

  function next() {
    if (!isLast) {
      setIndex(index + 1);
      setSelected(null);
      setChecked(false);
      return;
    }

    const levelBefore = getStats(user).level;
    addHistory(user, {
      topicId: topic.id,
      title: topic.title,
      score,
      total,
      xp: score * XP_PER_CORRECT,
      date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
    });
    const after = getStats(user);
    setLeveledUp(after.level > levelBefore);
    setStreak(after.streak);
    setFinished(true);
  }

  function retry() {
    setIndex(0); setSelected(null); setChecked(false); setScore(0); setFinished(false);
  }

  if (finished) {
    const pct = Math.round((score / total) * 100);
    return (
      <div className="space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <p role="status" className="mb-2 text-sm font-semibold text-emerald-700">✓ Hasil kuis berhasil disimpan</p>
          <div className="text-5xl" aria-hidden>🏆</div>
          <h1 className="mt-2 text-3xl font-extrabold">{pct === 100 ? "Sempurna! 🎉" : pct >= 60 ? "Kerja bagus! 👏" : "Terus berlatih! 💪"}</h1>
          <p className="mt-1">{topic.title}: <b>{score} dari {total}</b> soal benar ({pct}%)</p>
          <p className="my-3 text-5xl font-extrabold text-amber-700">+{score * XP_PER_CORRECT} XP</p>
          <p className="mb-3 font-semibold">🔥 Streak: {streak} hari</p>
          {leveledUp && <p className="mb-3 rounded-xl bg-indigo-50 p-3 font-bold">Naik level! Sekarang level {getStats(user).level} 🚀</p>}
          <div className="flex justify-center gap-2">
            <button onClick={retry} className="min-h-[44px] rounded-xl bg-indigo-600 px-5 font-semibold text-white">Ulangi</button>
            <Link href="/explore" className="inline-flex min-h-[44px] items-center rounded-xl border-2 border-indigo-600 px-5 font-semibold text-indigo-700">Topik lain</Link>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="mb-2 text-lg font-bold">Pembahasan</h2>
          {topic.questions.map((q, i) => (
            <p key={i} className="mb-3">
              <b>{i + 1}. {q.q}</b><br />
              <span className="text-sm text-slate-600">Jawaban benar: {q.options[q.answer]}. {q.why}</span>
            </p>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <button onClick={() => setConfirmExit(true)} className="min-h-[44px] text-sm font-semibold text-slate-700">← Keluar</button>
      {confirmExit && (
        <div role="alertdialog" aria-label="Konfirmasi keluar" className="rounded-2xl border border-amber-300 bg-amber-50 p-4">
          <p className="font-semibold">Keluar dari kuis?</p>
          <p className="mb-3 text-sm text-slate-700">Jawabanmu belum tersimpan dan akan hilang.</p>
          <div className="flex gap-2">
            <button onClick={() => setConfirmExit(false)} className="min-h-[44px] rounded-xl border border-slate-400 bg-white px-4 font-semibold">Lanjut mengerjakan</button>
            <Link href="/explore" className="inline-flex min-h-[44px] items-center rounded-xl bg-indigo-600 px-4 font-semibold text-white">Ya, keluar</Link>
          </div>
        </div>
      )}
      <h1 className="text-xl font-bold">{topic.icon} {topic.title}</h1>

      <div>
        <p className="mb-1 text-sm text-slate-600">Soal {index + 1} dari {total}</p>
        <ProgressBar value={index + (checked ? 1 : 0)} max={total} label="Progres kuis" />
      </div>

      <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-bold">{question.q}</h2>

        {question.options.map((option, i) => {
          // Warna opsi: hijau = benar, merah = salah, biru = dipilih
          let color = "border-slate-300 hover:border-indigo-400";
          if (checked && i === question.answer) color = "border-emerald-600 bg-emerald-50";
          else if (checked && i === selected) color = "border-red-600 bg-red-50";
          else if (i === selected) color = "border-indigo-600 bg-indigo-50";

          return (
            <button key={i} disabled={checked} onClick={() => setSelected(i)}
              className={`min-h-[56px] w-full rounded-2xl border-2 p-3.5 text-left ${color}`}>
              <b>{LETTERS[i]}.</b> {option}
            </button>
          );
        })}

        {checked && (
          <div aria-live="polite" className={`rounded-xl p-3 ${selected === question.answer ? "bg-emerald-50 text-emerald-900" : "bg-red-50 text-red-900"}`}>
            <b>{selected === question.answer ? `Benar! +${XP_PER_CORRECT} XP` : "Kurang tepat"}</b>
            <p className="text-sm">{question.why}</p>
          </div>
        )}

        {checked ? (
          <button onClick={next} className="min-h-[48px] w-full rounded-xl bg-indigo-600 font-semibold text-white">
            {isLast ? "Lihat hasil" : "Soal berikutnya"}
          </button>
        ) : (
          <button onClick={check} disabled={selected === null}
            className="min-h-[48px] w-full rounded-xl bg-indigo-600 font-semibold text-white disabled:bg-slate-400">
            Periksa jawaban
          </button>
        )}
      </div>
    </div>
  );
}
