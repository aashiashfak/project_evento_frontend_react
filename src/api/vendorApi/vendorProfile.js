import axiosInstance from "../../utilities/axios/axiosInstance";

export const getVendorProfile = async () => {
  try {
    const response = await axiosInstance.get("vendors/vendor/profile/");
    return response.data;
  } catch (error) {
    throw error;
  }
};
