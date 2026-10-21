import Link from "next/link";
import { BookOpen, Flame, History, MessageSquareText, Monitor, Smartphone, Tablet, Trophy, Zap } from "lucide-react";
import { topics } from "@/data/quizData";

const features = [
  { icon: BookOpen, title: "Kuis per topik", text: "Pilih topik yang ingin dilatih, dari pemrograman, basis data, sampai jaringan." },
  { icon: Zap, title: "Level & XP", text: "Setiap jawaban benar memberi XP. Kumpulkan XP untuk naik level." },
  { icon: Flame, title: "Streak belajar", text: "Belajar setiap hari untuk menjaga api streak tetap menyala." },
  { icon: MessageSquareText, title: "Pembahasan jawaban", text: "Setiap soal dilengkapi penjelasan supaya kamu benar-benar paham." },
  { icon: Trophy, title: "Papan peringkat kelas", text: "Bandingkan XP-mu dengan teman sekelas dan jadi nomor satu." },
  { icon: History, title: "Riwayat aktivitas", text: "Pantau skor dan XP dari setiap kuis yang pernah kamu kerjakan." },
];

const steps = ["Pilih topik", "Mulai misi", "Jawab soal", "Lihat pembahasan", "Dapat XP", "Naik level"];

const devices = [
  { icon: Smartphone, name: "Mobile", points: ["Satu kolom", "Navigasi bawah", "Tombol mudah dijangkau"] },
  { icon: Tablet, name: "Tablet", points: ["Grid dua kolom", "Sidebar ringkas", "Sentuhan minimal 44px"] },
  { icon: Monitor, name: "Desktop", points: ["Sidebar lengkap", "Grid 2–4 kolom", "Ruang data lebih padat"] },
];

const reviews = [
  { name: "Rina", role: "Mahasiswa Informatika", text: "Latihan soal jadi tidak membosankan. Aku jadi ingin menjaga streak tiap hari." },
  { name: "Dedi", role: "Peserta kursus web", text: "Pembahasan di setiap soal sangat membantu. Salah pun jadi paham kenapa salah." },
  { name: "Sinta", role: "Pelajar SMK", text: "Seru bersaing di peringkat kelas. Sekarang belajar terasa seperti main game." },
];

const faqs = [
  { q: "Apakah QuizQuest gratis?", a: "Ya. Semua topik dan fitur dasar dapat dipakai tanpa biaya." },
  { q: "Bagaimana cara XP dihitung?", a: "Setiap jawaban benar memberi 10 XP. Setiap 250 XP kamu naik satu level." },
  { q: "Bagaimana streak bekerja?", a: "Streak bertambah satu setiap hari kamu menyelesaikan minimal satu kuis. Jika bolong sehari, streak kembali ke nol." },
  { q: "Apakah bisa dipakai di HP?", a: "Bisa. Tampilan menyesuaikan layar mobile, tablet, maupun desktop." },
  { q: "Bagaimana mencoba tanpa mendaftar?", a: "Gunakan salah satu akun demo yang tersedia di halaman masuk." },
];

const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
const stats = [
  { value: topics.length, label: "Topik kuis" },
  { value: totalQuestions, label: "Soal latihan" },
  { value: 5, label: "Fitur inti" },
  { value: 3, label: "Jenis perangkat" },
];

const difficultyColor = { Easy: "bg-emerald-100 text-emerald-800", Medium: "bg-amber-100 text-amber-800", Hard: "bg-red-100 text-red-800" };
const cta = "inline-flex min-h-[48px] items-center rounded-2xl px-8 text-lg font-bold";

