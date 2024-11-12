import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
const AverageRatingChart = () => {
  const data = {
    labels: ["5 sao", "4 sao", "3 sao", "2 sao", "1 sao"],
    datasets: [
      {
        data: [40, 30, 15, 10, 5],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    ],
  };

  return (
    <div className="chart-container">
      <h3>Đánh Giá Trung Bình</h3>
      <Pie data={data} />
    </div>
  );
};

export default AverageRatingChart;
