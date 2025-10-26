export type Product = {
  id?: number;
  name: string;
  category: "OPTIONAL" | "SUGGEST" | "HIGHEND";
  price: number;
  images: string[];
  status?: boolean;
};
