import Chart from "chart.js/auto";
import React, { useEffect, useRef } from "react";

const CreateChart = ({ name, data, labels }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "",
            data: data,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: data[9] > data[8] ? '#39FF14' : '#FF3131',
            borderWidth: 1,
            pointRadius: 1, // Set pointRadius to 0 to remove dots
            pointHoverRadius: 0, // Set pointHoverRadius to 0 to remove dots on hover
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          x: {
            display: false,
          },
          y: {
            display: false,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, []);

  return <canvas ref={chartRef} style={{ width: "100%", height: "100%" }} />;
};

export default CreateChart;
