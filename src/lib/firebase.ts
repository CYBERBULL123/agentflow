
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDWZ3-AUkz_MVxsDiXNcjRgjtkfhjgD5OU",
  authDomain: "studio-2034732213-733ff.firebaseapp.com",
  projectId: "studio-2034732213-733ff",
  storageBucket: "studio-2034732213-733ff.appspot.com",
  messagingSenderId: "420563574886",
  appId: "1:420563574886:web:98dad525e19102f8d38da7"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
