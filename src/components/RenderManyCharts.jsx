import React from "react";
import CreateChart from "./CreateChart";

// Functional component RenderManyCharts that takes chartData as a prop
export default function RenderManyCharts({ chartData }) {
  // Nested functional component RenderChart that maps over chartData and renders individual charts
  function RenderChart() {
    return chartData.map((coin) => {
      return (
        // Each chart is wrapped in a div with a unique key
        <div key={coin.id}>
          {/* CreateChart component with data and labels passed as props */}
          <CreateChart
            name={coin.coin_name}
            data={[
              coin.percent_change_1year,
              coin.percent_change_30d,
              coin.percent_change_14d,
              coin.percent_change_7d,
              coin.percent_change_24h,
              coin.percent_change_4h,
              coin.percent_change_2h,
              coin.percent_change_1h,
              coin.percent_change_15min,
              coin.percent_change_5min,
            ]}
            labels={[
              "1y",
              "30d",
              "14d",
              "7d",
              "24h",
              "4h",
              "2h",
              "1h",
              "15min",
              "5min",
            ]}
          />
        </div>
      );
    });
  }

  // Conditional rendering based on the presence of chartData
  // If chartData exists, RenderChart is rendered, otherwise, a loading message is displayed
  return chartData ? <RenderChart /> : <div>Loading...</div>;
}
