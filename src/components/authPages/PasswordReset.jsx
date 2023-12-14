// Import necessary modules from React and React Router
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Import the resetPassword function from the sendPasswordResetEmail.js file
import { resetPassword } from "../../helpers/sendPasswordResetEmail";

// checks if user is logged in or not
import useCheckUserLogedOut from "../../hooks/useCheckUserLogedOut.jsx";

// Functional component for the password reset screen
export default function PasswordReset() {
  // State variable for email
  const [email, setEmail] = useState("");

  // useNavigate hook for navigating to different routes
  const navigate = useNavigate();

  // Custom hook to check if the user is already logged in
  useCheckUserLogedOut();

  // Function for handling password reset
  async function handleResetPassword() {
    // Call the resetPassword function from the sendPasswordResetEmail.js file
    resetPassword(email);
  }

  return (
    <div style={{ marginTop: "13vh" }}>
      <h1>Reset Password</h1>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button onClick={handleResetPassword}>Reset Password</button>
      <button onClick={() => navigate("/login")}>Log In</button>
      <button onClick={() => navigate("/register")}>Sign Up</button>
    </div>
  );
}
