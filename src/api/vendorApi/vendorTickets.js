import axiosInstance from "../../utilities/axios/axiosInstance";

export const getTicketTypes = async (eventId) => {
  try {
    const response = await axiosInstance.get(
      `vendors/vendor/events/${eventId}/ticket-types/`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addTicketTypes = async (eventId, formData) => {
  try {
    const response = await axiosInstance.post(
      `vendors/vendor/events/${eventId}/ticket-types/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding tickets:", error);
    throw error;
  }
};

// Edit existing tickets
export const editTicketTypes = async (eventId, ticketId, formData) => {
  try {
    const response = await axiosInstance.patch(
      `vendors/vendor/events/${eventId}/ticket-types/${ticketId}/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error editing tickets:", error);
    throw error;
  }
};

export const deleteTicketTypes = async (eventId, ticketId) => {
  try {
    const response = await axiosInstance.delete(
      `vendors/vendor/events/${eventId}/ticket-types/${ticketId}/`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
