import { auth, db } from "../config/firebaseInfo.js";
import { collection, query, getDocs, where } from "firebase/firestore";

export async function getFavorites() {
  // hook to get favorites from firestore database
  // Get the users collection from the database
  const user = auth?.currentUser;
  const users = collection(db, "users");
  if (!user) return; // If user is not logged in, do nothing
  const search = query(users, where("id", "==", user.uid));
  const data = await getDocs(search);
  // Map the retrieved data and check if the user has a profile set in the database
  const filteredData = data.docs.map((i) => ({ ...i.data(), id: i.id }));
  return filteredData[0].favorites;
}
