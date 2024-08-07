import axiosInstance from "../../utilities/axios/axiosInstance";

export const vendorSignUp = async (values) => {
  try {
    const response = await axiosInstance.post("vendors/signup/", values);
    return response.data;
  } catch (error) {
    console.error("Error during vendor sign up:", error);
    throw error;
  }
};
