import { storage_keys } from "@/constants/storage-keys";
import axios from "axios";
import { authService } from "./authService";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const authRoutes = ["/auth/register", "/auth/login", "/auth/refreshToken"];
    const accessToken = localStorage.getItem(storage_keys.ACCESS_TOKEN);
    const refreshToken = localStorage.getItem(storage_keys.REFRESH_TOKEN);
    if (accessToken && authRoutes.every((route) => route !== config.url)) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    } else if (refreshToken && config.url.includes("/auth/refreshToken")) {
      config.headers["Authorization"] = `Bearer ${refreshToken}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (cb) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token) => {
  refreshSubscribers.map((cb) => cb(token));
  refreshSubscribers = [];
};

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
  },
  async function (error) {
    const { config, response } = error;
    const originalRequest = config;

    if (response?.status === 401 && config.url === "/auth/refreshToken") {
      localStorage.removeItem(storage_keys.PROFILE);
      localStorage.removeItem(storage_keys.ACCESS_TOKEN);
      localStorage.removeItem(storage_keys.REFRESH_TOKEN);
      location.reload();
    } else if (response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // Nếu chưa refresh token thì thực hiện call api refresh token
      // (Tránh tình trạng nhiều api failed phải call refresh token nhiều lần)
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const res = await authService.refreshToken();
          const { accessToken } = res.data;
          localStorage.setItem(storage_keys.ACCESS_TOKEN, accessToken);
          // Cập nhật các request đang chờ
          onRefreshed(accessToken);
          isRefreshing = false;
        } catch (refreshError) {
          isRefreshing = false;
          return Promise.reject(refreshError);
        }
      }
      // Đợi refresh token thành công trước khi tiếp tục các request đang chờ
      return new Promise((resolve) => {
        subscribeTokenRefresh((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(axiosClient(originalRequest));
        });
      });
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;
