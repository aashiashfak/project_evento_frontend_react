import axiosInstance from "../../utilities/axios/axiosInstance";

export const getVendorEvents = async () => {
  try {
    const response = await axiosInstance.get("vendors/vendor/get-create-event");
    return response.data;
  } catch (error) {
    throw error;
  }
};
