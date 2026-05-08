export type Product = {
  id: string;
  title: string;
  price: number;
  condition: string;
  tags: string[];
  image: string;
  height?: "short" | "medium" | "tall";
  source?: "demo" | "upload";
};

export type AiResult = {
  imageUrl: string;
  category: string;
  color: string;
  condition: string;
  defects: string[];
  title: string;
  description: string;
  tags: string[];
  suggestedPrice: string;
};
