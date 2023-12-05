// Importing the 'auth' object from the specified Firebase configuration file
import { auth } from "../../src/config/firebaseInfo";

// Function to check if the current user is verified
export function checkUserVerified() {
  // Get the current user from the Firebase authentication object
  const user = auth?.currentUser;

  // Check if the user exists and their email is verified
  // If the user is not verified, return false
  if (!user?.emailVerified) {
    return false;
  }

  // If the user is verified, return true
  return true;
}
