import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const APIKEY = import.meta.env.VITE_FIREBASE_APIKEY;
const AUTHDOMAIN = import.meta.env.VITE_FIREBASE_AUTHDOMAIN;
const PROJECTID = import.meta.env.VITE_FIREBASE_PROJECTID;
const STORAGEBUCKET = import.meta.env.VITE_FIREBASE_STORAGEBUCKET;
const MESSAGINGSENDERID = import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID;
const APPID = import.meta.env.VITE_FIREBASE_APPID;

const firebaseConfig = {
  apiKey: APIKEY,
  authDomain: AUTHDOMAIN,
  projectId: PROJECTID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: MESSAGINGSENDERID,
  appId: APPID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
