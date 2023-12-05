import { auth, db } from "../config/firebaseInfo.js";
import { addDoc, collection } from "firebase/firestore";
// This function adds the user to the database
export async function createUserInDatabase() {
  // Get the users collection from the database
  const users = collection(db, "users");
  console.log("users", users);
  // Add the user to the database
  await addDoc(users, {
    id: auth.currentUser.uid,
    email: auth.currentUser.email,
    date: new Date(),
    favorites: [],
  });
}
