import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { db } from './firebase';
import type { GetProductType, AddProductType } from 'types/product';
import { v4 as uuidv4 } from 'uuid';

export const addProduct = async (product: AddProductType, image: string) => {
  const id = uuidv4();
  await setDoc(doc(db, 'products', id), {
    ...product,
    id,
    price: Number(product.price),
    size: product.size.split(','),
    image,
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
