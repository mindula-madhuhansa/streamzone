import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAdFneGyq0jd4S4VcmcAZXJ3s_nkvWv84U",
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "streamzone-5724e.firebaseapp.com",
  projectId: "streamzone-5724e",
  storageBucket: "streamzone-5724e.appspot.com",
  messagingSenderId: "767723381688",
  appId: "1:767723381688:web:b530082102acade74f254d",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
