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
import { QueryFunction } from '@tanstack/react-query';
import { Address, Receiver } from 'types/auth';

export const getMyCart: QueryFunction<
  CartItemType[],
  [string, string]
> = async ({ queryKey }) => {
  const [_, userId] = queryKey;
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
  product?: CartItemType;
}) => {
  if (uid && !product) {
    const docRef = collection(db, 'carts', uid, 'products');
    const querySnapshot = await getDocs(docRef);
    querySnapshot.forEach(async (docSnap) => {
      await deleteDoc(docSnap.ref);
    });
    return;
  }
  const docRef = collection(db, 'carts', uid, 'products');
  const q = query(
    docRef,
    where('id', '==', product?.id),
    where('size', '==', product?.size),
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (docSnap) => {
    const docRef = doc(db, 'carts', uid, 'products', docSnap.id);
    await deleteDoc(docRef);
  });
};

const createOrderId = () => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const date = new Date().getDate();
  const time = new Date().getTime();
  return `ORD${year}${month}${date}-${time}`;
};

export const saveOrder = async ({
  uid,
  products,
  receiver,
  address,
  price,
}: {
  uid: string;
  products: CartItemType[];
  receiver: Receiver;
  address: Address;
  price: number;
}) => {
  const { phone1, phone2 } = receiver;
  const shipping = price >= 70000 ? 0 : 3000;
  const order = {
    orderId: createOrderId(),
    orderDate: new Date(),
    products,
    payment: {
      price,
      shipping,
      total: price + shipping,
    },
    buyer: {
      name: receiver.name,
      address,
      phone: `${phone1.part1}-${phone1.part2}-${phone1.part3}`,
      ...(phone2?.part1 &&
        phone2?.part2 &&
        phone2?.part3 && {
          phone2: `${phone2.part1}-${phone2.part2}-${phone2.part3}`,
        }),
    },
  };
  const orderRef = doc(collection(db, 'orders', uid, order.orderId));
  await setDoc(orderRef, order);
  return order.orderId;
};
