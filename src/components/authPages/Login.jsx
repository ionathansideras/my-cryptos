// Import necessary modules from React and React Router
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Import necessary modules from Firebase
import { auth } from "../../config/firebaseInfo.js";
import { validation } from "../../helpers/validation.js";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

// Import GoogleAuth component for Google Sign-In
import GoogleAuth from "./GoogleAuth.jsx";

// checks if user is logged in or not
import useCheckUserLogedOut from "../../hooks/checkUserLogedOut.js";

// Functional component for user login screen
// The navigation prop is passed from the App component, and we use it to navigate to other screens
export default function Login() {
  // State variables for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useNavigate hook for navigating to different routes
  const navigate = useNavigate();

  useCheckUserLogedOut();

  // Function for handling user login
  async function handleLogin() {
    try {
      // Sign in user with the provided email and password
      await signInWithEmailAndPassword(auth, email, password);

      // Check if the email is verified
      const verified = auth?.currentUser?.emailVerified;

      if (verified) {
        // Clear email and password fields
        setEmail("");
        setPassword("");
        // Navigate to the home screen if email is verified
        navigate("/home");
      } else {
        // Sign out user if email is not verified
        signOut(auth);
        // Log a message indicating that the email is not verified
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
      <button onClick={() => navigate("/register")}>Sign Up</button>
      {/* Render GoogleAuth component with a prop for the Google Sign-In button label */}
      <GoogleAuth prop={"LogIn with Google"} />
    </div>
  );
}