export default function LandingPage() {
  return (
    <div>
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2">
          <Link href="/" className="flex items-center gap-2 text-xl font-extrabold text-indigo-950">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400"><Zap size={20} aria-hidden /></span>
            QuizQuest
          </Link>
          <nav aria-label="Menu landing" className="hidden gap-1 md:flex">
            {[["Fitur", "#fitur"], ["Cara Kerja", "#cara-kerja"], ["Topik", "#topik"], ["FAQ", "#faq"]].map(([label, href]) => (
              <a key={href} href={href} className="inline-flex min-h-[44px] items-center rounded-xl px-3 font-semibold text-slate-700 hover:bg-slate-100">{label}</a>
            ))}
          </nav>
          <Link href="/login" className="inline-flex min-h-[44px] items-center rounded-xl bg-indigo-600 px-5 font-semibold text-white hover:bg-indigo-700">Masuk</Link>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
          <div>
            <p className="mb-3 inline-block rounded-full bg-indigo-100 px-3 py-1 text-sm font-bold text-indigo-800">Belajar Gamifikasi</p>
            <h1 className="text-4xl font-extrabold md:text-6xl">Belajar jadi <span className="text-indigo-600">permainan</span></h1>
            <p className="mt-4 max-w-lg text-lg text-slate-600">
              Latihan soal singkat yang terasa progresif dan memotivasi. Kumpulkan XP, jaga streak, dan naik level bersama teman sekelas.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/login" className={`${cta} bg-indigo-600 text-white hover:bg-indigo-700`}>Mulai Belajar</Link>
              <a href="#cara-kerja" className={`${cta} border-2 border-indigo-600 text-indigo-700 hover:bg-indigo-50`}>Lihat Cara Kerja</a>
            </div>
          </div>

          <div aria-hidden className="rounded-3xl bg-white p-5 shadow-xl ring-1 ring-slate-200">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-2xl">🧑‍💻</span>
              <div className="flex-1"><p className="font-bold">Kevin</p><p className="text-sm text-slate-600">Level 6</p></div>
              <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-bold text-orange-800">🔥 7 hari</span>
            </div>
            <div className="mt-4">
              <div className="mb-1 flex justify-between text-sm font-semibold"><span>Menuju level 7</span><span className="text-amber-700">1.280 / 1.500 XP</span></div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-200"><div className="h-full w-[85%] rounded-full bg-amber-400" /></div>
            </div>
            <div className="mt-4 rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-600">Soal 2 dari 3 · SQL & JOIN</p>
              <p className="my-2 font-bold">JOIN mana yang hanya mengembalikan baris yang cocok di kedua tabel?</p>
              <div className="space-y-2 text-sm">
                <p className="rounded-xl border-2 border-slate-300 bg-white p-2.5">A. LEFT JOIN</p>
                <p className="rounded-xl border-2 border-emerald-600 bg-emerald-50 p-2.5 font-semibold">B. INNER JOIN ✓</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Angka ===== */}
        <section aria-label="Ringkasan" className="border-y border-slate-200 bg-white">
          <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 py-8 text-center md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse"><dt className="text-sm text-slate-600">{s.label}</dt><dd className="text-3xl font-extrabold text-indigo-700">{s.value}</dd></div>
            ))}
          </dl>
        </section>

        {/* ===== Fitur ===== */}
        <section id="fitur" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-16">
          <h2 className="text-center text-3xl font-bold">Kenapa QuizQuest?</h2>
          <p className="mx-auto mb-8 mt-2 max-w-xl text-center text-slate-600">Semua yang kamu butuhkan agar latihan soal terasa seru dan konsisten.</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700"><Icon size={24} aria-hidden /></span>
                <h3 className="mt-4 text-lg font-bold">{title}</h3>
                <p className="mt-1 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="cara-kerja" className="scroll-mt-16 bg-indigo-950 px-4 py-16 text-white">
          <h2 className="text-center text-3xl font-bold">Cara Kerjanya</h2>
          <p className="mx-auto mb-8 mt-2 max-w-xl text-center text-indigo-200">Enam langkah dari memilih topik sampai naik level.</p>
          <ol className="mx-auto grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s} className="flex items-center gap-4 rounded-2xl bg-white/10 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-400 text-lg font-bold text-indigo-950">{i + 1}</span>
                <span className="text-lg font-semibold">{s}</span>
              </li>
            ))}
          </ol>
        </section>

        <section id="topik" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-16">
          <h2 className="text-center text-3xl font-bold">Topik yang Tersedia</h2>
          <p className="mx-auto mb-8 mt-2 max-w-xl text-center text-slate-600">Pilih sesuai kebutuhanmu, dari tingkat Easy sampai Hard.</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((t) => (
              <div key={t.id} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                <span className="text-4xl" aria-hidden>{t.icon}</span>
                <div>
                  <h3 className="font-bold">{t.title}</h3>
                  <p className="text-sm text-slate-600">{t.category} · {t.questions.length} soal</p>
                  <span className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${difficultyColor[t.difficulty]}`}>{t.difficulty}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white px-4 py-16">
          <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold">Bersaing sehat di peringkat kelas</h2>
              <p className="mt-3 text-slate-600">Setiap kuis yang kamu selesaikan menambah XP dan membawamu naik di papan peringkat. Jaga streak agar terus konsisten.</p>
              <ul className="mt-4 space-y-2 font-semibold">
                <li>⚡ +10 XP untuk setiap jawaban benar</li>
                <li>🏅 Naik level setiap 250 XP</li>
                <li>🔥 Streak bertambah tiap hari belajar</li>
              </ul>
            </div>
            <ol aria-label="Contoh papan peringkat" className="rounded-2xl border border-slate-200 bg-slate-50 p-2">
              {[["🥇", "👩‍🎓", "Yuli", "4.120"], ["🥈", "🧔", "Budi", "3.380"], ["🥉", "👩‍💻", "Citra", "2.910"], ["4", "🧑‍💻", "Kevin", "1.280"]].map(([rank, avatar, name, xp]) => (
                <li key={name} className="flex min-h-[52px] items-center gap-3 px-3"><span className="w-8 text-center">{rank}</span><span aria-hidden>{avatar}</span><span className="flex-1 font-semibold">{name}</span><span>{xp} XP</span></li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-center text-3xl font-bold">Belajar di Perangkat Apa Saja</h2>
          <p className="mx-auto mb-8 mt-2 max-w-xl text-center text-slate-600">Tampilan menyesuaikan ukuran layar, tanpa teks terpotong.</p>
          <div className="grid gap-4 md:grid-cols-3">
            {devices.map(({ icon: Icon, name, points }) => (
              <div key={name} className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
                <Icon size={36} className="mx-auto text-indigo-600" aria-hidden />
                <h3 className="mt-3 text-lg font-bold">{name}</h3>
                <ul className="mt-2 space-y-1 text-slate-600">{points.map((p) => <li key={p}>✓ {p}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>

        {/* ===== Ulasan ===== */}
        <section className="bg-indigo-50 px-4 py-16">
          <h2 className="text-center text-3xl font-bold">Kata Mereka</h2>
          <p className="mb-8 mt-2 text-center text-sm text-slate-600">Contoh ulasan ilustrasi untuk prototipe.</p>
          <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
            {reviews.map((r) => (
              <figure key={r.name} className="rounded-2xl bg-white p-6">
                <blockquote className="text-slate-700">“{r.text}”</blockquote>
                <figcaption className="mt-4 text-sm"><b>{r.name}</b><br /><span className="text-slate-600">{r.role}</span></figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section id="faq" className="mx-auto max-w-3xl scroll-mt-16 px-4 py-16">
          <h2 className="mb-8 text-center text-3xl font-bold">Pertanyaan Umum</h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="rounded-2xl border border-slate-200 bg-white p-4">
                <summary className="min-h-[44px] cursor-pointer content-center font-semibold">{f.q}</summary>
                <p className="mt-2 text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ===== CTA penutup ===== */}
        <section className="bg-indigo-600 px-4 py-16 text-center text-white">
          <h2 className="text-3xl font-extrabold md:text-4xl">Siap naik level hari ini?</h2>
          <p className="mx-auto mt-2 max-w-md text-indigo-100">Mulai satu kuis singkat dan rasakan bedanya belajar sambil bermain.</p>
          <Link href="/login" className={`${cta} mt-6 bg-amber-400 text-indigo-950 hover:bg-amber-300`}>Mulai Sekarang</Link>
        </section>
      </main>

      {/* ===== Footer ===== */}
      <footer className="bg-indigo-950 px-4 py-10 text-indigo-200">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-3">
          <div><p className="text-lg font-extrabold text-white">⚡ QuizQuest</p><p className="mt-1 text-sm">Belajar gamifikasi dengan kuis, XP, dan streak.</p></div>
          <nav aria-label="Tautan footer"><p className="mb-2 font-bold text-white">Jelajah</p>
            <ul className="space-y-1 text-sm">{[["Fitur", "#fitur"], ["Cara Kerja", "#cara-kerja"], ["Topik", "#topik"], ["FAQ", "#faq"]].map(([l, h]) => <li key={h}><a href={h} className="underline">{l}</a></li>)}</ul></nav>
          <div><p className="mb-2 font-bold text-white">Akun</p><Link href="/login" className="text-sm underline">Masuk</Link></div>
        </div>
        <p className="mt-8 text-center text-sm">© 2026 QuizQuest · Dokumen tugas mahasiswa</p>
      </footer>
    </div>
  );
}
