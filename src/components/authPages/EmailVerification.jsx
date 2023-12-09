import React from "react";
import { useState } from "react";
import { auth } from "../../config/firebaseInfo.js";
import {
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function EmailVerification() {
  // State variables for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useNavigate hook for navigating to different routes
  const navigate = useNavigate();

  // Function for handling user registration
  async function sendEmail(e) {
    // Prevent the default behavior of the form submit button
    e.preventDefault();
    // Sign in user with the provided email and password
    await signInWithEmailAndPassword(auth, email, password);

    if (auth?.currentUser?.emailVerified) {
      alert("Email already verified");
      signOut(auth);
      return;
    }
    // Send email verification to the newly registered user
    await sendEmailVerification(auth.currentUser);
    // Clear email, password, and password confirmation fields
    setEmail("");
    setPassword("");
    signOut(auth);
  }

  return (
    <div>
      <form onSubmit={(e) => sendEmail(e)}>
        <h1>Resend Email Verification</h1>
        <p>
          Enter your email and password address and we'll send you a link to
          verify your email.
        </p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <button onClick={() => navigate("/login")}>Back to Log In</button>
    </div>
  );
}
