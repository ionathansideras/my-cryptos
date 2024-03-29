import React from "react";
import sun1 from "../assets/icons8-sun-48.png";
import sun2 from "../assets/icons8-sun-48 (1).png";
import logo from "../assets/my-cryptos.svg";
import { auth } from "../config/firebaseInfo.js";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeTheme } from "../redux/toggleThemes.js";
import { palette } from "../data/colorPalette.js";

export default function Header() {
  const button = useRef(null);
  const [rotation, setRotation] = useState(0);
  const sun = useRef(null);

  const theme = useSelector((store) => store.theme);

  const dispatch = useDispatch();

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
    dispatch(changeTheme());
    setRotation((prevRotation) => prevRotation + 180);
  }

  return (
    <header
      style={{
        backgroundColor: theme === "dark" ? palette.color1 : palette.color4,
      }}
    >
      <img src={logo} alt="logo" className="header-logo" />
      <div>
        <img
          src={theme === "dark" ? sun2 : sun1}
          alt="sun"
          ref={sun}
          style={{ transform: `rotate(${rotation}deg)` }}
          onClick={animateSun}
          className="header-sun"
        />
        <button className="log-out-button" ref={button} onClick={() => signOut(auth)}>
          LogOut
        </button>
      </div>
    </header>
  );
}
