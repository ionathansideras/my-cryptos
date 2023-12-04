import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebaseInfo";

export default function useCheckUser() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in or not
    const databaseCheck = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      }
    });
    return () => {
      // Unsubscribe from the event listener when the component is unmounted
      // because otherwise we will have a memory leak and there will be multiple event listeners
      // running in the background
      databaseCheck();
    };
  }, []);
}
