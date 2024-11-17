import axios from "axios";

export const createReview = async (data) => {
  const respone = await axios.post(
    "http://localhost:8000/review/createReview",
    data,
  ); //data = { userId, roomId, rating, reviewText, reviewType }
  return respone.data;
};
export const getMonthlyRate = async (owner_id) => {
  const respone = await axios.get(
    `http://localhost:8000/review/getMonthlyRating/${owner_id}`,
  );
  return respone.data;
};
export const getMonthlyRateByProperty = async (property_id) => {
  console.log(property_id);

  const respone = await axios.get(
    `http://localhost:8000/review/getMonthlyRatingByProperty/${property_id}`,
  );
  return respone.data;
};
