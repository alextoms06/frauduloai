import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBt3aIk9V5blnTQgGOjDhNyq3Z_ZA48IGI",
  authDomain: "insurance-fraud-detector.firebaseapp.com",
  projectId: "insurance-fraud-detector",
  storageBucket: "insurance-fraud-detector.firebasestorage.app",
  messagingSenderId: "591473048346",
  appId: "1:591473048346:web:5cde55225553875c644aa3"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

