"use client";
import { useParams } from "next/navigation";
import { QuizPlayer } from "@/components/QuizPlayer";
import { EmptyState, Skeleton } from "@/components/ui";
import { topics } from "@/data/quizData";
import { useUser } from "@/lib/useUser";

export default function QuizPage() {
  const { id } = useParams<{ id: string }>();
  const user = useUser();
  const topic = topics.find((t) => t.id === id);

  if (!user) return <div className="mx-auto max-w-2xl space-y-4"><Skeleton className="h-8 w-64" /><Skeleton className="h-64" /></div>; // loading
  if (!topic) return <EmptyState icon="⚠️" title="Kuis tidak bisa dibuka" text="Topik kuis tidak ditemukan." href="/explore" action="Kembali ke Pilih Topik" />; // error
  return <QuizPlayer topic={topic} user={user} />;
}
