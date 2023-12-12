import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { palette } from "../../helpers/colorPalette";
import main_icon from "../../assets/main_icon.svg";
import FakeChart from "../FakeChart.jsx";
import { useRef, useEffect } from "react";

export default function WelcomePage() {
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.value);
  const chartContainer = useRef(null);

  return (
    <main className="welcome-page-all">
      <div className="background-svg"></div>
      <section
        className="welcome-section"
        style={{
          backgroundColor: theme === "dark" ? palette.color3 : palette.color4,
        }}
      >
        <div className="section-one" ref={chartContainer}>
          <h2>
            Unleash Your MyCryptos Adventure: Navigating the Waves of Digital
            Wealth, Securing Your Financial Odyssey!
          </h2>
          <div className="buttons-con">
            <button onClick={() => navigate("/login")}>Log In</button>
            <button onClick={() => navigate("/register")}>Sign Up</button>
          </div>
          <FakeChart chartContainer={chartContainer} />
        </div>
        <div className="section-two">
          <img src={main_icon}></img>
        </div>
      </section>
      <summary
        style={{
          backgroundColor: theme === "dark" ? palette.color3 : palette.color4,
        }}
      ></summary>
    </main>
  );
}
