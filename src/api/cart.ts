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
import { AddCartProductType, CartItemType, ProductSize } from 'types/product';

export const getMyCart = async (userId: string): Promise<CartItemType[]> => {
  const q = query(collection(db, `carts/${userId}/products`));
  const querySnapshot = await getDocs(q);
  const products = querySnapshot.docs.map((doc) =>
    doc.data(),
  ) as CartItemType[];
  return products;
};

export const addCart = async ({
  uid,
  product,
  option,
}: {
  uid: string;
  product: AddCartProductType;
  option: ProductSize;
}) => {
  Object.entries(option).forEach(async ([op, quantity]) => {
    const addProduct = { ...product, size: op, quantity };
    const docRef = doc(collection(db, 'carts', uid, 'products'));
    await setDoc(docRef, addProduct);
  });
};

export const updateCart = async ({
  uid,
  updated,
}: {
  uid: string;
  updated: CartItemType;
}) => {
  const docRef = collection(db, 'carts', uid, 'products');
  const q = query(
    docRef,
    where('id', '==', updated.id),
    where('size', '==', updated.size),
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (docSnap) => {
    const docRef = doc(db, 'carts', uid, 'products', docSnap.id);
    await setDoc(docRef, updated);
  });
};

export const deleteFromCart = async ({
  uid,
  product,
}: {
  uid: string;
  product: CartItemType;
}) => {
  const docRef = collection(db, 'carts', uid, 'products');
  const q = query(
    docRef,
    where('id', '==', product.id),
    where('size', '==', product.size),
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (docSnap) => {
    const docRef = doc(db, 'carts', uid, 'products', docSnap.id);
    await deleteDoc(docRef);
  });
};
