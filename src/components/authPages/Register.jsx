// Import necessary modules from React and React Router
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Import necessary modules from Firebase
import { auth } from "../../config/firebaseInfo.js";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

import { createUserInDatabase } from "../../helpers/createUserInDatabase.js";

// Import validation helper function
import { validation } from "../../helpers/validation.js";

// Import GoogleAuth component for Google Sign-In
import GoogleAuth from "./GoogleAuth.jsx";

// checks if user is logged in or not
import useCheckUserLogedOut from "../../hooks/checkUserLogedOut.js";

// Functional component for user registration screen
// The navigation prop is passed from the App component, and we use it to navigate to other screens
export default function Register() {
  // State variables for email, password, and password confirmation
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // useNavigate hook for navigating to different routes
  const navigate = useNavigate();

  useCheckUserLogedOut();

  // Function for handling user registration
  async function handleRegister() {
    if (password === passwordConfirm) {
      // If password and password confirmation match, create a new user with email and password
      try {
        // Create a new user with the provided email and password
        await createUserWithEmailAndPassword(auth, email, password);

        // Send email verification to the newly registered user
        await sendEmailVerification(auth.currentUser);

        // Create a new user in the database
        createUserInDatabase();

        // Clear email, password, and password confirmation fields
        setEmail("");
        setPassword("");
        setPasswordConfirm("");
      } catch (error) {
        // Display error message if registration fails
        console.log(validation(error));
      }
    } else {
      // Display error message if password and password confirmation don't match
      console.log(validation({ code: "auth/passwords-don't-match" }));
    }
  }

  return (
    <div>
      <h1>Register</h1>
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
      <div>
        <label>Confirm Password</label>
        <input
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
      </div>
      <button onClick={handleRegister}>Register</button>
      <button onClick={() => navigate("/login")}>Log In</button>
      {/* Render GoogleAuth component with a prop for the Google Sign-In button label */}
      <GoogleAuth prop={"Register with Google"} />
    </div>
  );
}
