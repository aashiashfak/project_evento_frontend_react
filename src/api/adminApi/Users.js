import axiosInstance from "../../utilities/axios/axiosInstance";

export const userList = async () => {
  try {
    const response = await axiosInstance.get("superuser/users-list/");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const blockUser = async (id) => {
  try {
    const response = await axiosInstance.post(`superuser/user/${id}/`);
  } catch (error) {
    throw error;
  }
};
