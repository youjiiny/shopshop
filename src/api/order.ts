import { OrderList } from 'types/order';
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from './firebase';
import { CartItemType } from 'types/product';
import { Address, Receiver } from 'types/auth';
import { QueryFunction } from '@tanstack/react-query';

export const saveOrder = async ({
  uid,
  merchant_uid,
  products,
  receiver,
  address,
  price,
}: {
  uid: string;
  merchant_uid: string;
  products: CartItemType[];
  receiver: Receiver;
  address: Address;
  price: number;
}) => {
  const { phone1, phone2 } = receiver;
  const shipping = price >= 70000 ? 0 : 3000;
  const order = {
    orderId: merchant_uid,
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
    status: 'completed',
  };
  const orderRef = doc(collection(db, 'orders', uid, 'list'));
  await setDoc(orderRef, order);
  return order.orderId;
};

export const getOrders: QueryFunction<
  OrderList[],
  [string, string, string]
> = async ({ queryKey }) => {
  const [_, uid] = queryKey;
  const q = query(
    collection(db, `orders/${uid}/list`),
    orderBy('orderDate', 'desc'),
  );
  const orderSnapshot = await getDocs(q);
  const orders = orderSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...doc.data(),
      orderDate: data.orderDate ? data.orderDate.toDate() : new Date(), ///data?.orderDate.toDate(),
    };
  }) as OrderList[];
  if (!orders.length) {
    throw new Error('No orders found!');
  }
  return orders;
};

export const getCancelOrders: QueryFunction<
  OrderList[],
  [string, string, string, string]
> = async ({ queryKey }) => {
  const [_, uid, _2, cancelled] = queryKey;
  const q = query(
    collection(db, `orders/${uid}/list`),
    where('status', '==', cancelled),
    orderBy('orderDate', 'desc'),
  );
  const orderSnapshot = await getDocs(q);
  const orders = orderSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...doc.data(),
      orderDate: data.orderDate ? data.orderDate.toDate() : new Date(),
    };
  }) as OrderList[];
  if (!orders.length) {
    throw new Error('No orders found!');
  }
  return orders;
};

export const getOrderDetail: QueryFunction<
  OrderList,
  [string, string, string, string]
> = async ({ queryKey }) => {
  const [_1, uid, _2, orderId] = queryKey;
  const orderRef = collection(db, 'orders', uid, 'list');
  const q = query(orderRef, where('orderId', '==', orderId));
  const querySnapshot = await getDocs(q);
  const order = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...doc.data(),
      orderDate: data.orderDate ? data.orderDate.toDate() : new Date(), ///data?.orderDate.toDate(),
    };
  }) as OrderList[];

  if (querySnapshot.empty) {
    throw new Error('No matching order!');
  }
  return order[0] as OrderList;
};

export const updateOrder = async ({
  uid,
  orderId,
}: {
  uid: string;
  orderId: string;
}) => {
  const orderRef = collection(db, 'orders', uid, 'list');
  const q = query(orderRef, where('orderId', '==', orderId));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const docRef = querySnapshot.docs[0].ref;
    await updateDoc(docRef, { status: 'cancelled' });
  }
};
