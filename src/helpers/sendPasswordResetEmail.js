import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config/firebaseInfo";
// Function for sending password reset email
export async function resetPassword(email) {
  try {
    // Call the sendPasswordResetEmail function from the Firebase API
    // This function sends a password reset email to the provided email address
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent");
  } catch (error) {
    // Display error message if password reset fails
    console.log(error);
  }
}
