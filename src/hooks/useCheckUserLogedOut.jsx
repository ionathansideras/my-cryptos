// Import necessary modules from React and Firebase
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebaseInfo";
import { onAuthStateChanged } from "firebase/auth";
// Custom hook for checking user authentication status
export default function useCheckUserLogedOut() {
  // useNavigate hook for navigating to different routes
  const navigate = useNavigate();

  const user = auth?.currentUser;

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, []);
}
