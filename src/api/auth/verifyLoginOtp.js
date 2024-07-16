import axiosInstance from "../../utilities/axios/axiosInstance";

export const verifyEmailOtp = async (otp, email) => {
  try {
    const response = await axiosInstance.post(
      "accounts/email-otp-verification/",
      {otp, email}
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const verifyPhoneOtp = async (otp, phone_number) => {
  try {
    const response = await axiosInstance.post(
      "accounts/phone-otp-verification/",
      {otp, phone_number}
    );
    return response;
  } catch (error) {
    throw error;
  }
};
