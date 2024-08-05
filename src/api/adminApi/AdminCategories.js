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
    const response = await axiosInstance.post(
      "superuser/categories/",
      categoryData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

//PUT or PATCH request for editing a category
export const updateCategory = async (id, categoryData, method) => {
  try {
    const config = {
      headers: {
        "Content-Type":
          categoryData instanceof FormData
            ? "multipart/form-data"
            : "application/json",
      },
    };
    const response = await axiosInstance({
      method: method,
      url: `superuser/categories/${id}/`,
      data: categoryData,
      ...config,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
//DELETE request for deleting Category
export const deleteCategory = async (id) =>{
  try{
    await axiosInstance.delete(`superuser/categories/${id}/`)
  }catch(error){
    throw(error)
  }
} 