import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig: Record<string, string> = {
  apiKey: "AIzaSyDqPq4kziATc_S3QifwfA-r719EAcQVhQc",
  authDomain: "hyrule-82a5f.firebaseapp.com",
  projectId: "hyrule-82a5f",
  storageBucket: "hyrule-82a5f.appspot.com",
  messagingSenderId: "615354775886",
  appId: "1:615354775886:web:c7ad816b425797d9a0c61f",
  measurementId: "G-98HG9HJJFB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);