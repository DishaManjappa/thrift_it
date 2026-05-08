import { AiResult } from "@/lib/types";
import { aiFallback } from "@/lib/demo-data";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function analyzeUpload(file: File): Promise<AiResult> {
  const imageUrl = URL.createObjectURL(file);
  const formData = new FormData();
  formData.append("file", file);

  try {
    const vision = await fetch(`${API_URL}/analyze-image`, { method: "POST", body: formData }).then((res) => res.json());
    const listing = await fetch(`${API_URL}/generate-listing`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vision_output: vision.raw || vision.summary })
    }).then((res) => res.json());
    const pricing = await fetch(`${API_URL}/suggest-price`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ condition: vision.condition || vision.raw || "good" })
    }).then((res) => res.json());

    return {
      imageUrl,
      category: vision.category || aiFallback.category,
      color: vision.color || aiFallback.color,
      condition: vision.condition || aiFallback.condition,
      defects: vision.defects || aiFallback.defects,
      title: listing.title || aiFallback.title,
      description: listing.description || aiFallback.description,
      tags: listing.tags || aiFallback.tags,
      suggestedPrice: pricing.price || aiFallback.suggestedPrice
    };
  } catch {
    return { imageUrl, ...aiFallback };
  }
}

export async function createCheckoutSession(items: { title: string; price: number; quantity: number }[]) {
  const res = await fetch(`${API_URL}/create-checkout-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items })
  });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.detail || data.error || "Stripe checkout could not be started.");
  }

  if (!data.url) {
    throw new Error("Stripe did not return a checkout URL.");
  }

  return data;
}
