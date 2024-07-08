import axios from "axios";
import {store} from "../../src/redux/store";
import {setUser, clearUser} from "../../src/redux/userSlice";
import createAuthRefreshInterceptor from "axios-auth-refresh";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Refresh token function
const refreshAuthLogic = async (failedRequest) => {
  const state = store.getState();
  const refreshToken = state.user.refreshToken;

  console.log('entered in to refresh token logic')

  if (!refreshToken) {
    store.dispatch(clearUser());
    window.location.href = "/session-expired";
    return Promise.reject("No refresh token");
  }

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

    // Update the header with the new token
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${newAccessToken}`;
    failedRequest.response.config.headers[
      "Authorization"
    ] = `Bearer ${newAccessToken}`;

    return Promise.resolve();
  } catch (error) {
    store.dispatch(clearUser());
    window.location.href = "/session-expired";
    return Promise.reject(error);
  }
};

// Create an auth refresh interceptor
createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic);

axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const accessToken = state.user.accessToken;

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
