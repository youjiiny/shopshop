import {
  GithubAuthProvider,
  GoogleAuthProvider,
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from 'firebase/auth';
import { auth, db } from '../api/firebase';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    return user;
  } catch (error) {
    console.error(error);
  }
};

export const signInWithGithub = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    const user = result.user;
    return user;
  } catch (error) {
    console.error(error);
  }
};

export const signUpWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  try {
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
  } catch (error) {
    console.error(error);
  }
};

export const loginWithEmailWithPassword = async (
  email: string,
  password: string,
) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    console.error(error);
  }
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
