import Chart from "chart.js/auto";
import React, { useEffect, useRef } from "react";
// Functional component CreateChart that renders a Chart.js chart
const CreateChart = ({ name, data, labels }) => {
  // Create a reference to the chart canvas element
  const chartRef = useRef(null);

  // Effect hook to initialize the chart when the component mounts
  useEffect(() => {
    // Get the 2D rendering context of the chart canvas
    const ctx = chartRef.current.getContext("2d");

    // Create a new Chart.js instance with the specified configuration
    const myChart = new Chart(ctx, {
      type: "line", // Set the chart type (bar, line, pie, etc.)
      data: {
        labels: labels, // Set the labels for the chart
        datasets: [
          {
            label: name, // Set the label for the dataset
            data: data, // Set the data points for the dataset
            backgroundColor: "rgba(75,192,192,0.2)", // Set the background color for the dataset
            borderColor: "rgba(75,192,192,1)", // Set the border color for the dataset
            borderWidth: 1, // Set the border width for the dataset
          },
        ],
      },
    });

    // Cleanup function to destroy the chart when the component unmounts
    return () => {
      myChart.destroy();
    };
  }, []); // The empty dependency array ensures that the effect runs only once on mount

  // Render the chart canvas element with the assigned ref
  return <canvas ref={chartRef} />;
};

export default CreateChart;
