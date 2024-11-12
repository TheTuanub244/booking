import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { getMonthlyOccupancyRatesByOwner } from "../../../api/roomAPI";
Chart.register(...registerables);
const OccupancyRateChart = () => {
  const userId = localStorage.getItem("userId");
  const getOccupancyRate = async () => {
    const respone = await getMonthlyOccupancyRatesByOwner(userId);
    console.log(respone);
  };
  useEffect(() => {
    getOccupancyRate();
  }, []);
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Tỷ Lệ Lấp Đầy (%)",
        data: [80, 75, 85, 78, 82, 90],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  return (
    <div className="chart-container">
      <h3>Tỷ Lệ Lấp Đầy Phòng Hàng Tháng</h3>
      <Line data={data} />
    </div>
  );
};

export default OccupancyRateChart;
