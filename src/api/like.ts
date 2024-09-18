import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  runTransaction,
  where,
} from 'firebase/firestore';
import { db } from './firebase';

export const getLikedProduct = async (uid: string) => {
  const q = query(collection(db, 'productHeart'), where('uid', '==', uid));
  const querySnapshot = await getDocs(q);
  const likeIds = querySnapshot.docs.map(
    (doc) => doc.data().productId,
  ) as string[];
  return likeIds;
};

export const isLikedProduct = async ({
  uid,
  id,
}: {
  uid: string;
  id: string;
}) => {
  const heartRef = doc(db, 'productHeart', `${uid}-${id}`);
  const heartDoc = await getDoc(heartRef);
  return heartDoc.exists();
};

export const likeProduct = async ({
  uid,
  productId,
}: {
  uid: string;
  productId: string;
}) => {
  const productRef = doc(db, 'products', productId);
  const heartRef = doc(db, 'productHeart', `${uid}-${productId}`);

  await runTransaction(db, async (transaction) => {
    const productDoc = await transaction.get(productRef);
    const heartDoc = await transaction.get(heartRef);
    if (!productDoc.exists()) {
      throw new Error('Product does not exist!');
    }
    if (heartDoc.exists()) {
      throw new Error('Document does not exist!');
    }
    transaction.set(heartRef, { uid, productId });
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
  const heartRef = doc(db, 'productHeart', `${uid}-${productId}`);

  await runTransaction(db, async (transaction) => {
    transaction.delete(heartRef);
    transaction.update(productRef, { heartCount: increment(-1) });
  });
};
