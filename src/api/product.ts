import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from './firebase';
import type {
  GetProductType,
  AddProductType,
  RegisteredProduct,
  LikedProductType,
} from 'types/product';
import { QueryFunction } from '@tanstack/react-query';
import { getLikedProduct, isLikedProduct } from './like';

export const addProduct = async ({
  product,
  mainImg,
  subImg,
  uploader,
}: {
  product: AddProductType;
  mainImg: string;
  subImg: string[];
  uploader: string;
}) => {
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

export const getProducts = async (uid?: string) => {
  const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  const products = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const data = doc.data();
      const isLiked = uid ? await isLikedProduct({ uid, id: data.id }) : false;
      return {
        ...data,
        size: data.size.join(',') as string,
        isLiked,
      } as GetProductType;
    }),
  );
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
  const products = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return { ...data, size: data.size.join(',') as string } as GetProductType;
  });

  if (!products.length) {
    throw new Error('No products found!');
  }
  return products;
};

export const getProudctDetail = async (id: string, uid?: string) => {
  //const [_, id] = queryKey;
  const q = query(collection(db, 'products'), where('id', '==', id));
  const querySnapshot = await getDocs(q);
  const product = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return { ...data, size: data.size.join(',') as string } as GetProductType;
  })[0];
  const isLiked = uid ? await isLikedProduct({ uid, id }) : false;
  return { ...product, isLiked };
};

export const deleteProduct = async (id: string) => {
  await deleteDoc(doc(db, 'products', id));
};

export const updateProduct = async ({
  id,
  updated,
}: {
  id: string;
  updated: RegisteredProduct;
}) => {
  const docRef = doc(db, 'products', id);
  const product = { ...updated, size: updated.size.split(',') };
  await updateDoc(docRef, product);
};

export const getLikedProducts: QueryFunction<
  LikedProductType[],
  [string, string, string]
> = async ({ queryKey }) => {
  const [_1, uid] = queryKey;
  const likedIds = await getLikedProduct(uid);
  const q = query(collection(db, 'products'), where('id', 'in', likedIds));
  const querySnapshot = await getDocs(q);
  const products = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: data.id,
      name: data.name,
      price: data.price,
      mainImg: data.mainImg,
      heartCount: data.heartCount,
      isLiked: true,
    };
  });
  return products;
};
