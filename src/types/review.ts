export type Review = {
  id?: Number;
  comment?: string;
  user: {
    id?: Number;
    name: string;
    image?: string;
  };
}