import axios from "axios";

export const findAvailableRoomWithSearch = async (data) => {
  try {
    const respone = await axios.post(
      "https://booking-ten-omega.vercel.app/room/findAvailableRoomWithSearch",
      data,
    );

    return respone.data;
  } catch (error) {
    const respone = error.response.data.message;

    return respone;
  }
};
export const findRoomByProperty = async (property_id) => {
  try {
    const respone = await axios.post(
      "https://booking-ten-omega.vercel.app/room/getRoomWithProperty",
      { property_id },
    );

    return respone.data;
  } catch (error) {
    const respone = error.response.data.message;

    return respone;
  }
};
export const updateImageForRoom = async (roomId, image) => {
  try {
    const respone = await axios.put(
      "https://booking-ten-omega.vercel.app/room/updateImageForRoom",
      { roomId, image },
    );

    return respone.data;
  } catch (error) {
    const respone = error.response.data.message;

    return respone;
  }
};
export const getMonthlyOccupancyRatesByOwner = async (id) => {
  const respone = await axios.get(
    `https://booking-ten-omega.vercel.app/room/getMonthlyOccupancyRatesByOwner/${id}`,
  );

  return respone.data;
};
export const getMonthlyOccupancyRatesByProperty = async (id) => {
  const respone = await axios.get(
    `https://booking-ten-omega.vercel.app/room/getMonthlyOccupancyRatesByProperty/${id}`,
  );

  return respone.data;
};

export const deleteRoomById = async (roomId) => {
  const respone = await axios.delete(
    `https://booking-ten-omega.vercel.app/room/deleteRoomById/${roomId}`,
  );

  return respone.data;
};
export const getAllRoomWithTotalPrice = async (
  check_in,
  check_out,
  capacity,
  userId,
) => {
  const respone = await axios.post(
    `https://booking-ten-omega.vercel.app/room/getAllRoomWithTotalPrice`,
    { check_in, check_out, place: "all", capacity, userId },
  );

  return respone.data;
};
