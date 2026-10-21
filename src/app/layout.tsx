import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QuizQuest",
  description: "Belajar lewat kuis, kumpulkan XP, naik level!",
};

// Layout paling luar: dipakai oleh semua halaman.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
