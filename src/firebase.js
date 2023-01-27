import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "lets-chit-chat-app.firebaseapp.com",
  projectId: "lets-chit-chat-app",
  storageBucket: "lets-chit-chat-app.appspot.com",
  messagingSenderId: "15379238605",
  appId: "1:15379238605:web:f2aa956d176045fe2a2384"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const analytics = getAnalytics(app);
export const storage = getStorage();
export const db = getFirestore();



