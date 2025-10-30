export type BlogItem = {
  id?: number;
  title: string;
  content: string;
  image: string;
  createdAt?: string;
  author?: {
    name: string;
    image?: string;
  }
};
