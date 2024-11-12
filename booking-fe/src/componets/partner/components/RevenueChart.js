import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { getMonthlyRevenue } from "../../../api/bookingAPI";
Chart.register(...registerables);
const RevenueChart = ({ setTotalRevenue }) => {
  const userId = localStorage.getItem("userId");
  const [monthlyRevenue, setMonthlyRevenue] = useState(new Array(12).fill(0));
  const handleGetMonthlyRevenue = async () => {
    const data = await getMonthlyRevenue(userId);

    const result = await data;
    const revenueData = new Array(12).fill(0);
    result[0].monthlyRevenues.forEach((item) => {
      revenueData[item.month - 1] = item.revenue;
    });
    setMonthlyRevenue(revenueData);
    setTotalRevenue(result[0].yearlyRevenue);
  };
  useEffect(() => {
    handleGetMonthlyRevenue();
  }, []);

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Doanh Thu (VNĐ)",
        data: monthlyRevenue,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="chart-container">
      <h3>Doanh Thu Hàng Tháng</h3>
      <Bar data={data} />
    </div>
  );
};

export default RevenueChart;
