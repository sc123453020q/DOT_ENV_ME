// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your Firebase config from Firebase console → Project settings
const firebaseConfig = {
  apiKey: "AIzaSyB79Ub1sGCq1Iyh_5OfHlWgE2X9zkIAPYk",
  authDomain: "make-a-thon-513a4.firebaseapp.com",
  projectId: "make-a-thon-513a4",
  storageBucket: "make-a-thon-513a4.firebasestorage.app",
  messagingSenderId: "432263324138",
  appId: "1:432263324138:web:7bd00cbb9c85fdbbf4d293",
  measurementId: "G-XDTF5SRKGX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
