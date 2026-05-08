"use client";

import { Product } from "@/lib/types";
import { readJson, storageKeys, writeJson } from "@/lib/storage";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = Product & { quantity: number };

type CartContextValue = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(readJson<CartItem[]>(storageKeys.cart, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    writeJson(storageKeys.cart, items);
  }, [hydrated, items]);

  const addItem = (product: Product) => {
    setItems((current) => {
      const found = current.find((item) => item.id === product.id);
      if (found) {
        return current.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...current, { ...product, quantity: 1 }];
    });
  };

  const removeItem = (id: string) => setItems((current) => current.filter((item) => item.id !== id));
  const clearCart = () => {
    writeJson(storageKeys.cart, []);
    setItems([]);
  };

  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);

  return <CartContext.Provider value={{ items, addItem, removeItem, clearCart, subtotal }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
