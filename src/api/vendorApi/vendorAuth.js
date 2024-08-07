import axiosInstance from "../../utilities/axios/axiosInstance";

export const vendorSignUpApi = async (values) => {
  try {
    const response = await axiosInstance.post("vendors/signup/", values);
    return response.data;
  } catch (error) {
    console.error("Error during vendor sign up:", error);
    throw error;
  }
};
export const verifyOtp = async ({otp, vendorData}) => {
    console.log('printed machaaa',vendorData, otp )
  try {
    const response = await axiosInstance.post("vendors/vendor/verify-otp/", {
      otp, 
      vendorData, 
    });
    return response.data;
  } catch (error) {
    console.error("Error during verifying OTP:", error);
    throw error;
  }
};
