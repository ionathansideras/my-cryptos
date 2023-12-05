import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../config/firebaseInfo.js";
import { useNavigate } from "react-router-dom";

// GoogleAuth component receives a prop named "prop"
export default function GoogleAuth({ prop }) {
  // useNavigate hook for navigating to different routes
  const navigate = useNavigate();

  // Async function to handle Google Sign-In
  async function handleLogin() {
    try {
      // Attempt to sign in with Google using Firebase
      await signInWithPopup(auth, googleProvider);
      // If successful, navigate to the "/home" route
      navigate("/home");
    } catch (error) {
      // If an error occurs during sign-in, handle and log the error
      console.log("Sign-in error:", error);
    }
  }

  // Render a button with an onClick event that triggers the handleLogin function
  return <button onClick={handleLogin}>{prop}</button>;
}
