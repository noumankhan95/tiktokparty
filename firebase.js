// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPgxR3soUdfBHHaX05O4rp-RNJplj-jL4",
  authDomain: "tiktoksmapp-3c650.firebaseapp.com",
  projectId: "tiktoksmapp-3c650",
  storageBucket: "tiktoksmapp-3c650.appspot.com",
  messagingSenderId: "455778410284",
  appId: "1:455778410284:web:cc3a599833a993318fd689",
  measurementId: "G-KTWFE1CRPR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);
