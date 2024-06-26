import React, { useState, useEffect, useRef } from "react";
import { trendingCoinsApi } from "../apis/trending-coins-api.js";
// Import necessary modules from Redux toolkit
import { useSelector } from "react-redux";
import { palette } from "../data/colorPalette.js";

export default function RenderTrendingCoins() {
    // State for storing the trending coins data
    const [trendingCoins, setTrendingCoins] = useState([]);
    // State for tracking the number of scrolls
    const [scrollCount, setScrollCount] = useState(0);
    // Reference to the container div
    const container = useRef(null);

    // Redux state hook for theme
    const theme = useSelector((store) => store.theme);

    // Get the viewport width
    const viewportWidth = window.innerWidth;
    // Store the previous window width in a ref
    const prevWidth = useRef(window.innerWidth);

    // Effect for fetching the trending coins data
    useEffect(() => {
        trendingCoinsApi().then((result) => {
            // Set the fetched data to state
            setTrendingCoins(result);
        });
    }, []);

    useEffect(() => {
        // Set up an interval that runs every 5 seconds
        const interval = setInterval(() => {
            const limit = viewportWidth < 600 ? 12 : 11;

            // Check if the container reference is set
            if (container.current) {
                // If we've scrolled 11 times, reset to the start
                if (scrollCount >= limit) {
                    container.current.scrollTo({ left: 0, behavior: "smooth" });
                    setScrollCount(0);
                } else {
                    // Calculate the width of one box and padding based on the viewport width
                    let boxWidth, padding;
                    if (viewportWidth < 600) {
                        boxWidth = container.current.offsetWidth * 0.294; // 30% for the box width
                        padding = container.current.offsetWidth * 0.02; // 1% * 2 for the padding
                    } else {
                        boxWidth = container.current.offsetWidth * 0.195; // 19.3% for the box width
                        padding = container.current.offsetWidth * 0.036; // 1.8% * 2 for the padding
                    }
                    const margin = container.current.offsetWidth * 0.02; // 2% for the margin
                    const totalBoxWidth = boxWidth + padding + margin;

                    // Scroll to the right by the width of one box
                    container.current.scrollTo({
                        left: container.current.scrollLeft + totalBoxWidth,
                        behavior: "smooth",
                    });

                    // Increment the scroll count
                    setScrollCount(scrollCount + 1);
                }
            }
        }, 5000);

        // Function to handle window resize
        const handleResize = () => {
            // If the width hasn't changed, return early
            if (prevWidth.current === window.innerWidth) return;

            // Update the previous width
            prevWidth.current = window.innerWidth;

            if (container.current) {
                container.current.scrollTo({ left: 0, behavior: "smooth" });
                setScrollCount(0);
            }
        };

        // Add event listener for window resize
        window.addEventListener("resize", handleResize);

        // Clean up the interval and event listener when the component unmounts or before the next effect runs
        return () => {
            clearInterval(interval);
            window.removeEventListener("resize", handleResize);
        };
    }, [scrollCount]);

    return (
        <div ref={container} className="trending-coins-all-container">
            {/* Map over the trending coins data and render each coin */}
            {trendingCoins.map((coin) => {
                return (
                    <div
                        className="trending-coin-box"
                        key={coin.item.coin_id}
                        style={{
                            backgroundColor:
                                theme === "dark"
                                    ? palette.color3
                                    : palette.color4,
                            color:
                                theme === "dark"
                                    ? palette.color5
                                    : palette.color3,
                        }}
                    >
                        <div className="trend-title">
                            <img
                                src={coin.item.thumb}
                                alt={`${coin.item.id} logo`}
                            />
                            <h2>{coin.item.symbol}</h2>
                        </div>

                        <div className="trend-details">
                            <h3>{Number(coin.item.data.price).toFixed(10)}</h3>
                            <h3>{coin.item.data.market_cap}</h3>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
