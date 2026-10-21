import { PASSWORD, XP_PER_LEVEL, users } from "@/data/quizData";
import type { HistoryItem, User } from "@/types";

const LOGIN_KEY = "qq:login";
const historyKey = (u: User) => `qq:history:${u.email}`;
const streakKey = (u: User) => `qq:streak:${u.email}`;

export function getCurrentUser(): User | null {
  const email = localStorage.getItem(LOGIN_KEY);
  return users.find((u) => u.email === email) ?? null;
}

export function login(email: string, password: string): User | null {
  const user = users.find((u) => u.email === email.trim().toLowerCase());
  if (!user || password !== PASSWORD) return null;
  localStorage.setItem(LOGIN_KEY, user.email);
  return user;
}

export function logout() {
  localStorage.removeItem(LOGIN_KEY);
}

interface StreakData { count: number; last: string } // last = tanggal terakhir belajar (YYYY-MM-DD)

const dayKey = (d: Date) => d.toLocaleDateString("sv-SE"); // format YYYY-MM-DD (waktu lokal)
const TODAY = () => dayKey(new Date());
const YESTERDAY = () => dayKey(new Date(Date.now() - 86_400_000));

function readStreak(user: User): StreakData {
  const raw = localStorage.getItem(streakKey(user));
  // Akun demo dianggap terakhir belajar kemarin, supaya streak awalnya tetap berlaku.
  return raw ? JSON.parse(raw) : { count: user.streak, last: YESTERDAY() };
}

export function getStreak(user: User): number {
  const { count, last } = readStreak(user);
  return last === TODAY() || last === YESTERDAY() ? count : 0;
}

function recordPractice(user: User) {
  const { count, last } = readStreak(user);
  if (last === TODAY()) return; // hari ini sudah dihitung
  const next = last === YESTERDAY() ? count + 1 : 1;
  localStorage.setItem(streakKey(user), JSON.stringify({ count: next, last: TODAY() }));
}

export function getHistory(user: User): HistoryItem[] {
  return JSON.parse(localStorage.getItem(historyKey(user)) ?? "[]");
}

export function addHistory(user: User, item: HistoryItem) {
  localStorage.setItem(historyKey(user), JSON.stringify([item, ...getHistory(user)]));
  recordPractice(user);
}

export function clearHistory(user: User) {
  localStorage.removeItem(historyKey(user));
}

export function getStats(user: User) {
  const history = getHistory(user);
  const xp = user.xp + history.reduce((sum, h) => sum + h.xp, 0);
  const accuracy = history.length
    ? Math.round(history.reduce((sum, h) => sum + (h.score / h.total) * 100, 0) / history.length)
    : null; // null = belum pernah kuis
  return { xp, level: Math.floor(xp / XP_PER_LEVEL) + 1, xpInLevel: xp % XP_PER_LEVEL, accuracy, streak: getStreak(user) };
}
