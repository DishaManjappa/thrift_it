"use client";

import { Loader2, Trash2 } from "lucide-react";
import { createCheckoutSession } from "@/lib/api";
import { useCart } from "@/components/cart-provider";
import { Button } from "@/components/ui/button";
import { readJson, storageKeys, writeJson } from "@/lib/storage";
import { useEffect, useMemo, useState } from "react";
import { AuthGuard } from "@/components/auth-guard";

export default function CartPage() {
  const { items, removeItem } = useCart();
  const [soldIds, setSoldIds] = useState<string[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const visibleItems = useMemo(() => items.filter((item) => !soldIds.includes(item.id)), [items, soldIds]);
  const subtotal = useMemo(() => visibleItems.reduce((sum, item) => sum + item.price * item.quantity, 0), [visibleItems]);

  useEffect(() => {
    setSoldIds(readJson<string[]>(storageKeys.sold, []));
  }, []);

  const checkout = async () => {
    if (!visibleItems.length || isCheckingOut) return;
    setCheckoutError("");
    setIsCheckingOut(true);

    try {
      const checkoutItems = visibleItems.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity
      }));

      writeJson(storageKeys.pendingCheckout, {
        items: checkoutItems,
        total: subtotal,
        createdAt: new Date().toISOString()
      });
      const session = await createCheckoutSession(checkoutItems.map((item) => ({ title: item.title, price: item.price, quantity: item.quantity })));
      window.location.assign(session.url);
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : "Stripe checkout could not be started.");
      setIsCheckingOut(false);
    }
  };

  return (
    <AuthGuard>
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-black tracking-tight">Your cart</h1>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_22rem]">
        <section className="space-y-4">
          {visibleItems.length === 0 && (
            <div className="rounded-xl bg-white p-8 text-center shadow-soft">
              <p className="text-xl font-black">Your cart is waiting for a find.</p>
              <Button href="/marketplace" className="mt-5">
                Browse marketplace
              </Button>
            </div>
          )}
          {visibleItems.map((item) => (
            <article key={item.id} className="flex gap-4 rounded-xl bg-white p-4 shadow-soft">
              <img src={item.image} alt={item.title} className="h-28 w-24 rounded-xl object-cover" />
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h2 className="font-black">{item.title}</h2>
                  <p className="font-semibold text-ink/55">One-of-one thrift item</p>
                </div>
                <p className="font-black">${item.price * item.quantity}</p>
              </div>
              <button onClick={() => removeItem(item.id)} className="grid h-10 w-10 place-items-center rounded-xl bg-oat text-ink">
                <Trash2 size={17} />
              </button>
            </article>
          ))}
        </section>
        <aside className="h-fit rounded-xl bg-ink p-6 text-linen shadow-soft">
          <p className="text-sm font-black uppercase text-clay">Subtotal</p>
          <p className="mt-2 text-4xl font-black">${subtotal}</p>
          <button disabled={!visibleItems.length || isCheckingOut} onClick={checkout} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-linen px-5 py-4 font-black text-ink transition hover:-translate-y-0.5 disabled:opacity-50">
            {isCheckingOut && <Loader2 className="animate-spin" size={18} />}
            {isCheckingOut ? "Redirecting to Stripe..." : "Checkout with Stripe"}
          </button>
          {checkoutError && <p className="mt-4 rounded-xl bg-berry/20 p-3 text-sm font-bold text-linen">{checkoutError}</p>}
        </aside>
      </div>
      </main>
    </AuthGuard>
  );
}
