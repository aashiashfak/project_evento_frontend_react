import React from "react";
import {Pie} from "react-chartjs-2";
import "chart.js/auto";

const PieChart = ({data}) => {
  const statusColors = {
    active: "rgba(75, 192, 192, 0.6)", // Green
    completed: "rgba(255, 99, 132, 0.6)", // Red
    disabled: "rgba(201, 203, 207, 0.6)", // Ash/Grey
  };

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: Object.keys(data).map(
          (status) => statusColors[status] || "rgba(0, 0, 0, 0.6)"
        ),
        borderColor: Object.keys(data).map(
          (status) => statusColors[status] || "rgba(0, 0, 0, 1)"
        ),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-52 h-52 m-auto sm:m-0">
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;
