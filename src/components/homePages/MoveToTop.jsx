import { moveUp } from "../../helpers/moveUp";
import { useState, useEffect } from "react";

export default function MoveToTop() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      style={{ display: showButton ? "inline-block" : "none" }}
      onClick={moveUp}
    >
      Move Up
    </button>
  );
}