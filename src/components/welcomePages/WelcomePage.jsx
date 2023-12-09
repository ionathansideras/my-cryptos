import React from "react";
import { useNavigate } from "react-router-dom";
// checks if user is logged in or not

export default function WelcomePage() {
  const navigate = useNavigate();
  return (
    <main className="welcome-page-all">
      <h1>Welcome to the app!</h1>
      <p>Log in or sign up to get started.</p>
      <button onClick={() => navigate("/login")}>Log In</button>
      <button onClick={() => navigate("/register")}>Sign Up</button>
    </main>
  );
}
