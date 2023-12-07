import { auth, db } from "../config/firebaseInfo.js";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";

export async function addFavorites(symbol) {
  const user = auth?.currentUser;
  const usersCollection = collection(db, "users");
  const q = query(usersCollection, where("id", "==", user?.uid));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0];
    await updateDoc(userDoc.ref, {
      favorites: symbol,
    });
  } else {
    throw new Error("No matching user document found");
  }
}
