import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { palette } from "../../helpers/colorPalette";
import main_icon from "../../assets/main_icon.svg";

export default function WelcomePage() {
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.value);

  return (
    <main className="welcome-page-all">
      <div className="background-svg"></div>
      <section
        className="welcome-section"
        style={{
          backgroundColor: theme === "dark" ? palette.color3 : palette.color4,
        }}
      >
        <div className="section-one">
          <h2 style={{ color: theme === "dark" ? "white" : "black" }}>
            Unleash Your MyCryptos Adventure: Navigating the Waves of Digital
            Wealth, Securing Your Financial Odyssey!
          </h2>
          <div>
            <button onClick={() => navigate("/login")}>Log In</button>
            <button onClick={() => navigate("/register")}>Sign Up</button>
          </div>
        </div>
        <div className="section-two">
          <img src={main_icon}></img>
        </div>
      </section>
      <summary>
        <h1>A few words about your crypto stite</h1>
      </summary>
    </main>
  );
}
