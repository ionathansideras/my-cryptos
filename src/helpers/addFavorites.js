import { auth, db } from "../config/firebaseInfo.js";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";

// async function to add a favorite to the database
export async function addFavorites(symbol) {
  // Get the current user
  const user = auth?.currentUser;

  // If user is logged in
  if (user?.uid) {
    // Get the users collection from the database
    const usersCollection = collection(db, "users");
    const q = query(usersCollection, where("id", "==", user?.uid));
    // Get the user document
    const querySnapshot = await getDocs(q);

    // If the user document exists, update the favorites field
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      // Update the favorites field
      await updateDoc(userDoc.ref, {
        favorites: symbol,
      });
    }
  }
}
