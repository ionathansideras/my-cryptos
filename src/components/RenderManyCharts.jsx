import React from "react";
import CreateChart from "./CreateChart";

// Functional component RenderManyCharts that takes chartData as a prop
export default function RenderManyCharts({ chartData }) {
  // Nested functional component RenderChart that maps over chartData and renders individual charts
  function RenderChart() {
    return (
      // Each chart is wrapped in a div with a unique key
      <CreateChart
        name={chartData.coin_name}
        data={[
          chartData.percent_change_1year,
          chartData.percent_change_30d,
          chartData.percent_change_14d,
          chartData.percent_change_7d,
          chartData.percent_change_24h,
          chartData.percent_change_4h,
          chartData.percent_change_2h,
          chartData.percent_change_1h,
          chartData.percent_change_15min,
          chartData.percent_change_5min,
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
    );
  }

  // Conditional rendering based on the presence of chartData
  // If chartData exists, RenderChart is rendered, otherwise, a loading message is displayed
  return chartData ? <RenderChart /> : <div>Loading...</div>;
}
