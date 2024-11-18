import axios from "axios";

export const getMonthlyRevenue = async (id) => {
  const respone = await axios.get(
    `https://booking-ten-omega.vercel.app/booking/getMonthlyRevenue/${id}`,
  );
  return respone.data;
};
export const getMonthlyRevenueByProperty = async (id) => {
  const respone = await axios.get(
    `https://booking-ten-omega.vercel.app/booking/getMonthlyRevenueByProperty/${id}`,
  );
  return respone.data;
};
export const getBooking = async (id, status) => {
  const respone = await axios.get(
    `https://booking-ten-omega.vercel.app/booking/getBooking/${id}/${status}`,
  );
  return respone.data;
};
export const createBooking = async (customerId, partnerId, booking_id, property_id) => {
  
  const respone = await axios.post(
    `https://booking-ten-omega.vercel.app/booking/createBooking`,
    { customerId, partnerId, booking_id, property_id },
  );
  return respone.data;
};
