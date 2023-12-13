import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { palette } from "../../data/colorPalette.js";
import main_icon from "../../assets/main_icon.svg";
import FakeChart from "../FakeChart.jsx";
import { articlesData } from "../../data/articlesData.js";

export default function WelcomePage() {
  // React Router navigation hook
  const navigate = useNavigate();

  // Redux state hook for theme
  const { value: theme } = useSelector((state) => state.theme);

  // Ref for the chart container
  const chartContainer = useRef(null);

  // Refs for each article section
  const articleRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    // Function to handle scroll events
    const handleScroll = () => {
      articleRefs.forEach((articleRef, index) => {
        let visible = articleRef.current.getBoundingClientRect().top;

        // Adjust styling based on visibility
        if (visible < window.innerHeight - 200) {
          articleRef.current.style.left = index % 2 === 0 ? "0vw" : "auto";
          articleRef.current.style.right = index % 2 !== 0 ? "0vw" : "auto";
          articleRef.current.style.opacity = "1";
        }
      });
    };

    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up by removing the scroll event listener when the component unmounts
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // JSX structure
  return (
    <main className="welcome-page-all">
      <div className="background-svg"></div>
      {/* Section One - Welcome */}
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
        {/* Section Two - Main Icon */}
        <div className="section-two">
          <img src={main_icon} alt="Main Icon"></img>
        </div>
      </section>
      {/* Section Three - Summary with Articles */}
      <summary
        style={{
          backgroundColor: theme === "dark" ? palette.color2 : palette.color5,
          color: theme === "dark" ? "rgb(228, 228, 228)" : palette.color3,
        }}
      >
        {articlesData.map((article, index) => (
          <article
            key={index}
            className={`welcome-article-${index + 1}`}
            style={{
              backgroundColor:
                theme === "dark" ? palette.color3 : palette.color4,
            }}
            ref={articleRefs[index]}
          >
            {index % 2 === 0 ? (
              <>
                <div className={`welcome-article-div-${index + 1}`}>
                  {/* Article Content */}
                  {article.title}
                  {article.content}
                </div>
                <img src={article.image} alt={`Article ${index + 1}`} />
              </>
            ) : (
              <>
                <img src={article.image} alt={`Article ${index + 1}`} />
                <div className={`welcome-article-div-${index + 1}`}>
                  {/* Article Content */}
                  {article.title}
                  {article.content}
                </div>
              </>
            )}
          </article>
        ))}
      </summary>
    </main>
  );
}