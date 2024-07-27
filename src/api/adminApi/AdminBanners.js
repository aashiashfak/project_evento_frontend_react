import axiosInstance from "../../utilities/axios/axiosInstance";

export const listBanners = async () => {
    try{
        const response = await axiosInstance.get('superuser/banners/')
        console.log(response.data)
        return response.data
    }catch(error){
        throw(error)
    }
};


export const addBanner = async (bannerData) => {
  try {
    const response = await axiosInstance.post(
      "superuser/banners/",
      bannerData,
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

export const editBanner = async (id, bannerData, method) => {
  try {
    const config = {
      headers: {
        "Content-Type":
          bannerData instanceof FormData
            ? "multipart/form-data"
            : "application/json",
      },
    };
    const response = await axiosInstance({
      method: method,
      url: `superuser/banners/${id}/`,
      data: bannerData,
      ...config,
    });
    return response;
  } catch (error) {
    throw error;
  }
};


export const deleteBanner = async (id) => {
  try {
    await axiosInstance.delete(`superuser/banners/${id}/`);
  } catch (error) {
    throw error;
  }
}; 