import {
  GoogleAuthProvider,
  User,
  //GithubAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth } from '../api/firebase';

const provider = new GoogleAuthProvider();
//const githubProvider = new GithubAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

export const socialLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const user = result.user;
    console.log('user', user);
    return user;
  } catch (error) {
    console.error(error);
  }
};

export const socialLogout = async () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};
