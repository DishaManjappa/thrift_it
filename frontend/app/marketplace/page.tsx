"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ProductCard } from "@/components/product-card";
import { SkeletonCard } from "@/components/skeleton-card";
import { demoItems } from "@/lib/demo-data";
import { readJson, readUploadedListings, storageKeys } from "@/lib/storage";
import { Product } from "@/lib/types";

const filters = ["all", "leather", "shoulder bag", "midi dress", "white", "black", "t shirt"];

export default function MarketplacePage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [uploadedItems, setUploadedItems] = useState<Product[]>([]);
  const [soldIds, setSoldIds] = useState<string[]>([]);

  useEffect(() => {
    setUploadedItems(readUploadedListings());
    setSoldIds(readJson<string[]>(storageKeys.sold, []));
  }, []);

  const items = useMemo(() => {
    return [...uploadedItems, ...demoItems].filter((item) => {
      if (soldIds.includes(item.id)) return false;
      const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase()) || item.tags.some((tag) => tag.includes(query.toLowerCase()));
      const matchesFilter = filter === "all" || item.tags.includes(filter);
      return matchesQuery && matchesFilter;
    });
  }, [query, filter, uploadedItems, soldIds]);

  const chooseFilter = (value: string) => {
    setLoading(true);
    setFilter(value);
    window.setTimeout(() => setLoading(false), 350);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="font-black uppercase text-berry">Public marketplace</p>
          <h1 className="mt-2 text-5xl font-black tracking-tight">Browse the drop</h1>
          {uploadedItems.length > 0 && <p className="mt-3 font-semibold text-ink/60">Your uploaded listings are live at the top.</p>}
        </div>
        <div className="relative w-full lg:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search denim, y2k, floral..."
            className="w-full rounded-xl border border-ink/10 bg-white py-4 pl-12 pr-4 font-semibold outline-none transition focus:border-berry"
          />
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((chip) => (
          <button
            key={chip}
            onClick={() => chooseFilter(chip)}
            className={`rounded-full px-4 py-2 text-sm font-black transition ${filter === chip ? "bg-ink text-linen" : "bg-white text-ink hover:bg-oat"}`}
          >
            {chip}
          </button>
        ))}
      </div>

      <div className="masonry">
        <AnimatePresence mode="popLayout">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
            : items.map((item) => (
                <motion.div key={item.id} layout>
                  <ProductCard product={item} />
                </motion.div>
              ))}
        </AnimatePresence>
      </div>
    </main>
  );
}
