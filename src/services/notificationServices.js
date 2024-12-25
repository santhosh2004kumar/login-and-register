import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase";

// Get User Notifications
export const getUserNotifications = async () => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("No user logged in");

    const notificationsRef = collection(db, "notifications");
    const q = query(
      notificationsRef,
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc"),
      limit(20)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting notifications:", error);
    throw error;
  }
};

// Update Notification Preferences
export const updateNotificationPreferences = async (preferences) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("No user logged in");

    await setDoc(
      doc(db, "userPreferences", user.uid),
      {
        notifications: preferences,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    return { success: true };
  } catch (error) {
    console.error("Error updating notification preferences:", error);
    throw error;
  }
};
