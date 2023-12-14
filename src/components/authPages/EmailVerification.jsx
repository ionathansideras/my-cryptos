// Import necessary modules from React, Firebase, and React Router
import React from "react";
import { useState } from "react";
import { auth } from "../../config/firebaseInfo.js";
import {
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

// Define the EmailVerification component
export default function EmailVerification() {
  // Define state variables for email and password
  // useState hook initializes these variables with an empty string
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useNavigate hook from React Router is used for navigation between routes
  const navigate = useNavigate();

  // Define an asynchronous function to handle email sending
  async function sendEmail(e) {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Use Firebase's signInWithEmailAndPassword function to sign in the user
    // This function takes the auth object, email, and password as arguments
    await signInWithEmailAndPassword(auth, email, password);

    // Check if the user's email is already verified
    if (auth?.currentUser?.emailVerified) {
      // If the email is already verified, show an alert and sign out the user
      alert("Email already verified");
      signOut(auth);
      return;
    }

    // If the email is not verified, send an email verification
    await sendEmailVerification(auth.currentUser);

    // After sending the email verification, clear the email and password fields
    setEmail("");
    setPassword("");

    // Sign out the user
    signOut(auth);
  }

  // Render the component
  return (
    <div style={{ marginTop: "13vh" }}>
      {/* Form for resending email verification */}
      <form onSubmit={(e) => sendEmail(e)}>
        <h1>Resend Email Verification</h1>
        <p>
          Enter your email and password address and we'll send you a link to
          verify your email.
        </p>
        {/* Input field for email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* Input field for password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* Submit button for the form */}
        <button type="submit">Send</button>
      </form>
      {/* Button for navigating back to the login page */}
      <button onClick={() => navigate("/login")}>Back to Log In</button>
    </div>
  );
}
