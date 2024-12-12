import { useEffect, useState } from "react";
import ReactAPexChart from "react-apexcharts";
import PropTypes, { object } from "prop-types";

const CandleStickChart = ({ chartData }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkMode = document.documentElement.classList.contains("dark");
    setIsDarkMode(darkMode);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const darkMode = document.documentElement.classList.contains("dark");
          setIsDarkMode(darkMode);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
    });

    return () => observer.disconnect();
  }, []);

  // Calculate the min and max values for the y-axis
  const yAxisMin = Math.min(...chartData.map((data) => Math.min(...data.y)));
  const yAxisMax = Math.max(...chartData.map((data) => Math.max(...data.y)));

  // Add a buffer to the min and max values to ensure the chart is more readable
  const buffer = (yAxisMax - yAxisMin) * 0.1; // 10% buffer
  const adjustedMin = yAxisMin - buffer;
  const adjustedMax = yAxisMax + buffer;

  const options = {
    chart: {
      type: "candlestick",
      height: 500,
      background: isDarkMode ? "#374151" : "transparent", // Set background color based on dark mode
    },
    title: {
      text: "CandleStick Chart",
      align: "left",
      style: {
        color: isDarkMode ? "#ffffff" : "#000000", // Adjust title color
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        style: {
          colors: isDarkMode ? "#ffffff" : "#000000", // Adjust x-axis labels color
        },
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      min: adjustedMin,
      max: adjustedMax,
      labels: {
        style: {
          colors: isDarkMode ? "#ffffff" : "#000000", // Adjust y-axis labels color
        },
      },
    },
    theme: {
      mode: isDarkMode ? "dark" : "light", // Adjust theme mode
    },
  };

  const series = [
    {
      data: chartData && chartData.length ? chartData : [],
    },
  ];

  return (
    <div id="chart" className="p-4 rounded-md">
      <ReactAPexChart
        options={options}
        series={series}
        type="candlestick"
        height={500}
      />
    </div>
  );
};

CandleStickChart.propTypes = {
  chartData: PropTypes.array || object.isRequired,
};

export default CandleStickChart;
