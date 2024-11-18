import axios from "axios";

export const createReview = async (data) => {
  const respone = await axios.post(
    "https://booking-ten-omega.vercel.app/review/createReview",
    data,
  ); //data = { userId, roomId, rating, reviewText, reviewType }
  return respone.data;
};
export const getMonthlyRate = async (owner_id) => {
  const respone = await axios.get(
    `https://booking-ten-omega.vercel.app/review/getMonthlyRating/${owner_id}`,
  );
  return respone.data;
};
export const getMonthlyRateByProperty = async (property_id) => {
  console.log(property_id);

  const respone = await axios.get(
    `https://booking-ten-omega.vercel.app/review/getMonthlyRatingByProperty/${property_id}`,
  );
  return respone.data;
};
