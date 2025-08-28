export interface Pizza {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
}

export type PizzaCartItem = Pick<
  Pizza,
  "id" | "imageUrl" | "title" | "price"
> & {
  count: number;
  // totalPrice: number;
  type: string;
  size: number;
};
