"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PASSWORD, users } from "@/data/quizData";
import { login } from "@/lib/storage";

const inputClass = "mt-1 min-h-[44px] w-full rounded-xl border border-slate-400 px-3";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Validasi dengan pesan error yang spesifik
    const next: typeof errors = {};
    if (!email.trim()) next.email = "Email wajib diisi.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Format email tidak valid, contoh: nama@quizquest.id.";
    if (!password) next.password = "Password wajib diisi.";
    if (!next.email && !next.password && !login(email, password)) next.form = "Email atau password salah. Coba pakai salah satu akun demo.";
    setErrors(next);
    if (Object.keys(next).length === 0) router.push("/dashboard");
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4 py-8">
      <Link href="/" className="mb-4 text-sm font-semibold text-indigo-700 underline">← Kembali ke beranda</Link>
      <form onSubmit={handleSubmit} noValidate className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
        <h1 className="text-2xl font-extrabold">Masuk ke QuizQuest</h1>

        {errors.form && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-800">{errors.form}</p>}

        <label className="block font-semibold">Email
          <input type="email" className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined} />
          {errors.email && <span id="email-err" role="alert" className="text-sm font-normal text-red-700">{errors.email}</span>}
        </label>

        <label className="block font-semibold">Password
          <input type="password" className={inputClass} value={password} onChange={(e) => setPassword(e.target.value)}
            aria-invalid={!!errors.password} aria-describedby={errors.password ? "pw-err" : undefined} />
          {errors.password && <span id="pw-err" role="alert" className="text-sm font-normal text-red-700">{errors.password}</span>}
        </label>

        <button className="min-h-[44px] w-full rounded-xl bg-indigo-600 font-semibold text-white hover:bg-indigo-700">Masuk</button>

        <div className="border-t border-slate-200 pt-3 text-sm text-slate-700">
          <p className="mb-2">Akun demo (password: <b>{PASSWORD}</b>) — klik untuk mengisi:</p>
          <div className="flex flex-wrap gap-2">
            {users.map((u) => (
              <button type="button" key={u.email} onClick={() => { setEmail(u.email); setPassword(PASSWORD); setErrors({}); }}
                className="min-h-[44px] rounded-full border border-slate-400 px-4 hover:bg-slate-50">{u.avatar} {u.name}</button>
            ))}
          </div>
        </div>
      </form>
    </main>
  );
}
