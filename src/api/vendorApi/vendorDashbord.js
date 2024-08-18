import axiosInstance from "../../utilities/axios/axiosInstance";

export const dashboardItems = async () => {
  try {
    const response = await axiosInstance.get("vendors/vendor/dashboard/");
    return response.data;
  } catch (error) {
    console.log("error feching dashboard Data", error);
    throw error;
  }
};


export const getBookedUsers = async (search = "") => {
  try {
    const response = await axiosInstance.get(
      "vendors/vendor/user-ticket-details/",
      {
        params: {search},
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

