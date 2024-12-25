import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyBecIIlEoBukhGG9xereX7JpuR3MD7ugjo",
  authDomain: "login-and-register-56154.firebaseapp.com",
  projectId: "login-and-register-56154",
  storageBucket: "login-and-register-56154.firebasestorage.app",
  messagingSenderId: "851664088040",
  appId: "1:851664088040:web:055e509f61e66031cfd25d",
  measurementId: "G-HS69MXECBZ",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
export default firebaseApp;
export { googleProvider, facebookProvider };
