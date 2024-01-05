// Import necessary modules from React and React Router
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Import necessary modules from Firebase
import { auth } from "../../config/firebaseInfo.js";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";

// Import validation helper function
import { validation } from "../../helpers/validation.js";

import { palette } from "../../data/colorPalette.js";
import { useSelector } from "react-redux";

// Import GoogleAuth component for Google Sign-In
import GoogleAuth from "./GoogleAuth.jsx";

// Checks if user is logged in or not
import useCheckUserLogedOut from "../../hooks/useCheckUserLogedOut.jsx";

import registerImg from "../../assets/register.svg";
import eyeImg from "../../assets/eye2.png";
import hideImg from "../../assets/hide2.png";
import emailImg from "../../assets/email2.png";
import key from "../../assets/key2.png";

// Functional component for user registration screen
// The navigation prop is passed from the App component, and we use it to navigate to other screens
export default function Register() {
  // State variables for email, password, and password confirmation
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [firebaseAuthError, setFirebaseAuthError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [infoMess, setInfoMess] = useState(null);
  // Redux state hook for theme
  const { value: theme } = useSelector((state) => state.theme);

  // useNavigate hook for navigating to different routes
  const navigate = useNavigate();

  // Custom hook to check if the user is already logged in
  useCheckUserLogedOut();

  // Function for handling user registration
  async function handleRegister(e) {
    e.preventDefault();
    if (password === passwordConfirm) {
      // If password and password confirmation match, create a new user with email and password
      try {
        // Create a new user with the provided email and password
        await createUserWithEmailAndPassword(auth, email, password);
        // Send email verification to the newly registered user
        await sendEmailVerification(auth.currentUser);

        // Clear email, password, and password confirmation fields
        setEmail("");
        setPassword("");
        setPasswordConfirm("");
        setInfoMess(
          "An email has been sent to your email address. Please verify your email address to continue."
        );
        setFirebaseAuthError(null);
        signOut(auth);
      } catch (error) {
        // Display error message if registration fails
        const errorCode = validation(error);
        setFirebaseAuthError(errorCode);
        console.log(error.code);
      }
    } else {
      // Display error message if password and password confirmation don't match
      const errorCode = validation({ code: "auth/passwords-don't-match" });
      setFirebaseAuthError(errorCode);
    }
  }

  // Toggle function for showing/hiding the password
  function handleShowHidePassword() {
    setShowPassword(!showPassword);
  }

  return (
    <main className="auth-container">
      <div className="auth-img">
        <img src={registerImg} alt="register-img" />
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
          <h1>Welcome!</h1>
          <p>Create an account and get started</p>
        </div>
        <div
          className="auth-error-display"
          style={{ display: firebaseAuthError ? "initial" : "none" }}
        >
          {firebaseAuthError && <p>{firebaseAuthError}</p>}
        </div>
        <div
          className="auth-info-display"
          style={{ display: infoMess ? "initial" : "none" }}
        >
          {infoMess && <p>{infoMess}</p>}
        </div>
        {/* Registration Form */}
        <form
          onSubmit={(e) => handleRegister(e)}
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
          <div className="auth-input-field">
            <label>Confirm Password</label>
            <div className="auth-input">
              <input
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                placeholder="********"
              />
              <div className="auth-icon-container">
                <img className="auth-icons-1" src={key} alt="key" />
              </div>
            </div>
          </div>
          <button className="submit-button" type="submit">
            Register
          </button>
        </form>

        {/* Google Sign-In */}
        <GoogleAuth prop={"Register with Google"} />

        {/* Navigation buttons */}
        <div className="auth-navigate">
          <button onClick={() => navigate("/email-verification")}>
            Resend Email Verification
          </button>
          <button onClick={() => navigate("/login")}>Go to Log In</button>
        </div>
      </section>
    </main>
  );
}
