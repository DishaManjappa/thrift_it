"use client";

import { useEffect, useState } from "react";
import { Order, readJson, storageKeys } from "@/lib/storage";
import { AuthGuard } from "@/components/auth-guard";

const mockOrders: Order[] = [
  { id: "ORD-1042", item: "Cropped Vintage Denim Jacket", total: "$42", status: "processing" },
  { id: "ORD-1031", item: "Cherry Silk Scarf", total: "$18", status: "shipped" },
  { id: "ORD-0988", item: "Hand-Knit Moss Cardigan", total: "$49", status: "delivered" }
];

const badge = {
  paid: "bg-berry/15 text-berry",
  processing: "bg-clay/15 text-clay",
  shipped: "bg-denim/15 text-denim",
  delivered: "bg-moss/15 text-moss"
};

export default function OrdersPage() {
  const [paidOrders, setPaidOrders] = useState<Order[]>([]);

  useEffect(() => {
    setPaidOrders(readJson<Order[]>(storageKeys.orders, []));
  }, []);

  const orders = [...paidOrders, ...mockOrders];

  return (
    <AuthGuard>
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="font-black uppercase text-berry">Protected</p>
      <h1 className="mt-2 text-5xl font-black tracking-tight">Orders</h1>
      <section className="mt-8 overflow-hidden rounded-xl bg-white shadow-soft">
        {orders.map((order) => (
          <div key={order.id} className="grid gap-3 border-b border-ink/10 p-5 last:border-b-0 sm:grid-cols-[8rem_1fr_6rem_8rem] sm:items-center">
            <p className="font-black">{order.id}</p>
            <p className="font-semibold">{order.item}</p>
            <p className="font-black">{order.total}</p>
            <span className={`w-fit rounded-full px-3 py-1 text-xs font-black uppercase ${badge[order.status]}`}>{order.status}</span>
          </div>
        ))}
      </section>
      </main>
    </AuthGuard>
  );
}
