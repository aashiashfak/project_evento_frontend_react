import axiosInstance from "../../utilities/axios/axiosInstance";

export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get("accounts/user-profile/");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to update the username
export const updateUsername = async (username) => {
  const response = await axiosInstance.put("accounts/user-profile/", {
    username,
  });
};

// Function to update the profile picture
export const updateProfilePicture = async (formData) => {
  const response = await axiosInstance.put("accounts/user-profile/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.profile_picture;
};
