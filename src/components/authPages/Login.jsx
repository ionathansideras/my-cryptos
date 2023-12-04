// Import necessary modules from React and React Native
import { useState } from "react";
// Import necessary modules from Firebase
import { auth } from "../../config/firebaseInfo.js";
import { validation } from "../../helpers/validation.js";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
// Functional component for user login screen
// the navigation prop is passed from the App component and we use it to navigate to other screens
export default function Login() {
  // State variables for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  // Function for handling user login
  async function handleLogin() {
    try {
      // Sign in user with the provided email and password
      await signInWithEmailAndPassword(auth, email, password);
      console.log(auth?.currentUser);
      const verified = auth?.currentUser?.emailVerified; // Check if email is verified
      if (verified) {
        setEmail("");
        setPassword("");
        navigate("/home"); // Navigate to home screen if email is verified
      } else {
        signOut(auth); // Sign out user if email is not verified
        console.log(validation({ code: "auth/email-not-verified" }));
      }
    } catch (error) {
      // Display error message if login fails
      console.log(validation(error));
    }
  }
  return (
    <div>
      <h1>Log In</h1>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Log In</button>
      <button onClick={() => navigate("/reset-password")}>
        Reset Password
      </button>
    </div>
  );
}
