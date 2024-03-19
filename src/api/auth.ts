import {
  GithubAuthProvider,
  GoogleAuthProvider,
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth } from '../api/firebase';

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

export const onUserStateChange = (
  callback: (user: FirebaseUser | null) => void,
) => {
  onAuthStateChanged(auth, (user) => {
    const updatedUser = user ? user : null;
    callback(updatedUser);
  });
};

export const logout = async () => {
  return await signOut(auth);
};
