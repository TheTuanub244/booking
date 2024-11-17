import axios from "axios";
export const updatePropertyWithPartner = async (formData, token) => {
  for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }
  try {
    const response = await axios.post(
      "http://localhost:8000/property/updatePropertyWithPartner",
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
export const createPropertyWithPartner = async (formData, token) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/property/createPropertyWithPartner",
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
    "http://localhost:8000/property/getAllProperty",
    { withCredentials: true },
  );
  return respone.data;
};
export const getPropertyById = async (id) => {
  const respone = await axios.get(
    `http://localhost:8000/property/getPropertyById/${id}`,
    { withCredentials: true },
  );

  return respone.data;
};
export const getPropertyTypesByPlace = async (place) => {
  const respone = await axios.post(
    "http://localhost:8000/property/getPropertyTypesByPlace",
    { place },
    { withCredentials: true },
  );

  return respone.data;
};
export const getPropertyByTypeAndPlace = async (place, type) => {
  const respone = await axios.post(
    "http://localhost:8000/property/getPropertyByTypeAndPlace",
    { place, type },
    { withCredentials: true },
  );

  return respone.data;
};
export const getPropertyByPlace = async (place) => {
  const respone = await axios.post(
    "http://localhost:8000/property/getPropertyByPlace",
    { place },
    { withCredentials: true },
  );
  return respone.data;
};
export const getPropertyByRates = async () => {
  try {
    const respone = await axios.get(
      "http://localhost:8000/property/getPropertiesSortedByRate",
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
    "http://localhost:8000/property/getAllTypeOfProperties",
    { withCredentials: true },
  );
  return response.data;
};
export const updateImageForProperty = async (propertyId, image) => {
  try {
    const respone = await axios.put(
      "http://localhost:8000/property/updateImageForProperty",
      { propertyId, image },
      { withCredentials: true },
    );

    return respone.data;
  } catch (error) {
    const respone = error.response.data.message;

    return respone;
  }
};
export const getPropertyByOwner = async (id, currentPage, propertiesPage) => {
  const respone = await axios.get(
    `http://localhost:8000/property/getPropetyWithOwner/${id}?page=${currentPage}&limit=${propertiesPage}`,
    { withCredentials: true },
  );
  return respone.data;
};
export const getPropertyNear = async (longitude, latitude) => {
  try {
    const respone = await axios.post(
      "http://localhost:8000/property/getPropertyNear",
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
      "http://localhost:8000/property/getPropertyByPlace",
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
    "http://localhost:8000/property/getDistinctPlace",
  );
  return respone.data;
};
