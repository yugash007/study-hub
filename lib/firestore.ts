import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  type Timestamp,
  serverTimestamp,
  setDoc,
} from "firebase/firestore"
import { db } from "./firebase"

// Types
export interface StudySession {
  id?: string
  userId: string
  duration: number // in seconds
  completedAt: Timestamp
  type: "focus" | "pomodoro"
  xpEarned: number
}

export interface AIConversation {
  id?: string
  userId: string
  messages: AIMessage[]
  topic: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface AIMessage {
  role: "user" | "assistant"
  content: string
  timestamp: Timestamp
}

export interface UserProfile {
  id?: string
  email: string
  displayName?: string
  totalXP: number
  level: number
  sessionsCompleted: number
  createdAt: Timestamp
  lastActive: Timestamp
}

// Study Sessions
export const saveStudySession = async (session: Omit<StudySession, "id" | "completedAt">) => {
  try {
    const docRef = await addDoc(collection(db, "study_sessions"), {
      ...session,
      completedAt: serverTimestamp(),
    })
    return docRef.id
  } catch (error) {
    console.error("Error saving study session:", error)
    throw error
  }
}

export const getUserStudySessions = async (userId: string, limitCount = 10) => {
  try {
    const q = query(
      collection(db, "study_sessions"),
      where("userId", "==", userId),
      orderBy("completedAt", "desc"),
      limit(limitCount),
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as StudySession)
  } catch (error) {
    console.error("Error getting study sessions:", error)
    throw error
  }
}

// AI Conversations
export const saveAIConversation = async (conversation: Omit<AIConversation, "id" | "createdAt" | "updatedAt">) => {
  try {
    const docRef = await addDoc(collection(db, "ai_conversations"), {
      ...conversation,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
    return docRef.id
  } catch (error) {
    console.error("Error saving AI conversation:", error)
    throw error
  }
}

export const updateAIConversation = async (id: string, messages: AIMessage[]) => {
  try {
    const docRef = doc(db, "ai_conversations", id)
    await updateDoc(docRef, {
      messages,
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error updating AI conversation:", error)
    throw error
  }
}

export const getUserAIConversations = async (userId: string) => {
  try {
    const q = query(
      collection(db, "ai_conversations"),
      where("userId", "==", userId),
      orderBy("updatedAt", "desc"),
      limit(20),
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as AIConversation)
  } catch (error) {
    console.error("Error getting AI conversations:", error)
    throw error
  }
}

// User Profile
export const createUserProfile = async (userId: string, email: string, displayName?: string) => {
  try {
    const docRef = doc(db, "users", userId)
    await setDoc(docRef, {
      email,
      displayName: displayName || "",
      totalXP: 0,
      level: 1,
      sessionsCompleted: 0,
      createdAt: serverTimestamp(),
      lastActive: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error creating user profile:", error)
    throw error
  }
}

export const getUserProfile = async (userId: string) => {
  try {
    const docRef = doc(db, "users", userId)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as UserProfile
    }
    return null
  } catch (error) {
    console.error("Error getting user profile:", error)
    throw error
  }
}

export const updateUserProfile = async (userId: string, updates: Partial<UserProfile>) => {
  try {
    const docRef = doc(db, "users", userId)
    await updateDoc(docRef, {
      ...updates,
      lastActive: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error updating user profile:", error)
    throw error
  }
}

export const addXPToUser = async (userId: string, xp: number) => {
  try {
    const profile = await getUserProfile(userId)
    if (profile) {
      const newXP = profile.totalXP + xp
      const newLevel = Math.floor(newXP / 100) + 1 // Level up every 100 XP
      await updateUserProfile(userId, {
        totalXP: newXP,
        level: newLevel,
      })
    }
  } catch (error) {
    console.error("Error adding XP to user:", error)
    throw error
  }
}
