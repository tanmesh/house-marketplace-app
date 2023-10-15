import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCas0YwDKVpYtklqGZeSGFT-2EdGeIXiW4",
  authDomain: "house-marketplace-app-87e44.firebaseapp.com",
  projectId: "house-marketplace-app-87e44",
  storageBucket: "house-marketplace-app-87e44.appspot.com",
  messagingSenderId: "305395309423",
  appId: "1:305395309423:web:94cfe30f45a965a6db269a",
  measurementId: "G-K2GWE6FS4R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore() 