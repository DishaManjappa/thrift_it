import { Product } from "@/lib/types";

export const demoItems: Product[] = [
  {
    id: "vintage-denim-jacket",
    title: "Cropped Vintage Leather Jacket",
    price: 42,
    condition: "Excellent",
    tags: ["leather", "90s", "oversized"],
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80",
    height: "tall"
  },
  {
    id: "silk-scarf",
    title: "Scarf",
    price: 18,
    condition: "Good",
    tags: ["silk", "coquette", "red"],
    image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=900&q=80",
    height: "short"
  },
  {
    id: "leather-bag",
    title: "Mini Leather Shoulder Bag",
    price: 58,
    condition: "Excellent",
    tags: ["leather", "shoulder bag", "minimal"],
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=80",
    height: "medium"
  },
  {
    id: "floral-dress",
    title: "Floaty Midi Dress",
    price: 36,
    condition: "Good",
    tags: ["midi dress", "cottage", "spring"],
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=80",
    height: "tall"
  },
  {
    id: "knit-cardigan",
    title: "White Sweatshirt",
    price: 49,
    condition: "Excellent",
    tags: ["white", "soft", "earthy"],
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=900&q=80",
    height: "medium"
  },
  {
    id: "cargo-skirt",
    title: "Black T shirt",
    price: 31,
    condition: "Fair",
    tags: ["black", "t shirt", "streetwear"],
    image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80",
    height: "medium"
  }
];

export const aiFallback = {
  category: "Vintage jacket",
  color: "Faded blue denim",
  condition: "Good",
  defects: ["Light wear near cuffs", "Tiny fade mark on left pocket"],
  title: "Faded Blue Vintage Denim Jacket",
  description:
    "A soft, broken-in denim jacket with a relaxed thrift-store silhouette. Easy to layer with slip dresses, cargos, or a white tee.",
  tags: ["denim", "vintage", "casual", "90s", "layering"],
  suggestedPrice: "$42"
};
