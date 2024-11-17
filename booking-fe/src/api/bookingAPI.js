import axios from "axios";

export const getMonthlyRevenue = async (id) => {
  const respone = await axios.get(
    `http://localhost:8000/booking/getMonthlyRevenue/${id}`,
  );
  return respone.data;
};
export const getMonthlyRevenueByProperty = async (id) => {
  const respone = await axios.get(
    `http://localhost:8000/booking/getMonthlyRevenueByProperty/${id}`,
  );
  return respone.data;
};
export const getBooking = async (id) => {
  console.log(id);
  
  const respone = await axios.get(
    `http://localhost:8000/booking/getBooking/${id}`,
  );
  return respone.data;
}