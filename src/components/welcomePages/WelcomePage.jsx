import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { palette } from "../../helpers/colorPalette";
import backgroundDark from "../../assets/wave-haikei2.svg";
import backgroundLight from "../../assets/wave-haikei3.svg";
import womanWallet from "../../assets/bitcoin-investment.svg";
// checks if user is logged in or not

export default function WelcomePage() {
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.value);

  return (
    <main className="welcome-page-all">
      <section
        className="welcome-section"
        style={{
          backgroundImage:
            theme === "dark"
              ? `url(${backgroundDark})`
              : `url(${backgroundLight})`,
        }}
      >
        <div className="section-one">
          <button onClick={() => navigate("/login")}>Log In</button>
          <button onClick={() => navigate("/register")}>Sign Up</button>
        </div>
        <div className="section-two">
          <img src={womanWallet}></img>
        </div>
      </section>
    </main>
  );
}
