import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  onSnapshot
} from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyCUwGMqFKnM5gzZ_Vv4PWvM4PKJvQPe0Vs",
  authDomain: "gen-lang-client-0560640026.firebaseapp.com",
  projectId: "gen-lang-client-0560640026",
  storageBucket: "gen-lang-client-0560640026.appspot.com",
  messagingSenderId: "563020191603",
  appId: "1:563020191603:android:9ec4d10c3ec4ddbc369706"
};

// Initialize Firebase
let app: any = null;
let auth: any = null;
let db: any = null;

try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db = getFirestore(app);
  console.log("🔥 Firebase & Firestore initialized successfully on project:", firebaseConfig.projectId);
} catch (error) {
  console.error("Firebase init error:", error);
}

export { app, auth, db };

// Cloud Firestore Sync Helpers
export async function saveArticleToCloud(article: any) {
  if (!db) return;
  try {
    await setDoc(doc(db, 'articles', article.id), {
      ...article,
      syncedAt: new Date().toISOString()
    }, { merge: true });
    console.log("☁️ Article synced to Firebase Firestore:", article.title);
  } catch (err) {
    console.warn("Could not sync article to Firestore:", err);
  }
}

export async function deleteArticleFromCloud(articleId: string) {
  if (!db) return;
  try {
    await deleteDoc(doc(db, 'articles', articleId));
    console.log("☁️ Article deleted from Firebase Firestore:", articleId);
  } catch (err) {
    console.warn("Could not delete article from Firestore:", err);
  }
}

export async function saveProductToCloud(product: any) {
  if (!db) return;
  try {
    await setDoc(doc(db, 'products', product.id), {
      ...product,
      syncedAt: new Date().toISOString()
    }, { merge: true });
    console.log("☁️ Product/Game synced to Firebase Firestore:", product.title);
  } catch (err) {
    console.warn("Could not sync product to Firestore:", err);
  }
}

export async function deleteProductFromCloud(productId: string) {
  if (!db) return;
  try {
    await deleteDoc(doc(db, 'products', productId));
    console.log("☁️ Product/Game deleted from Firebase Firestore:", productId);
  } catch (err) {
    console.warn("Could not delete product from Firestore:", err);
  }
}

export async function saveUserToCloud(user: any, source: 'website' | 'mobile_app' = 'website') {
  if (!db) return;
  try {
    await setDoc(doc(db, 'users', user.id), {
      ...user,
      registrationSource: user.registrationSource || source,
      syncedAt: new Date().toISOString()
    }, { merge: true });
    console.log("☁️ User synced to Firebase Firestore:", user.email, "Source:", source);
  } catch (err) {
    console.warn("Could not sync user to Firestore:", err);
  }
}

export async function deleteUserFromCloud(userId: string) {
  if (!db) return;
  try {
    await deleteDoc(doc(db, 'users', userId));
    console.log("☁️ User deleted from Firebase Firestore:", userId);
  } catch (err) {
    console.warn("Could not delete user from Firestore:", err);
  }
}

export async function saveApiKeyToCloud(keyItem: any) {
  if (!db) return;
  try {
    await setDoc(doc(db, 'api_keys', keyItem.id), {
      ...keyItem,
      syncedAt: new Date().toISOString()
    }, { merge: true });
    console.log("☁️ API Key synced to Firebase Firestore:", keyItem.name);
  } catch (err) {
    console.warn("Could not sync API key to Firestore:", err);
  }
}

export async function deleteApiKeyFromCloud(keyId: string) {
  if (!db) return;
  try {
    await deleteDoc(doc(db, 'api_keys', keyId));
    console.log("☁️ API Key deleted from Firebase Firestore:", keyId);
  } catch (err) {
    console.warn("Could not delete API key from Firestore:", err);
  }
}

export async function loadCloudApiKeys(): Promise<any[]> {
  if (!db) return [];
  try {
    const snap = await getDocs(collection(db, 'api_keys'));
    return snap.docs.map(d => ({ ...d.data(), id: d.id }));
  } catch (err) {
    console.warn("Could not load API keys from Firestore:", err);
    return [];
  }
}

export async function loadCloudArticles(): Promise<any[]> {
  if (!db) return [];
  try {
    const snap = await getDocs(collection(db, 'articles'));
    return snap.docs.map(d => ({ ...d.data(), id: d.id }));
  } catch (err) {
    console.warn("Could not load articles from Firestore:", err);
    return [];
  }
}

export async function loadCloudProducts(): Promise<any[]> {
  if (!db) return [];
  try {
    const snap = await getDocs(collection(db, 'products'));
    return snap.docs.map(d => ({ ...d.data(), id: d.id }));
  } catch (err) {
    console.warn("Could not load products from Firestore:", err);
    return [];
  }
}

export async function loadCloudUsers(): Promise<any[]> {
  if (!db) return [];
  try {
    const snap = await getDocs(collection(db, 'users'));
    return snap.docs.map(d => ({ ...d.data(), id: d.id }));
  } catch (err) {
    console.warn("Could not load users from Firestore:", err);
    return [];
  }
}
