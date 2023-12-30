import Chart from "chart.js/auto";
import React, { useEffect, useRef } from "react";
// Import necessary modules from Redux toolkit
import { useSelector } from "react-redux";

import { palette } from "../data/colorPalette.js";

const CreateChart = ({ name, data, labels, fullChart }) => {
  const chartRef = useRef(null);

  // Redux state hook for theme
  const { value: theme } = useSelector((state) => state.theme);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: `Percentage Change ${name}`,
            data: data,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: data[9] > data[8] ? '#39FF14' : '#FF3131',
            borderWidth: 2,
            pointRadius: fullChart ? 5 : 1, // Set pointRadius to 0 to remove dots
            pointHoverRadius: 0, // Set pointHoverRadius to 0 to remove dots on hover
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          x: {
            display: fullChart,
            ticks: {
              color: theme === 'dark' ? palette.color5 : palette.color3, // change the color here
            },
          },
          y: {
            display: fullChart,
            ticks: {
              color: theme === 'dark' ? palette.color5 : palette.color3, // change the color here
            },
          },
        },
        plugins: {
          legend: {
            display: fullChart,
            labels: {
              color: theme === 'dark' ? palette.color5 : palette.color3, // change the color here
            },
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [name, data, labels, fullChart]); // Add dependencies to the useEffect

  return <canvas ref={chartRef} style={{ width: "100%", height: "100%" }} />;
};

export default CreateChart;