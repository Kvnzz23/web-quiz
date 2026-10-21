export type Difficulty = "Easy" | "Medium" | "Hard";

export interface User {
  name: string;
  email: string;
  avatar: string;
  xp: number; // XP awal akun
  streak: number; // streak awal akun (hari)
}

export interface Question {
  q: string;
  options: string[];
  answer: number; // nomor opsi yang benar (mulai dari 0)
  why: string; // pembahasan
}

export interface Topic {
  id: string;
  icon: string;
  title: string;
  desc: string;
  category: string;
  difficulty: Difficulty;
  questions: Question[];
}

// Satu kali pengerjaan kuis yang tersimpan di riwayat
export interface HistoryItem {
  topicId: string;
  title: string;
  score: number;
  total: number;
  xp: number;
  date: string;
}
