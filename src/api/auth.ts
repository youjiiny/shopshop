import {
  GithubAuthProvider,
  GoogleAuthProvider,
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth, db } from '../api/firebase';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { Address } from 'types/auth';
import { QueryFunction } from '@tanstack/react-query';

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;
  return user;
};

export const signInWithGithub = async () => {
  const result = await signInWithPopup(auth, githubProvider);
  const user = result.user;
  return user;
};

export const signUpWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const user = userCredential.user;
  const adminRef = await addDoc(collection(db, 'admins'), {
    uid: user.uid,
  });
  return user;
};

export const loginWithEmailWithPassword = async (
  email: string,
  password: string,
) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const user = userCredential.user;
  return user;
};

export const onUserStateChange = <T>(callback: (user: T | null) => void) => {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await checkAdminUser(user) : null;
    callback(updatedUser as T);
  });
};

const checkAdminUser = async (user: FirebaseUser) => {
  const adminRef = collection(db, 'admins');
  const q = query(adminRef, where('uid', '==', user.uid));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    return { ...user, isAdmin: true };
  }
  return user;
};

export const logout = async () => {
  return await signOut(auth);
};

export const getShippingAddress: QueryFunction<
  Address,
  [string, string, string]
> = async ({ queryKey }) => {
  const [_, uid] = queryKey;
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    const address = userSnap.data() as Address;
    return address;
  }
  throw new Error('Address not found');
};

export const addShippingAddress = async ({
  uid,
  address,
}: {
  uid: string;
  address: Address;
}) => {
  const userRef = doc(db, 'users', uid);
  await setDoc(userRef, address);
};

export const updateUserName = async (updated: { displayName: string }) => {
  await updateProfile(auth?.currentUser as FirebaseUser, updated);
};
