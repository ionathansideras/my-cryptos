// Import necessary modules from React and Firebase
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebaseInfo";

// Custom hook for checking user authentication status
export default function useCheckUserLogedOut() {
  // useNavigate hook for navigating to different routes
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.currentUser) {
      // If user is logged in, navigate to the home page
      navigate("/home");
    }
  }, []); // The empty dependency array ensures that this effect runs only once after the initial render
}
