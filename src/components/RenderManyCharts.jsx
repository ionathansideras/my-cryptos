import React from "react";
import CreateChart from "./CreateChart";

// Functional component RenderManyCharts that takes chartData as a prop
export default function RenderManyCharts({ chartData, coinDetails }) {

  const data = chartData || coinDetails;

  // Nested functional component RenderChart that maps over chartData and renders individual charts
  function RenderChart() {
    return (
      // Each chart is wrapped in a div with a unique key
      <CreateChart
        fullChart={ coinDetails ? true : false}
        name={data.coin_name}
        data={[
          data.percent_change_1year,
          data.percent_change_30d,
          data.percent_change_14d,
          data.percent_change_7d,
          data.percent_change_24h,
          data.percent_change_4h,
          data.percent_change_2h,
          data.percent_change_1h,
          data.percent_change_15min,
          data.percent_change_5min,
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
  return chartData || coinDetails ? <RenderChart /> : <div>Loading...</div>;
}
