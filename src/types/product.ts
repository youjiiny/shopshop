export type AddProductType = {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  size: string;
};

export type GetProductType = {
  id: string;
  name: string;
  image?: string;
  mainImg: string;
  subImg: string[];
  price: number;
  category: string;
  description: string;
  size: string;
  heartCount: number;
  createdAt: Date;
  uploader: string;
  isLiked: boolean;
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

export type RegisteredProduct = Omit<
  GetProductType,
  'id' | 'heartCount' | 'createdAt' | 'uploader'
>;

export type LikedProductType = {
  id: string;
  name: string;
  price: number;
  mainImg: string;
  heartCount: number;
  isLiked: boolean;
};
