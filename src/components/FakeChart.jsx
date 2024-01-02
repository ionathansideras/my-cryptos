import React, { useEffect, useState } from "react";
import { line, curveCardinal } from "d3-shape";
import { scaleLinear, scaleBand } from "d3-scale";

const FakeChart = ({ chartContainer }) => {
  const [chartData, setChartData] = useState([
    10, 30, 20, 70, 60, 40, 90, 5, 50, 20, 100,
  ]);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  useEffect(() => {
    const updateContainerDimensions = () => {
      setContainerWidth(chartContainer.current.offsetWidth);
      setContainerHeight(chartContainer.current.offsetHeight / 4);
    };

    const interval = setInterval(() => {
      // Update chart data with new random values
      setChartData((prevData) =>
        prevData.map(() => Math.floor(Math.random() * 100))
      );
    }, 3000); // Update every 3 seconds

    updateContainerDimensions(); // Initialize dimensions

    const resizeObserver = new ResizeObserver(updateContainerDimensions);
    resizeObserver.observe(chartContainer.current);

    return () => {
      clearInterval(interval);
      resizeObserver.disconnect();
    };
  }, [chartContainer]);

  const xScale = scaleBand()
    .domain(chartData.map((_, index) => index))
    .range([0, containerWidth]) // Use the container width
    .padding(0);

  const yScale = scaleLinear().domain([0, 100]).range([containerHeight, 0]); // Use the container height

  const lineGenerator = line()
    .x((_, index) => xScale(index) + xScale.bandwidth() / 2)
    .y((value) => yScale(value))
    .curve(curveCardinal.tension(1));

  return (
    <div className="fake-chart" ref={chartContainer}>
      <svg className="chart" width="100%" height="100%">
        <g transform={`translate(0, 0)`}>
          <g className="axis x" transform={`translate(0, ${containerHeight})`}>
            {xScale.domain().map((index) => (
              <text
                key={index}
                x={xScale(index) + xScale.bandwidth() / 2}
                y={10}
                dy=".35em"
                textAnchor="middle"
              >
                {index}
              </text>
            ))}
          </g>
          <g className="axis y">
            {yScale.ticks().map((tick) => (
              <g key={tick} transform={`translate(0, ${yScale(tick)})`}>
                <line x1={0} y1={0} x2={containerWidth} y2={0} stroke="#ccc" />
                <text x={-5} y={0} dy=".32em" textAnchor="end">
                  {tick}
                </text>
              </g>
            ))}
          </g>
          <path
            d={lineGenerator(chartData)}
            className="line"
            style={{
              stroke: chartData[9] < chartData[10] ? "#39FF14" : '#FF3131',
            }}
          />
        </g>
      </svg>
    </div>
  );
};

export default FakeChart;
