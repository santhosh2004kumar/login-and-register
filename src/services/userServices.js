// import { updateProfile, updateEmail, updatePassword } from "firebase/auth";
// import {
//   doc,
//   setDoc,
//   getDoc,
//   collection,
//   query,
//   where,
//   orderBy,
//   limit,
//   getDocs,
// } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { auth, db, storage } from "./firebase";

// // Profile Update Function
// export const updateUserProfile = async (userData) => {
//   try {
//     const user = auth.currentUser;
//     if (!user) throw new Error("No user logged in");

//     // Update auth profile
//     await updateProfile(user, {
//       displayName: userData.name,
//       photoURL: userData.photoURL,
//     });

//     // Update additional data in Firestore
//     await setDoc(
//       doc(db, "users", user.uid),
//       {
//         name: userData.name,
//         phoneNumber: userData.phoneNumber,
//         location: userData.location,
//         timezone: userData.timezone,
//         language: userData.language,
//         updatedAt: new Date().toISOString(),
//       },
//       { merge: true }
//     );

//     return { success: true };
//   } catch (error) {
//     console.error("Error updating profile:", error);
//     throw error;
//   }
// };

// // Profile Picture Upload
// export const uploadProfilePicture = async (file) => {
//   try {
//     const user = auth.currentUser;
//     if (!user) throw new Error("No user logged in");

//     const storageRef = ref(storage, `profile-pictures/${user.uid}`);
//     await uploadBytes(storageRef, file);
//     const photoURL = await getDownloadURL(storageRef);

//     await updateProfile(user, { photoURL });
//     return { photoURL };
//   } catch (error) {
//     console.error("Error uploading profile picture:", error);
//     throw error;
//   }
// };

// // Get User Data
// export const getUserData = async () => {
//   try {
//     const user = auth.currentUser;
//     if (!user) throw new Error("No user logged in");

//     const userDoc = await getDoc(doc(db, "users", user.uid));
//     return userDoc.data();
//   } catch (error) {
//     console.error("Error getting user data:", error);
//     throw error;
//   }
// };
// userServices.js
// import { auth, db, storage } from "./firebase";
// import {
//   doc,
//   getDoc,
//   setDoc,
//   updateDoc,
//   serverTimestamp,
// } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { updateProfile } from "firebase/auth";

// export const getUserData = async () => {
//   try {
//     const user = auth.currentUser;

//     // Add a small delay to ensure auth state is ready
//     if (!user) {
//       await new Promise((resolve) => setTimeout(resolve, 500));
//     }

//     // Check again after delay
//     const currentUser = auth.currentUser;
//     if (!currentUser) {
//       throw new Error("No user logged in");
//     }

//     const userDoc = await getDoc(doc(db, "users", currentUser.uid));

//     if (!userDoc.exists()) {
//       // Create initial user document if it doesn't exist
//       const userData = {
//         uid: currentUser.uid,
//         email: currentUser.email,
//         name: currentUser.displayName || "Not provided",
//         phoneNumber: currentUser.phoneNumber || "Not provided",
//         profilePicture: currentUser.photoURL || "/default-avatar.png", // Use a default image path
//         location: "Not provided",
//         timezone: "EST",
//         language: "English",
//         subscription: "Free",
//         createdAt: serverTimestamp(),
//         lastLogin: serverTimestamp(),
//         notifications: [],
//       };

//       await setDoc(doc(db, "users", currentUser.uid), userData);
//       return userData;
//     }

//     return {
//       ...userDoc.data(),
//       profilePicture: userDoc.data().profilePicture || "/default-avatar.png", // Ensure profile picture always has a value
//     };
//   } catch (error) {
//     console.error("Error getting user data:", error);
//     throw error;
//   }
// };

// export const updateUserProfile = async (userData) => {
//   try {
//     const user = auth.currentUser;
//     if (!user) throw new Error("No user logged in");

//     // Update auth profile
//     await updateProfile(user, {
//       displayName: userData.name,
//     });

//     // Update Firestore document
//     await updateDoc(doc(db, "users", user.uid), {
//       ...userData,
//       updatedAt: serverTimestamp(),
//     });

//     return { success: true };
//   } catch (error) {
//     console.error("Error updating user profile:", error);
//     throw error;
//   }
// };

// export const uploadProfilePicture = async (file) => {
//   try {
//     const user = auth.currentUser;
//     if (!user) throw new Error("No user logged in");

//     const storageRef = ref(storage, `profilePictures/${user.uid}`);
//     await uploadBytes(storageRef, file);
//     const photoURL = await getDownloadURL(storageRef);

//     // Update auth profile
//     await updateProfile(user, { photoURL });

//     // Update Firestore document
//     await updateDoc(doc(db, "users", user.uid), {
//       profilePicture: photoURL,
//       updatedAt: serverTimestamp(),
//     });

//     return { photoURL };
//   } catch (error) {
//     console.error("Error uploading profile picture:", error);
//     throw error;
//   }
// };
import { auth, db, storage } from "./firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
export const updateUserProfile = async (userData) => {
  // Your update logic here
  // Example:
  try {
    const response = await fetch("/api/users/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return await response.json();
  } catch (error) {
    throw new error();
  }
};

export const getUserData = async () => {
  // Wait a bit to ensure auth is ready
  await new Promise((resolve) => setTimeout(resolve, 100));

  const user = auth.currentUser;
  if (!user) {
    throw new Error("No user logged in");
  }

  try {
    const userDoc = await getDoc(doc(db, "users", user.uid));

    if (!userDoc.exists()) {
      // Create initial user document
      const userData = {
        uid: user.uid,
        email: user.email,
        name: user.displayName || "Not provided",
        phoneNumber: user.phoneNumber || "Not provided",
        profilePicture: user.photoURL || "/default-avatar.png",
        location: "Not provided",
        timezone: "EST",
        language: "English",
        subscription: "Free",
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        notifications: [],
      };

      await setDoc(doc(db, "users", user.uid), userData);
      return userData;
    }

    return {
      ...userDoc.data(),
      profilePicture: userDoc.data().profilePicture || "/default-avatar.png",
    };
  } catch (error) {
    console.error("Error in getUserData:", error);
    throw error;
  }
};
