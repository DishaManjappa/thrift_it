"use client";

import { AuthGuard } from "@/components/auth-guard";
import { currentUserEmail, readUploadedListings } from "@/lib/storage";
import { Product } from "@/lib/types";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [email, setEmail] = useState("");
  const [uploads, setUploads] = useState<Product[]>([]);

  useEffect(() => {
    setEmail(currentUserEmail());
    setUploads(readUploadedListings());
  }, []);

  return (
    <AuthGuard>
      <main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[24rem_1fr] lg:px-8">
        <section className="h-fit rounded-xl bg-white p-6 shadow-soft">
          <p className="font-black uppercase text-berry">Profile</p>
          <h1 className="mt-2 break-words text-2xl font-black tracking-tight">{email}</h1>
          <p className="mt-4 font-semibold leading-7 text-ink/60">Your uploaded thrift listings and paid order history live in this MVP account.</p>
        </section>

        <section>
          <p className="font-black uppercase text-berry">Seller shelf</p>
          <h2 className="mt-2 text-5xl font-black tracking-tight">Uploaded listings</h2>
          {uploads.length === 0 ? (
            <div className="mt-8 rounded-xl bg-white p-8 text-center shadow-soft">
              <p className="text-xl font-black">No uploaded listings yet.</p>
            </div>
          ) : (
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {uploads.map((item) => (
                <article key={item.id} className="rounded-xl bg-white p-4 shadow-soft">
                  <img src={item.image} alt={item.title} className="h-56 w-full rounded-xl object-cover" />
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <p className="font-black">{item.title}</p>
                    <p className="font-black text-berry">${item.price}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </AuthGuard>
  );
}
