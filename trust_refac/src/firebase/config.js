import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC1EdVf3gcx58g2HVFJ1QvsVe50cmVGcCk",
  authDomain: "trust-8c33d.firebaseapp.com",
  projectId: "trust-8c33d",
  storageBucket: "trust-8c33d.firebasestorage.app",
  messagingSenderId: "607876469365",
  appId: "1:607876469365:web:e4f356b663cf973c05de3c",
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firestore 초기화
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };
