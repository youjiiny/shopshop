import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import type { Product } from 'types/product';
import { v4 as uuidv4 } from 'uuid';

export const addProduct = async (product: Product, image: string) => {
  const id = uuidv4();
  await setDoc(doc(db, 'products', id), {
    ...product,
    id,
    price: Number(product.price),
    size: product.size.split(','),
    image,
  });
};
