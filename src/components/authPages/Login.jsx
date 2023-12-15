// Import necessary modules from React and React Router
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Import necessary modules from Firebase
import { auth } from "../../config/firebaseInfo.js";
import { validation } from "../../helpers/validation.js";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createUserInDatabase } from "../../helpers/createUserInDatabase.js";

// Import GoogleAuth component for Google Sign-In
import GoogleAuth from "./GoogleAuth.jsx";

// Checks if user is logged in or not
import useCheckUserLogedOut from "../../hooks/useCheckUserLogedOut.jsx";
import { palette } from "../../data/colorPalette.js";

// Import necessary modules from Redux toolkit
import { useSelector } from "react-redux";

import loginImg from "../../assets/robot-checking-user-profile.svg";
import emailImg from "../../assets/email2.png";
import eyeImg from "../../assets/eye2.png";
import hideImg from "../../assets/hide2.png";

// Functional component for user login screen
// The navigation prop is passed from the App component, and we use it to navigate to other screens
export default function Login() {
  // State variables for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Redux state hook for theme
  const { value: theme } = useSelector((state) => state.theme);

  // useNavigate hook for navigating to different routes
  const navigate = useNavigate();

  // Custom hook to check if the user is already logged in
  useCheckUserLogedOut();

  // Function for handling user login
  async function handleLogin(e) {
    // Prevent the default behavior of the form submit button
    e.preventDefault();
    try {
      // Sign in user with the provided email and password
      await signInWithEmailAndPassword(auth, email, password);

      // Check if the user's email is verified
      if (auth?.currentUser?.emailVerified) {
        // Navigate to the home page if the user is verified
        createUserInDatabase();
        navigate("/home");
        setEmail(""); // Clear email field
        setPassword(""); // Clear password field
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

  // Toggle function for showing/hiding the password
  function handleShowHidePassword() {
    setShowPassword(!showPassword);
  }

  return (
    <main className="auth-container">
      <div className="auth-img">
        <img src={loginImg} alt="login-img" />
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
          <h1>Hello Again!</h1>
          <p>Log in to your account to continue</p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={(e) => handleLogin(e)}
          style={{
            color: theme === "dark" ? palette.color4 : "black",
          }}
        >
          <div className="auth-input-field">
            <label>Email</label>
            <div className="auth-input">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Example@gmail.com"
              />
              <div className="auth-icon-container">
                <img className="auth-icons-1" src={emailImg} alt="email" />
              </div>
            </div>
          </div>
          <div className="auth-input-field">
            <label>Password</label>
            <div className="auth-input">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
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
          <button className="submit-button" type="submit">
            Log In
          </button>
        </form>

        {/* Google Sign-In */}
        <GoogleAuth prop={"Log in with Google"} />

        {/* Navigation buttons */}
        <div className="auth-navigate">
          <button onClick={() => navigate("/reset-password")}>
            Forgot Password?
          </button>
          <button onClick={() => navigate("/register")}>Go to Register</button>
        </div>
      </section>
    </main>
  );
}
