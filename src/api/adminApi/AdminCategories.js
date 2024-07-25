import axiosInstance from "../../utilities/axios/axiosInstance";

// GET request for listing categories
export const categoryList = async () => {
  try {
    const response = await axiosInstance.get('superuser/categories/');
    return response;
  } catch (error) {
    throw error;
  }
};

// POST request for adding a new category
export const addCategory = async (categoryData) => {
  try {
    const response = await axiosInstance.post('superuser/categories/', categoryData);
    return response;
  } catch (error) {
    throw error;
  }
};