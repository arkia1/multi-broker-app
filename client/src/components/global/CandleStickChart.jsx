import ReactAPexChart from "react-apexcharts";
import PropTypes from "prop-types";

const CandleStickChart = ({ chartData }) => {
  const options = {
    chart: {
      type: "candlestick",
      height: 350,
    },
    title: {
      text: "CandleStick Chart",
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  const series = [
    {
      data: chartData && chartData.length ? chartData : [],
    },
  ];

  return (
    <div id="chart">
      <ReactAPexChart
        options={options}
        series={series}
        type="candlestick"
        height={350}
      />
    </div>
  );
};
CandleStickChart.propTypes = {
  chartData: PropTypes.object.isRequired,
};

export default CandleStickChart;
