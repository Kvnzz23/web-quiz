import type { Topic, User } from "@/types";

export const PASSWORD = "quiz1234"; // semua akun demo memakai password ini
export const XP_PER_LEVEL = 250; // setiap 250 XP naik 1 level
export const XP_PER_CORRECT = 10; // setiap jawaban benar +10 XP

export const users: User[] = [
  { name: "Kevin", email: "kevin@quizquest.id", avatar: "🧑‍💻", xp: 1280, streak: 7 },
  { name: "Yuli", email: "yuli@quizquest.id", avatar: "👩‍🎓", xp: 4120, streak: 21 },
  { name: "Budi", email: "budi@quizquest.id", avatar: "🧔", xp: 3380, streak: 12 },
];

// Pemain lain yang hanya muncul di papan peringkat
export const rivals = [
  { name: "Citra", avatar: "👩‍💻", xp: 2910 },
  { name: "Dimas", avatar: "🧑‍🔬", xp: 1710 },
];

export const difficulties = ["Semua", "Easy", "Medium", "Hard"];

export const categories = ["Semua", "Pemrograman", "Basis Data", "Jaringan", "Rekayasa Software"];

export const topics: Topic[] = [
  { id: "js", icon: "🟨", title: "JavaScript Dasar", category: "Pemrograman", difficulty: "Easy",
    desc: "Variabel, fungsi, dan tipe data inti.",
    questions: [
      { q: "Kata kunci mana yang mendeklarasikan variabel yang tidak bisa di-reassign?", options: ["var", "let", "const", "static"], answer: 2, why: "const mencegah reassignment setelah dideklarasikan." },
      { q: "Hasil dari typeof null di JavaScript adalah?", options: ["'null'", "'object'", "'undefined'", "'number'"], answer: 1, why: "Bug historis JavaScript: typeof null mengembalikan 'object'." },
      { q: "Method array mana yang mengembalikan array baru hasil transformasi?", options: ["forEach", "map", "push", "splice"], answer: 1, why: "map mengembalikan array baru tanpa mengubah array asal." },
    ] },
  { id: "ts", icon: "🔷", title: "TypeScript Lanjutan", category: "Pemrograman", difficulty: "Hard",
    desc: "Generics, utility types, dan type narrowing.",
    questions: [
      { q: "Utility type mana yang membuat semua properti menjadi opsional?", options: ["Required<T>", "Partial<T>", "Readonly<T>", "Pick<T>"], answer: 1, why: "Partial<T> menjadikan seluruh properti T bersifat opsional." },
      { q: "Tipe 'unknown' berbeda dari 'any' karena?", options: ["Lebih lambat", "Harus dicek dulu sebelum dipakai", "Hanya untuk angka", "Tidak bisa di-assign"], answer: 1, why: "unknown memaksa pengecekan tipe sebelum nilainya dipakai." },
      { q: "Sintaks <T> pada fungsi menandakan?", options: ["Komentar", "Generic", "Decorator", "Namespace"], answer: 1, why: "<T> adalah parameter tipe (generic)." },
    ] },
  { id: "sql", icon: "🗄️", title: "SQL & JOIN", category: "Basis Data", difficulty: "Medium",
    desc: "Query dasar, JOIN, dan agregasi data.",
    questions: [
      { q: "JOIN mana yang hanya mengembalikan baris yang cocok di kedua tabel?", options: ["LEFT JOIN", "INNER JOIN", "FULL JOIN", "CROSS JOIN"], answer: 1, why: "INNER JOIN hanya mengambil baris yang cocok di kedua tabel." },
      { q: "Perintah untuk mengelompokkan hasil query adalah?", options: ["ORDER BY", "WHERE", "GROUP BY", "LIMIT"], answer: 2, why: "GROUP BY mengelompokkan baris, biasanya bersama fungsi agregat." },
      { q: "Fungsi agregat untuk menghitung jumlah baris adalah?", options: ["SUM()", "COUNT()", "AVG()", "MAX()"], answer: 1, why: "COUNT() menghitung jumlah baris." },
    ] },
  { id: "norm", icon: "📐", title: "Normalisasi Database", category: "Basis Data", difficulty: "Medium",
    desc: "1NF sampai 3NF dengan contoh kasus.",
    questions: [
      { q: "Bentuk normal pertama (1NF) mensyaratkan?", options: ["Tidak ada dependensi transitif", "Nilai atomik di setiap kolom", "Semua tabel punya foreign key", "Tidak ada primary key"], answer: 1, why: "1NF mengharuskan setiap kolom berisi nilai atomik." },
      { q: "3NF menghilangkan dependensi apa?", options: ["Parsial", "Transitif", "Fungsional", "Multivalue"], answer: 1, why: "3NF menghilangkan dependensi transitif." },
      { q: "Tujuan utama normalisasi adalah?", options: ["Mempercantik tabel", "Mengurangi redundansi data", "Mempercepat internet", "Menambah kolom"], answer: 1, why: "Normalisasi mengurangi redundansi dan anomali data." },
    ] },
  { id: "tcp", icon: "🌐", title: "Model TCP/IP", category: "Jaringan", difficulty: "Easy",
    desc: "Lapisan jaringan, protokol, dan pengalamatan.",
    questions: [
      { q: "Protokol mana yang bekerja di lapisan transport?", options: ["HTTP", "IP", "TCP", "Ethernet"], answer: 2, why: "TCP dan UDP berada di lapisan transport." },
      { q: "Port default HTTPS adalah?", options: ["80", "21", "443", "8080"], answer: 2, why: "HTTPS memakai port 443 secara default." },
      { q: "Fungsi utama DNS adalah?", options: ["Enkripsi data", "Menerjemahkan nama domain ke IP", "Membagi bandwidth", "Memblokir iklan"], answer: 1, why: "DNS memetakan nama domain menjadi alamat IP." },
    ] },
  { id: "agile", icon: "🔁", title: "Agile & Scrum", category: "Rekayasa Software", difficulty: "Easy",
    desc: "Peran, event, dan artefak dalam Scrum.",
    questions: [
      { q: "Siapa yang bertanggung jawab atas Product Backlog?", options: ["Scrum Master", "Developer", "Product Owner", "Stakeholder"], answer: 2, why: "Product Owner mengelola dan memprioritaskan Product Backlog." },
      { q: "Durasi maksimal Sprint dalam Scrum adalah?", options: ["1 minggu", "2 minggu", "1 bulan", "3 bulan"], answer: 2, why: "Sprint berdurasi maksimal satu bulan." },
      { q: "Event refleksi proses tim di akhir Sprint adalah?", options: ["Daily Scrum", "Sprint Review", "Retrospective", "Planning"], answer: 2, why: "Retrospective membahas perbaikan proses tim." },
    ] },
];
