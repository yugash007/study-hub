import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyDWW8Z5CPHERF3QkjFEwBzciBeFbGQfxf4",
  authDomain: "ai-hub-53e08.firebaseapp.com",
  projectId: "ai-hub-53e08",
  storageBucket: "ai-hub-53e08.firebasestorage.app",
  messagingSenderId: "598091610119",
  appId: "1:598091610119:web:d5e6c2cc24930a643a52a2",
  measurementId: "G-4K211SZ863",
}

// Initialize Firebase (singleton pattern)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

// Initialize services
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

// Initialize analytics only on client side
export const getAnalyticsInstance = () => {
  if (typeof window !== "undefined") {
    return getAnalytics(app)
  }
  return null
}

export default app
