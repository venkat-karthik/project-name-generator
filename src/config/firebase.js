import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCtzvS19slrAH1Ns6x5BL6fLrJ5OuAczKE",
  authDomain: "velfound-d7c7d.firebaseapp.com",
  projectId: "velfound-d7c7d",
  storageBucket: "velfound-d7c7d.firebasestorage.app",
  messagingSenderId: "967891413630",
  appId: "1:967891413630:web:f52192d930f1934aa2462f",
  measurementId: "G-XPCLBL6V7N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
