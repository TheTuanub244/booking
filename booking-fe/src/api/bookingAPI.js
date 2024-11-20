import axios from "axios";

export const getMonthlyRevenue = async (id) => {
  const respone = await axios.get(
    `${process.env.REACT_APP_API_URL}/booking/getMonthlyRevenue/${id}`,
  );
  return respone.data;
};
export const getMonthlyRevenueByProperty = async (id) => {
  const respone = await axios.get(
    `${process.env.REACT_APP_API_URL}/booking/getMonthlyRevenueByProperty/${id}`,
  );
  return respone.data;
};
export const getBooking = async (id, status) => {
  const respone = await axios.get(
    `${process.env.REACT_APP_API_URL}/booking/getBooking/${id}/${status}`,
  );
  return respone.data;
};
export const createBooking = async (customerId, partnerId, booking_id, property_id) => {
  
  const respone = await axios.post(
    `${process.env.REACT_APP_API_URL}/booking/createBooking`,
    { customerId, partnerId, booking_id, property_id },
  );
  return respone.data;
};
export const findUnfinishedBooking = async (userId) => {
  const respone = await axios.get(
    `${process.env.REACT_APP_API_URL}/booking/findUnfinishedBooking/${userId}`,

  );
  
  return respone.data;
}
