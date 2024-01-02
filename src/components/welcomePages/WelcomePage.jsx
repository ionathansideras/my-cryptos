import React, { useRef, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { palette } from "../../data/colorPalette.js";
import main_icon from "../../assets/main_icon.svg";
import FakeChart from "../FakeChart.jsx";
import { articlesData } from "../../data/articlesData.js";
import logo from "../../assets/my-cryptos.svg";
import github from "../../assets/github2.svg";
import linkedin from "../../assets/linkedin2.svg";

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
    function changeViewPercentage() {
      if (window.innerWidth < 600) {
        return '0';
      } else {
        return '9';
      }
    }
    // Function to handle scroll events
    const handleScroll = () => {
      articleRefs.forEach((articleRef, index) => {
        let visible = articleRef.current.getBoundingClientRect().top;
        // Adjust styling based on visibility
        if (visible < window.innerHeight - 200) {
          articleRef.current.style.left = index % 2 === 0 ? `${changeViewPercentage()}%` : "auto";
          articleRef.current.style.right = index % 2 !== 0 ? `-${changeViewPercentage()}%` : "auto";
          articleRef.current.style.opacity = "1";
        }
      });
    };

    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);

    window.addEventListener("resize", handleScroll);

    // Clean up by removing the scroll event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll)
    };
  }, []);

  // JSX structure
  return (
    <main className="welcome-page-all">
      <div className="welcome-background-svg"></div>
      {/* Section One - Welcome */}
      <section
        className="welcome-section"
        style={{
          backgroundColor: theme === "dark" ? palette.color3 : palette.color4,
        }}
      >
        <div className="section-one" ref={chartContainer}>
          <h2>
            Unleash Your MyCryptos Adventure
          </h2>
          <p>Navigating the Waves of Digital
            Wealth, Securing Your Financial Odyssey!</p>
          <div className="section-buttons-container">
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
        className="welcome-summary"
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
                  <br></br>
                  <br></br>
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
                  <br></br>
                  <br></br>
                  {article.content}
                </div>
              </>
            )}
          </article>
        ))}
      </summary>
      <footer className="welcome-footer">
        <div className="footer-logo">
          <img src={logo} alt="logo" className="footer-logo" />
        </div>
        <div className="footer-content">
          <h2>Contact</h2>
          <hr />
          <p>Phone: 1-800-555-5555</p>
          <hr />
          <p>Email: example@gmail.com</p>
          <hr />
          <p>Address: 1234 Example Street, City, State 12345</p>
          <hr />
          <div className="footer-social-media">
            <a href="https://github.com/ionathansideras" target="_blank">
              <img src={github} alt="github" />
            </a>
            <a
              href="https://www.linkedin.com/in/ionathan-sideras-072a60255/"
              target="_blank"
            >
              <img src={linkedin} alt="linkedin" />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
