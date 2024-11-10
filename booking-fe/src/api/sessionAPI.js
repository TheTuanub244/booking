import axios from "axios";

export const getSessionByUser = async (id) => {
  const respone = await axios.get(
    `https://booking-2-l4nk.onrender.com/session/getSessionByUser/${id}`,
  );
  return respone.data;
};
export const getSessionHistory = async (userId) => {
  const respone = await axios.get(
    `https://booking-2-l4nk.onrender.com/session/getSessionHistory/${userId}`,
  );
  return respone.data;
};
export const checkSession = async (userId, accessToken) => {
  const respone = await axios.post(
    `https://booking-2-l4nk.onrender.com/session/refreshAccessToken/${userId}`,
    { accessToken },
  );
  return respone.data;
};
export const updateLastProperties = async (userId, propertyId) => {
  const respone = await axios.put(
    `https://booking-2-l4nk.onrender.com/session/updateLastProperties/${userId}`,
    { propertyId },
  );
  return respone.data;
};
