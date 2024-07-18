import axiosInstance from "../../utilities/axios/axiosInstance";

export const LoginRequest = async (username, password) => {
  try {
    const response = await axiosInstance.post("superuser/login/", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
