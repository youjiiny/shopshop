import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  increment,
  runTransaction,
} from 'firebase/firestore';
import { db } from './firebase';

export const getLikedProduct = async (uid: string) => {
  const heartRef = doc(db, 'productHeart', uid);
  const heartDoc = await getDoc(heartRef);

  if (!heartDoc.exists()) {
    return [];
  }
  const data = heartDoc.data();
  return Array.isArray(data.productIds) ? data.productIds : [];
};

export const isLikedProduct = async ({
  uid,
  id,
}: {
  uid: string;
  id: string;
}) => {
  const heartRef = doc(db, 'productHeart', uid);
  const heartDoc = await getDoc(heartRef);

  if (!heartDoc.exists()) {
    return false;
  }
  const data = heartDoc.data();
  if (Array.isArray(data.productIds) && uid) {
    return data.productIds.includes(id);
  }
  return false;
};

export const likeProduct = async ({
  uid,
  productId,
}: {
  uid: string;
  productId: string;
}) => {
  const productRef = doc(db, 'products', productId);
  const heartRef = doc(db, 'productHeart', uid);

  await runTransaction(db, async (transaction) => {
    const productDoc = await transaction.get(productRef);
    const heartDoc = await transaction.get(heartRef);
    if (!productDoc.exists()) {
      throw new Error('Product does not exist!');
    }
    if (!heartDoc.exists()) {
      throw new Error('Document does not exist!');
    }
    transaction.set(
      heartRef,
      { uid, productIds: arrayUnion(productId) },
      { merge: true },
    );
    transaction.update(productRef, { heartCount: increment(1) });
  });
};

export const unlikeProduct = async ({
  uid,
  productId,
}: {
  uid: string;
  productId: string;
}) => {
  const productRef = doc(db, 'products', productId);
  const heartRef = doc(db, 'productHeart', uid);

  await runTransaction(db, async (transaction) => {
    transaction.set(
      heartRef,
      { productIds: arrayRemove(productId) },
      { merge: true },
    ),
      transaction.update(productRef, { heartCount: increment(-1) });
  });
};
