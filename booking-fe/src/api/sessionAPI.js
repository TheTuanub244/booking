import axios from "axios";

export const getSessionByUser = async (id) => {
  const respone = await axios.get(
    `https://booking-ten-omega.vercel.app/session/getSessionByUser/${id}`,
  );
  return respone.data;
};
export const getSessionHistory = async (userId) => {
  const respone = await axios.get(
    `https://booking-ten-omega.vercel.app/session/getSessionHistory/${userId}`,
  );
  return respone.data;
};
export const checkSession = async (userId, accessToken) => {
  const respone = await axios.post(
    `https://booking-ten-omega.vercel.app/session/refreshAccessToken/${userId}`,
    { accessToken },
  );
  return respone.data;
};
export const updateLastProperties = async (userId, propertyId) => {
  const respone = await axios.put(
    `https://booking-ten-omega.vercel.app/session/updateLastProperties/${userId}`,
    { propertyId },
  );
  return respone.data;
};
