# QuizQuest (Next.js + TypeScript)

Aplikasi kuis bergaya game sesuai PRD "IDE 19 – QuizQuest": belajar singkat yang progresif dan memotivasi.

## Menjalankan
```bash
npm install
npm run dev      # buka http://localhost:3000
```
Akun demo (password `quiz1234`): kevin@quizquest.id, alya@quizquest.id, budi@quizquest.id

## Kesesuaian dengan PRD
| Fitur inti (MVP) | Di mana |
|---|---|
| Kuis per topik | `/explore` → `/quiz/[id]`, data di `data/quizData.ts` |
| Level dan XP | `lib/storage.ts` → `getStats` (benar = +10 XP, 250 XP = 1 level) |
| Streak belajar | `lib/storage.ts` → `recordPractice` / `getStreak` (naik jika belajar tiap hari) |
| Pembahasan jawaban | Muncul setelah "Periksa jawaban" dan di layar hasil |
| Papan peringkat kelas | `/leaderboard` |

| Halaman PRD | Rute |
|---|---|
| (Awal) Landing page | `/` |
| (Awal) Login | `/login` |
| Beranda | `/dashboard` |
| Pilih Topik (+ filter & pencarian) | `/explore` |
| Kuis + Hasil | `/quiz/[id]` (hasil tampil di komponen yang sama) |
| Peringkat | `/leaderboard` |
| Profil | `/profile` |
| Riwayat aktivitas (P1) | `/history` |

**Responsif:** mobile = navigasi bawah · tablet = sidebar ikon · desktop = sidebar lengkap.
**State:** loading (`Skeleton`), kosong/error (`EmptyState`), umpan balik berhasil, dan konfirmasi (keluar kuis, reset progres).
**Aksesibilitas:** label permanen pada form, pesan error spesifik, sentuhan min. 44px, `aria-current`, `aria-live`, fokus terlihat.

## Struktur proyek
```
src/
├── types/index.ts            Semua tipe TypeScript
├── data/quizData.ts          Akun, topik, soal, konstanta XP
├── lib/
│   ├── storage.ts            Login, riwayat, XP, level, streak (localStorage)
│   └── useUser.ts            Hook penjaga halaman (wajib login)
├── components/
│   ├── AppNav.tsx            SIDEBAR (desktop/tablet) + navigasi bawah (mobile)
│   ├── TopicCard.tsx         Kartu satu topik
│   ├── QuizPlayer.tsx        Logika kuis + layar hasil
│   └── ui.tsx                Skeleton, EmptyState, StatCard, ProgressBar
└── app/
    ├── page.tsx              "/"  Landing page
    ├── login/page.tsx        "/login"
    └── (app)/                Halaman setelah login (berbagi layout + sidebar)
        ├── layout.tsx
        ├── dashboard/  explore/  quiz/[id]/  leaderboard/  history/  profile/
```

## Alur presentasi yang disarankan
1. Landing → Login (validasi form) → Beranda dengan sidebar.
2. Routing Next.js: satu folder = satu URL, `[id]` = route dinamis, `(app)` = layout bersama.
3. `QuizPlayer`: state `index`, `selected`, `checked`, `score`.
4. `storage.ts`: XP, level, akurasi, dan streak dihitung dari riwayat. Siap diganti API.
