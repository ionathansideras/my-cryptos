import { moveUp } from "../../helpers/moveUp";
import { useState, useEffect } from "react";
import up3Img from "../../assets/up3.svg";
import up2Img from "../../assets/up1.svg";
// Import necessary modules from Redux toolkit
import { useSelector } from "react-redux";

export default function MoveToTop() {
    const [showButton, setShowButton] = useState(false);

    // Redux state hook for theme
    const theme = useSelector((store) => store.theme);

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
            className="moveUp-button"
        >
            {theme === "dark" ? (
                <img src={up2Img} alt="up" />
            ) : (
                <img src={up3Img} alt="up" />
            )}
        </button>
    );
}
