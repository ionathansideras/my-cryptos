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
import { validation } from "../../helpers/validation.js";

import emailImg from "../../assets/email2.png";
import { palette } from "../../data/colorPalette.js";
import verifyImg from "../../assets/verify2.svg";
// Import necessary modules from Redux toolkit
import { useSelector } from "react-redux";

import eyeImg from "../../assets/eye2.png";
import hideImg from "../../assets/hide2.png";
// Define the EmailVerification component
export default function EmailVerification() {
  // Define state variables for email and password
  // useState hook initializes these variables with an empty string
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firebaseAuthError, setFirebaseAuthError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Redux state hook for theme
  const { value: theme } = useSelector((state) => state.theme);

  // useNavigate hook from React Router is used for navigation between routes
  const navigate = useNavigate();

  // Define an asynchronous function to handle email sending
  async function sendEmail(e) {
    // Prevent the default form submission behavior
    e.preventDefault();
    try {
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
    } catch (error) {
      // Display error message if login fails
      const errorCode = validation(error);
      setFirebaseAuthError(errorCode);
    }
  }
  // Toggle function for showing/hiding the password
  function handleShowHidePassword() {
    setShowPassword(!showPassword);
  }

  // Render the component
  return (
    <main className="auth-container">
      <div className="auth-img">
        <img
          src={verifyImg}
          alt="login-img"
          style={{ width: "80%", height: "80%" }}
        />
      </div>
      <section
        className="auth-content"
        style={{
          backgroundColor: theme === "dark" ? palette.color2 : palette.color5,
        }}
      >
        {/* Welcoming title */}
        <div
          className="auth-welcoming-title"
          style={{
            color: theme === "dark" ? palette.color4 : "black",
          }}
        >
          <h1>Resend Verification Email</h1>
          <p>
            Please enter your email address to receive a verification email.
          </p>
        </div>
        <div
          className="auth-error-display"
          style={{ display: firebaseAuthError ? "initial" : "none" }}
        >
          {firebaseAuthError && <p>{firebaseAuthError}</p>}
        </div>
        {/* Form for resending email verification */}
        <form
          onSubmit={(e) => sendEmail(e)}
          style={{
            color: theme === "dark" ? palette.color4 : "black",
          }}
        >
          <div className="auth-input-field">
            <label>Email</label>
            <div className="auth-input">
              {/* Input field for email */}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="auth-icon-container">
                <img className="auth-icons-1" src={emailImg} alt="email" />
              </div>
            </div>
          </div>
          <div className="auth-input-field">
            <label>Password</label>
            <div className="auth-input">
              {/* Input field for password */}
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="auth-icon-container">
                <img
                  onClick={handleShowHidePassword}
                  className="auth-icons-2"
                  src={showPassword ? hideImg : eyeImg}
                  alt="eye"
                />
              </div>
            </div>
          </div>
          {/* Submit button for the form */}
          <button className="submit-button" type="submit">
            Send
          </button>
        </form>
        {/* Navigation buttons */}
        <div className="auth-navigate">
          {/* Button for navigating back to the login page */}
          <button onClick={() => navigate("/login")}>Go to Log In</button>
          <button onClick={() => navigate("/register")}>Go to Register</button>
        </div>
      </section>
    </main>
  );
}
