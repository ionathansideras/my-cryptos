import { auth, db } from "../config/firebaseInfo.js";
import { addDoc, collection, query, getDocs, where } from "firebase/firestore";
// This function adds the user to the database
export async function createUserInDatabase() {
  // Get the current user
  const user = auth.currentUser;
  // Get the users collection from the database
  const users = collection(db, "users");
  if (!user) return; // If user is not logged in, do nothing
  const search = query(users, where("id", "==", user.uid));
  const data = await getDocs(search);
  // Map the retrieved data and check if the user has a profile set in the database
  const filteredData = data.docs.map((i) => ({ ...i.data(), id: i.id }));
  if (filteredData.length === 0) {
    // Add the user to the database
    await addDoc(users, {
      id: auth.currentUser.uid,
      email: auth.currentUser.email,
      date: new Date(),
      favorites: [],
    });
  }
}
