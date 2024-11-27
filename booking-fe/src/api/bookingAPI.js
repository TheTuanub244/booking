import axios from "axios";

export const getMonthlyRevenue = async (id) => {
  const respone = await axios.get(
    `${process.env.REACT_APP_API_URL}/booking/getMonthlyRevenue/${id}`,
    {
      withCredentials: true,
    },
  );
  return respone.data;
};
export const getMonthlyRevenueByProperty = async (id) => {
  const respone = await axios.get(
    `${process.env.REACT_APP_API_URL}/booking/getMonthlyRevenueByProperty/${id}`,
    {
      withCredentials: true,
    },
  );
  return respone.data;
};
export const getBooking = async (id, status) => {
  const respone = await axios.get(
    `${process.env.REACT_APP_API_URL}/booking/getBooking/${id}/${status}`,
    {
      withCredentials: true,
    },
  );
  return respone.data;
};
export const createBooking = async (
  customerId,
  partnerId,
  booking_id,
  property_id,
  token
) => {
  const respone = await axios.post(
    `${process.env.REACT_APP_API_URL}/booking/createBooking`,
    { customerId, partnerId, booking_id, property_id },
    {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header
      },
      withCredentials: true, // Giữ cookie nếu cần
    }
  );
  return respone.data;
};
export const findUnfinishedBooking = async (userId) => {
  const respone = await axios.get(
    `${process.env.REACT_APP_API_URL}/booking/findUnfinishedBooking/${userId}`,
    {
      withCredentials: true,
    },
  );

  return respone.data;
};
export const getBookingByOwner = async (userId) => {
  const respone = await axios.get(
    `${process.env.REACT_APP_API_URL}/booking/getBookingByOwner/${userId}`,
    {
      withCredentials: true,
    },
  );

  return respone.data;
}