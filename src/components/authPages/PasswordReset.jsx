// Import necessary modules from React and React Router
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Import the resetPassword function from the sendPasswordResetEmail.js file
import { resetPassword } from "../../helpers/sendPasswordResetEmail";

// checks if user is logged in or not
import useCheckUserLogedOut from "../../hooks/useCheckUserLogedOut.jsx";
import { palette } from "../../data/colorPalette.js";

// Import necessary modules from Redux toolkit
import { useSelector } from "react-redux";

import newMess from "../../assets/new-messages.svg";
import emailImg from "../../assets/email2.png";

// Functional component for the password reset screen
export default function PasswordReset() {
  // State variable for email
  const [email, setEmail] = useState("");

  // useNavigate hook for navigating to different routes
  const navigate = useNavigate();

  // Redux state hook for theme
  const { value: theme } = useSelector((state) => state.theme);

  // Custom hook to check if the user is already logged in
  useCheckUserLogedOut();

  // Function for handling password reset
  async function handleResetPassword(e) {
    // Prevent the default behavior of the form submit button
    e.preventDefault();
    // Call the resetPassword function from the sendPasswordResetEmail.js file
    resetPassword(email);
  }

  return (
    <main className="auth-container">
      <div className="auth-img">
        <img
          src={newMess}
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
          <h1>Reset Password</h1>
          <p>
            Please enter your email address to receive a password reset email.
          </p>
        </div>
        <form
          onSubmit={(e) => handleResetPassword(e)}
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
          <button className="submit-button" type="submit">
            Reset Password
          </button>
        </form>
        <div className="auth-navigate">
          <button onClick={() => navigate("/login")}>Go to Log In</button>
          <button onClick={() => navigate("/register")}>Go to Sign Up</button>
        </div>
      </section>
    </main>
  );
}
