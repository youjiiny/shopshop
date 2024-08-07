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
  heartCount: number;
};

export type ProductSize = {
  [key: string]: number;
};

export type ProductCountContextType = {
  size: string[];
  selected: ProductSize | null;
  price: number;
  setPrice: (price: number) => void;
  deleteSize: (size: string) => void;
  selectProduct: (option: string) => void;
  addCount: (size: string) => void;
  minusCount: (size: string) => void;
};

export type AddCartProductType = {
  id: string;
  name: string;
  image: string;
  price: number;
};

export type CartItemType = {
  id: string;
  name: string;
  image: string;
  price: number;
  size: string;
  quantity: number;
};
