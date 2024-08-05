import axiosInstance from "../../utilities/axios/axiosInstance";

export const listLocations = async () => {
  try {
    const response = await axiosInstance.get("superuser/locations/");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addLocation = async (locationData) => {
  try {
    const response = await axiosInstance.post(
      "superuser/locations/",
      locationData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateLocation = async (id, locationData) => {
  try {
    const response = await axiosInstance.patch(
      `superuser/locations/${id}/`,
      locationData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteLocation = async (id) => {
  try {
    await axiosInstance.delete(`superuser/locations/${id}/`);
  } catch (error) {
    throw error;
  }
};
