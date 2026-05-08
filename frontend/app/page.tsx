"use client";

import { motion } from "framer-motion";
import { ArrowRight, Camera, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { demoItems } from "@/lib/demo-data";

export default function HomePage() {
  return (
    <main>
      <section className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-berry shadow-sm">
            <Sparkles size={16} />
            AI resale listings in under a minute
          </div>
          <div className="space-y-5">
            <h1 className="max-w-4xl text-6xl font-black leading-[0.9] tracking-tight text-ink sm:text-7xl lg:text-8xl">ThriftIt AI</h1>
            <p className="max-w-2xl text-xl font-semibold leading-8 text-ink/70">
              Upload a clothing photo and let AI detect the item, write a scroll-stopping listing, and suggest a resale price for your next closet drop.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/upload">
              <Camera size={18} />
              Upload Item
            </Button>
            <Button href="/marketplace" variant="secondary">
              Explore Marketplace
              <ArrowRight size={18} />
            </Button>
          </div>
          {/*<div className="grid max-w-xl grid-cols-3 gap-3">
            {["Vision Agent", "Listing Agent", "Pricing Agent"].map((label) => (
              <div key={label} className="rounded-xl border border-ink/10 bg-white/70 p-4 shadow-sm">
                <p className="text-xs font-bold uppercase text-ink/45">{label}</p>
                <p className="mt-2 text-2xl font-black text-ink">Ready</p>
              </div>
            ))}
          </div> */}
          
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1 }} className="grid grid-cols-2 gap-4">
          {demoItems.slice(0, 4).map((item, index) => (
            <div key={item.id} className={index % 2 ? "mt-12" : ""}>
              <ProductCard product={item} />
            </div>
          ))}
        </motion.div>
      </section>

      <section className="bg-ink py-16 text-linen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="font-black uppercase text-clay">Trending now</p>
              <h2 className="mt-2 text-4xl font-black tracking-tight">Fresh thrift finds</h2>
            </div>
            <Button href="/marketplace" variant="secondary" className="hidden sm:inline-flex">
              Shop all
            </Button>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {demoItems.slice(0, 3).map((item) => (
              <div key={item.id} className="rounded-xl bg-linen p-3 text-ink">
                <img src={item.image} alt={item.title} className="h-72 w-full rounded-xl object-cover" />
                <div className="p-3">
                  <p className="text-lg font-black">{item.title}</p>
                  <p className="mt-1 font-bold text-berry">${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
