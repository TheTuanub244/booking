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
export const getBooking = async (id, status) => {
  const respone = await axios.get(
    `http://localhost:8000/booking/getBooking/${id}/${status}`,
  );
  return respone.data;
};
export const createBooking = async (customerId, partnerId) => {
  console.log(customerId);
  console.log(partnerId);

  const respone = await axios.post(
    `http://localhost:8000/booking/createBooking`,
    { customerId, partnerId },
  );
  return respone.data;
};
