"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/storage";
import type { User } from "@/types";

export function useUser() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const current = getCurrentUser();
      if (current) setUser(current);
      else router.replace("/login");
    }, 600);

    return () => clearTimeout(timer);
  }, [router]);

  return user;
}
