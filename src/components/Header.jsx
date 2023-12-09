import React from "react";
import sun1 from "../assets/icons8-sun-48.png";
import { auth } from "../config/firebaseInfo.js";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const button = useRef(null);
  const [rotation, setRotation] = useState(0);
  const sun = useRef(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        button.current.style.display = "inline-block";
      } else {
        button.current.style.display = "none";
      }
    });
  }, []);

  function animateSun() {
    setRotation((prevRotation) => prevRotation + 180);
  }

  return (
    <header>
      <div>logo</div>
      <div>
        <img
          src={sun1}
          alt="sun"
          ref={sun}
          style={{ transform: `rotate(${rotation}deg)` }}
          onClick={animateSun}
          className="header-sun"
        />
        <button ref={button} onClick={() => signOut(auth)}>
          LogOut
        </button>
      </div>
    </header>
  );
}
