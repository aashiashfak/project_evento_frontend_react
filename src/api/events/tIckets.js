import axiosInstance from "../../utilities/axios/axiosInstance";

export const cancelUserTicket = async (ticketID) => {
  try {
    const response = await axiosInstance.post(
      `events/cancel-ticket/${ticketID}/`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
