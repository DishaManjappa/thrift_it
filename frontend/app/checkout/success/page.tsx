"use client";

import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { Order, readJson, storageKeys, writeJson } from "@/lib/storage";

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    writeJson(storageKeys.cart, []);
    clearCart();

    const pending = readJson<{ items: { id: string; title: string; quantity: number }[]; total: number } | null>(storageKeys.pendingCheckout, null);
    if (!pending || pending.items.length === 0) {
      return;
    }

    const id = `ORD-${Date.now().toString().slice(-6)}`;
    const paidOrder: Order = {
      id,
      item: pending.items.map((item) => `${item.title} x${item.quantity}`).join(", "),
      total: `$${pending.total}`,
      status: "paid"
    };

    const current = readJson<Order[]>(storageKeys.orders, []);
    const soldIds = readJson<string[]>(storageKeys.sold, []);
    const newSoldIds = pending.items.map((item) => item.id);
    writeJson(storageKeys.orders, [paidOrder, ...current]);
    writeJson(storageKeys.sold, Array.from(new Set([...soldIds, ...newSoldIds])));
    window.localStorage.removeItem(storageKeys.pendingCheckout);
    setOrderId(id);
  }, [clearCart]);

  return (
    <main className="grid min-h-[calc(100vh-73px)] place-items-center px-4">
      <section className="max-w-xl rounded-xl bg-white p-8 text-center shadow-soft">
        <CheckCircle2 className="mx-auto text-moss" size={54} />
        <h1 className="mt-5 text-4xl font-black tracking-tight">Payment successful</h1>
        <p className="mt-3 font-semibold leading-7 text-ink/65">
          Your order {orderId ? `${orderId} ` : ""}is saved in Orders with a paid status.
        </p>
        <button onClick={() => (window.location.href = "/orders")} className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-bold text-linen shadow-soft transition hover:-translate-y-0.5">
          View orders
        </button>
      </section>
    </main>
  );
}
