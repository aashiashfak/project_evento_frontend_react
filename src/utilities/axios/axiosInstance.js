import axios from "axios";
import { store } from "../../redux/store";
import {setUser, clearUser} from "../../redux/userSlice"; 
import { clearWishListItems } from "../../redux/WishListSlice";


const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const state = store.getState();
    const accessToken = state.user.accessToken;

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const state = store.getState();
    const refreshToken = state.user.refreshToken;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (refreshToken) {
        try {
          const response = await axiosInstance.post("api/token/refresh/", {
            refresh: refreshToken,
          });

          const newAccessToken = response.data.access;
          store.dispatch(
            setUser({
              username: state.user.username,
              accessToken: newAccessToken,
              refreshToken,
            })
          );

          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newAccessToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          store.dispatch(clearUser());
          store.dispatch(clearWishListItems())
          window.location.href = "/session-expired"; 
        }
      } else {
        store.dispatch(clearUser());
        store.dispatch(clearWishListItems());
        window.location.href = "/session-expired"; 
        
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
