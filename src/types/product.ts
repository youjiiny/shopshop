export type AddProductType = {
  name: string;
  price: number;
  category: string;
  description: string;
  size: string;
};

export type GetProductType = {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  description: string;
  size: string[];
};
