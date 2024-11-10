import axios from "axios";
export const createPropertyWithPartner = async (formData, token) => {
  try {
    const response = await axios.post(
      "https://booking-2-l4nk.onrender.com/property/createPropertyWithPartner",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error creating property:", error);
    throw error;
  }
};
export const getAllProperty = async () => {
  const respone = await axios.get(
    "https://booking-2-l4nk.onrender.com/property/getAllProperty",
    { withCredentials: true },
  );
  return respone.data;
};
export const getPropertyById = async (id) => {
  const respone = await axios.get(
    `https://booking-2-l4nk.onrender.com/property/getPropertyById/${id}`,
    { withCredentials: true },
  );

  return respone.data;
};
export const getPropertyTypesByPlace = async (place) => {
  const respone = await axios.post(
    "https://booking-2-l4nk.onrender.com/property/getPropertyTypesByPlace",
    { place },
    { withCredentials: true },
  );

  return respone.data;
};
export const getPropertyByTypeAndPlace = async (place, type) => {
  const respone = await axios.post(
    "https://booking-2-l4nk.onrender.com/property/getPropertyByTypeAndPlace",
    { place, type },
    { withCredentials: true },
  );

  return respone.data;
};
export const getPropertyByPlace = async (place) => {
  const respone = await axios.post(
    "https://booking-2-l4nk.onrender.com/property/getPropertyByPlace",
    { place },
    { withCredentials: true },
  );
  return respone.data;
};
export const getPropertyByRates = async () => {
  try {
    const respone = await axios.get(
      "https://booking-2-l4nk.onrender.com/property/getPropertiesSortedByRate",
      { withCredentials: true },
    );

    return respone.data;
  } catch (error) {
    const respone = error.response.data.message;

    return respone;
  }
};
export const getAllTypeOfProperties = async () => {
  const response = await axios.get(
    "https://booking-2-l4nk.onrender.com/property/getAllTypeOfProperties",
    { withCredentials: true },
  );
  return response.data;
};
export const updateImageForProperty = async (propertyId, image) => {
  try {
    const respone = await axios.put(
      "https://booking-2-l4nk.onrender.com/property/updateImageForProperty",
      { propertyId, image },
      { withCredentials: true },
    );

    return respone.data;
  } catch (error) {
    const respone = error.response.data.message;

    return respone;
  }
};
export const getPropertyNear = async (longitude, latitude) => {
  try {
    const respone = await axios.post(
      "https://booking-2-l4nk.onrender.com/property/getPropertyNear",
      { longitude, latitude },
      { withCredentials: true },
    );

    return respone.data;
  } catch (error) {
    const respone = error.response.data.message;

    return respone;
  }
};
export const getPropertyByplace = async (place) => {
  try {
    const respone = await axios.post(
      "https://booking-2-l4nk.onrender.com/property/getPropertyByPlace",
      { place },
    );

    return respone.data;
  } catch (error) {
    const respone = error.response.data.message;

    return respone;
  }
};
export const getDistinctPlace = async () => {
  const respone = await axios.get(
    "https://booking-2-l4nk.onrender.com/property/getDistinctPlace",
  );
  return respone.data;
};
