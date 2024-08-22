import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { db } from './firebase';
import type { GetProductType, AddProductType } from 'types/product';

export const addProduct = async (
  product: AddProductType,
  mainImg: string,
  subImg: string[],
) => {
  await setDoc(doc(db, 'products', product.id), {
    ...product,
    price: Number(product.price),
    size: product.size.split(','),
    mainImg,
    subImg,
  });
};

export const getProducts = async () => {
  const querySnapshot = await getDocs(collection(db, 'products'));
  const products = querySnapshot.docs.map((doc) =>
    doc.data(),
  ) as GetProductType[];
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
