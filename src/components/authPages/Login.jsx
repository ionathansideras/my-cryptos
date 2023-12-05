// Import necessary modules from React and React Router
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Import necessary modules from Firebase
import { auth } from "../../config/firebaseInfo.js";
import { validation } from "../../helpers/validation.js";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

// Import GoogleAuth component for Google Sign-In
import GoogleAuth from "./GoogleAuth.jsx";
import { checkUserVerified } from "../../helpers/checkUserVerified.js";
// checks if user is logged in or not
import useCheckUserLogedOut from "../../hooks/useCheckUserLogedOut.jsx";

// Functional component for user login screen
// The navigation prop is passed from the App component, and we use it to navigate to other screens
export default function Login() {
  // State variables for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useNavigate hook for navigating to different routes
  const navigate = useNavigate();

  // Custom hook to check if the user is already logged in
  useCheckUserLogedOut();

  // Function for handling user login
  async function handleLogin() {
    try {
      // Sign in user with the provided email and password
      await signInWithEmailAndPassword(auth, email, password);

      // Check if the user's email is verified
      if (checkUserVerified()) {
        // Navigate to the home page if the user is verified
        navigate("/home");
      } else {
        // Display an alert and sign out if the user's email is not verified
        alert("Please verify your email");
        signOut(auth);
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
