"use client";

import { useEffect, useState } from "react";
import { Tag } from "lucide-react";
import { AiResult } from "@/lib/types";
import { aiFallback } from "@/lib/demo-data";
import { Button } from "@/components/ui/button";
import { saveUploadedListing } from "@/lib/storage";

export default function ResultsPage() {
  const [result, setResult] = useState<AiResult | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("thriftit-ai-result");
    setResult(saved ? JSON.parse(saved) : { imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80", ...aiFallback });
  }, []);

  const publishListing = () => {
    const saved = sessionStorage.getItem("thriftit-pending-listing");
    if (saved) {
      saveUploadedListing(JSON.parse(saved));
      sessionStorage.removeItem("thriftit-pending-listing");
    }
    window.location.href = "/marketplace";
  };

  if (!result) return null;

  return (
    <main className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.8fr_1fr] lg:px-8">
      <img src={result.imageUrl} alt={result.title} className="h-[42rem] w-full rounded-xl object-cover shadow-soft" />
      <section className="rounded-xl bg-white p-6 shadow-soft sm:p-8">
        <p className="font-black uppercase text-berry">AI listing result</p>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <h1 className="text-4xl font-black tracking-tight">{result.title}</h1>
          <p className="rounded-xl bg-ink px-5 py-3 text-2xl font-black text-linen">{result.suggestedPrice}</p>
        </div>
        <p className="mt-5 text-lg font-semibold leading-8 text-ink/70">{result.description}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            ["Category", result.category],
            ["Color", result.color],
            ["Condition", result.condition],
            ["Defects", result.defects.join(", ")]
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl bg-oat p-4">
              <p className="text-xs font-black uppercase text-ink/45">{label}</p>
              <p className="mt-2 font-black">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <p className="mb-3 flex items-center gap-2 font-black">
            <Tag size={18} />
            Tags
          </p>
          <div className="flex flex-wrap gap-2">
            {result.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-berry/10 px-4 py-2 text-sm font-black text-berry">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/upload">Upload another</Button>
          <button onClick={publishListing} className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-bold text-linen shadow-soft transition hover:-translate-y-0.5">
            Upload
          </button>
          <Button href="/marketplace" variant="secondary">
            Go to marketplace
          </Button>
        </div>
      </section>
    </main>
  );
}
