import axiosInstance from "../../utilities/axios/axiosInstance";

export const organizerList = async () => {
  try {
    const response = await axiosInstance.get("superuser/vendors-list/");
    console.log("response of organizers list",response)
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const blockOrganizer = async (id) => {
  try {
    const response = await axiosInstance.post(`superuser/vendor/${id}/`);
  } catch (error) {
    throw error;
  }
};
