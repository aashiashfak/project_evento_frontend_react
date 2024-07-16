import axiosInstance from "../../utilities/axios/axiosInstance";

export const resendOtp = async (identifier, value) => {
  try {
    const response = await axiosInstance.post("accounts/resend-otp/", {
      email: identifier === "email" ? value : undefined,
      phone_number: identifier === "phone" ? value : undefined,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
