import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration provided by user
export const firebaseConfig = {
  apiKey: "AIzaSyCUwGMqFKnM5gzZ_Vv4PWvM4PKJvQPe0Vs",
  authDomain: "roblox-dev-store-56302.firebaseapp.com",
  projectId: "roblox-dev-store-56302",
  storageBucket: "roblox-dev-store-56302.appspot.com",
  messagingSenderId: "563020191603",
  appId: "1:563020191603:android:9ec4d10c3ec4ddbc369706"
};

// Initialize Firebase safely
let app: any = null;
let auth: any = null;
let db: any = null;

try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db = getFirestore(app);
  console.log("🔥 Firebase initialized successfully with project ID:", firebaseConfig.projectId);
} catch (error) {
  console.warn("Firebase initialization warning (using local fallback if offline):", error);
}

export { app, auth, db };
