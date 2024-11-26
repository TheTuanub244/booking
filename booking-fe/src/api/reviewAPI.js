import axios from "axios";

export const createReview = async (data) => {
  const respone = await axios.post(
    `${process.env.REACT_APP_API_URL}/review/createReview`,
    data,
  ); //data = { userId, roomId, rating, reviewText, reviewType }
  return respone.data;
};
export const getMonthlyRate = async (owner_id) => {
  const respone = await axios.get(
    `${process.env.REACT_APP_API_URL}/review/getMonthlyRating/${owner_id}`,
  );
  return respone.data;
};
export const getMonthlyRateByProperty = async (property_id) => {
  console.log(property_id);

  const respone = await axios.get(
    `${process.env.REACT_APP_API_URL}/review/getMonthlyRatingByProperty/${property_id}`,
  );
  return respone.data;
};
export const findReviewWithProperty = async (property_id, page) => {
  const respone = await axios.get(
    `${process.env.REACT_APP_API_URL}/review/findReviewWithProperty/${property_id}?page=${page}`,
  );
  return respone.data;
};
