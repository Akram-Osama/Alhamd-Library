// src/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDwKtLJzzQNzvfJL16qUjhVUQW11KIl7tA",
    authDomain: "alhamdlib-1088a.firebaseapp.com",
    projectId: "alhamdlib-1088a",
    storageBucket: "alhamdlib-1088a.firebasestorage.app",
    messagingSenderId: "305945483661",
    appId: "1:305945483661:web:c6ea68ca474d8ad0d185c4"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);