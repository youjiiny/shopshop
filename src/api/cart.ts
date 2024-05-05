import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { AddCartProductType, ProductSize } from 'types/product';

export const getMyCart = async (userId: string) => {
  const q = query(collection(db, `carts/${userId}/products`));
  const querySnapshot = await getDocs(q);
  const products = querySnapshot.docs.map((doc) => doc.data());
  return products;
};

export const addCart = async (
  userId: string,
  product: AddCartProductType,
  option: ProductSize,
) => {
  Object.entries(option).forEach(async ([op, quantity]) => {
    const addProduct = { ...product, size: op, quantity };
    const docRef = doc(collection(db, 'carts', userId, 'products'));
    await setDoc(docRef, addProduct);
  });
};
