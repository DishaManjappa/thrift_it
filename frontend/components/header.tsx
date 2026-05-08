"use client";

import { ShoppingBag, Sparkles } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import { currentUserEmail, isLoggedIn, logout } from "@/lib/storage";
import { useEffect, useState } from "react";

export function Header() {
  const { items } = useCart();
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const count = items.length;

  useEffect(() => {
    setLoggedIn(isLoggedIn());
    setEmail(currentUserEmail());
  }, []);

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    setEmail("");
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-linen/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-lg font-black tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-berry text-white">
            <Sparkles size={18} />
          </span>
          ThriftIt AI
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-ink/70 md:flex">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <Link href="/marketplace" className="hover:text-ink">
            Marketplace
          </Link>
          <Link href="/upload" className="hover:text-ink">
            Upload
          </Link>
          <Link href="/orders" className="hover:text-ink">
            Orders
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/cart" className="relative grid h-10 w-10 place-items-center rounded-xl bg-white text-ink shadow-sm">
            <ShoppingBag size={18} />
            {count > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-clay px-1 text-xs font-black text-white">{count}</span>}
          </Link>
          {loggedIn ? (
            <>
              <span className="hidden max-w-36 truncate text-xs font-bold text-ink/55 lg:block">{email}</span>
              <Link href="/profile" className="hidden rounded-xl px-4 py-2 text-sm font-bold text-ink hover:bg-ink/5 sm:block">
                Profile
              </Link>
              <button onClick={handleLogout} className="rounded-xl bg-ink px-4 py-2 text-sm font-black text-linen">
                Logout
              </button>
            </>
          ) : (
            <Link href="/sign-in" className="rounded-xl border border-ink/10 bg-white px-4 py-2 text-sm font-black text-ink shadow-sm hover:bg-oat">
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
