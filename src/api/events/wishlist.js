import axiosInstance from "../../utilities/axios/axiosInstance";

export const getWishlistItems = async () => {
  try {
    const response = await axiosInstance.get("events/wishlist/");
    console.log("wishlist data ", response.data);
    return response.data;
    
  } catch (error) {
    throw error;
  }
};
