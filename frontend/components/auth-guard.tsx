"use client";

import { requireLogin } from "@/lib/storage";
import { useEffect, useState } from "react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    setAllowed(requireLogin());
  }, []);

  if (!allowed) {
    return (
      <main className="grid min-h-[calc(100vh-73px)] place-items-center px-4">
        <p className="rounded-xl bg-white p-6 text-center font-black shadow-soft">Please log in to continue.</p>
      </main>
    );
  }

  return <>{children}</>;
}
