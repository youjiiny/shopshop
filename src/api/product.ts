import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { db } from './firebase';
import type { GetProductType, AddProductType } from 'types/product';
import { QueryFunction } from '@tanstack/react-query';

export const addProduct = async (
  product: AddProductType,
  mainImg: string,
  subImg: string[],
  uploader: string,
) => {
  await setDoc(doc(db, 'products', product.id), {
    ...product,
    price: Number(product.price),
    size: product.size.split(','),
    mainImg,
    subImg,
    uploader,
    createdAt: new Date(),
  });
};

export const getProducts = async () => {
  const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  const products = querySnapshot.docs.map((doc) =>
    doc.data(),
  ) as GetProductType[];
  return products;
};

export const getUploaderProducts: QueryFunction<
  GetProductType[],
  [string, string, string]
> = async ({ queryKey }) => {
  const [_1, _2, uid] = queryKey;
  const q = query(
    collection(db, 'products'),
    where('uploader', '==', uid),
    orderBy('createdAt', 'desc'),
  );
  const querySnapshot = await getDocs(q);
  const products = querySnapshot.docs.map((doc) =>
    doc.data(),
  ) as GetProductType[];

  if (!products.length) {
    throw new Error('No products found!');
  }
  return products;
};

export const getProudctDetail = async (id: string) => {
  const q = query(collection(db, 'products'), where('id', '==', id));
  const querySnapshot = await getDocs(q);
  const product = querySnapshot.docs.map((doc) =>
    doc.data(),
  )[0] as GetProductType;
  return product;
};

export const deleteProduct = async (id: string) => {
  await deleteDoc(doc(db, 'products', id));
};
