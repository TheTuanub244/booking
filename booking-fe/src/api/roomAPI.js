import axios from "axios";

export const findAvailableRoomWithSearch = async (data) => {
  try {
    const respone = await axios.post(
      "http://localhost:8000/room/findAvailableRoomWithSearch",
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
      "http://localhost:8000/room/getRoomWithProperty",
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
      "http://localhost:8000/room/updateImageForRoom",
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
    `http://localhost:8000/room/getMonthlyOccupancyRatesByOwner/${id}`,
  );

  return respone.data;
};
export const getMonthlyOccupancyRatesByProperty = async (id) => {
  const respone = await axios.get(
    `http://localhost:8000/room/getMonthlyOccupancyRatesByProperty/${id}`,
  );

  return respone.data;
};

