import { auth, db } from "../config/firebaseInfo.js";
import { collection,addDoc,query} from 'firebase/firestore'

export async function addFavorites(symbol) {
  const user = auth.currentUser;
  if (user) {
    const userRef = db.collection("users").doc(user.uid);
    return userRef.update({
      favorites: firebase.firestore.FieldValue.arrayUnion(symbol),
    });
  }
}
