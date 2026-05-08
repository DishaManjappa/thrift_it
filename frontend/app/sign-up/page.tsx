"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { createAccount } from "@/lib/storage";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = createAccount(email, password);
    setMessage(result.message);
    if (result.ok) {
      window.location.href = "/marketplace";
    }
  };

  return (
    <main className="grid min-h-[calc(100vh-73px)] place-items-center px-4 py-10">
      <form onSubmit={submit} className="w-full max-w-md rounded-xl bg-white p-8 shadow-soft">
        <p className="font-black uppercase text-berry">Create account</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight">Start selling</h1>

        <label className="mt-8 block text-sm font-black">Email</label>
        <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required className="mt-2 w-full rounded-xl border border-ink/10 bg-oat px-4 py-3 font-semibold outline-none focus:border-berry" />

        <label className="mt-5 block text-sm font-black">Password</label>
        <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required className="mt-2 w-full rounded-xl border border-ink/10 bg-oat px-4 py-3 font-semibold outline-none focus:border-berry" />
        <p className="mt-2 text-xs font-semibold text-ink/50">Use 8+ characters with uppercase, lowercase, and a number.</p>

        {message && <p className="mt-5 rounded-xl bg-berry/10 p-3 text-sm font-black text-berry">{message}</p>}

        <button className="mt-6 w-full rounded-xl bg-ink px-5 py-4 font-black text-linen">Create account</button>
        <Link href="/sign-in" className="mt-4 block text-center text-sm font-black text-berry">
          Log in instead
        </Link>
      </form>
    </main>
  );
}
