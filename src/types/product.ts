export type Product = {
  id?: number;
  name: string;
  category: "OPTIONAL" | "SUGGEST" | "HIGHEND";
  description: string;
  price: number;
  province: string;
  images: string[];
  status?: boolean;
};
