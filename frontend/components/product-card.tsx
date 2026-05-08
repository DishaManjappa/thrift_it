"use client";

import { Product } from "@/lib/types";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import { isLoggedIn } from "@/lib/storage";
import { useEffect, useState } from "react";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [signedIn, setSignedIn] = useState(false);
  const height = product.height === "tall" ? "h-[34rem]" : product.height === "short" ? "h-72" : "h-96";

  useEffect(() => {
    setSignedIn(isLoggedIn());
  }, []);

  const button = signedIn ? (
    <button
      onClick={() => addItem(product)}
      className="grid h-11 w-11 place-items-center rounded-xl bg-linen text-ink shadow-lg transition hover:scale-105"
      aria-label={`Add ${product.title} to cart`}
    >
      <ShoppingBag size={18} />
    </button>
  ) : (
    <Link href="/sign-in" className="grid h-11 w-11 place-items-center rounded-xl bg-linen text-ink shadow-lg transition hover:scale-105" aria-label="Login to add item to cart">
      <ShoppingBag size={18} />
    </Link>
  );

  return (
    <motion.article layout whileHover={{ y: -6 }} className="masonry-item mb-5 overflow-hidden rounded-xl bg-white shadow-soft">
      <div className={`relative ${height}`}>
        <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
        <div className="absolute right-3 top-3">{button}</div>
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-black leading-tight">{product.title}</h3>
          <p className="rounded-full bg-oat px-3 py-1 text-sm font-black">${product.price}</p>
        </div>
        <p className="text-sm font-semibold text-moss">{product.condition}</p>
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-ink/5 px-3 py-1 text-xs font-bold text-ink/65">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
