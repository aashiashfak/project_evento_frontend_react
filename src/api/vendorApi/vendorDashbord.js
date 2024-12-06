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


export const getBookedTickets = async (
  search = "",
  page = 1,
  pageSize = 10
) => {
  try {
    const response = await axiosInstance.get(
      "vendors/vendor/booked-ticket-details/",
      {
        params: {
          search,
          page,
          page_size: pageSize, 
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

