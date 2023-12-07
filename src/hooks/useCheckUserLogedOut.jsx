// Import necessary modules from React and Firebase
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebaseInfo";
import { onAuthStateChanged } from "firebase/auth";
// Custom hook for checking user authentication status
export default function useCheckUserLogedOut() {
  // useNavigate hook for navigating to different routes
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in or not using the onAuthStateChanged function
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home");
      }
    });

    // Cleanup function: Unsubscribe from the event listener when the component is unmounted
    // This prevents memory leaks and multiple event listeners running in the background
    return () => {
      unsubscribe();
    };
  }, []);
}
