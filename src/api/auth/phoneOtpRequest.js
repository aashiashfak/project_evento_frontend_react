import axiosInstance from "../../utilities/axios/axiosInstance";

export const phoneOtpRequest = async (phone_number) => {
  try {
    const response = await axiosInstance.post("accounts/phone-otp-request/", {
       phone_number: `+91${phone_number}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
