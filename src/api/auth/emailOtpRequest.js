import axiosInstance from "../../utilities/axios/axiosInstance";

export const emailOtpRequest = async (email) => {
  try {
    const response = await axiosInstance.post("accounts/email-otp-request/", {
      email,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
