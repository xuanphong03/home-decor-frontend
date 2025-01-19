import axiosClient from "./axiosClient";

export const authService = {
  register(payload) {
    const url = "/auth/register";
    return axiosClient.post(url, payload);
  },
  login(payload) {
    const url = "/auth/login";
    return axiosClient.post(url, payload);
  },
  logout() {
    const url = "/logout";
    return axiosClient.get(url);
  },
  profile() {
    const url = "/auth/profile";
    return axiosClient.get(url);
  },
  refreshToken() {
    const url = "/auth/refreshToken";
    return axiosClient.post(url);
  },
  forgotPassword(params) {
    const url = "/auth/forgot-password";
    return axiosClient.get(url, { params });
  },
  verifyAccount(body) {
    const url = "/auth/forgot-password";
    return axiosClient.post(url, body);
  },
  resetPassword(body) {
    const url = "/auth/reset-password";
    return axiosClient.patch(url, body);
  },
  updateProfile(body) {
    const url = "/auth/profile";
    return axiosClient.patch(url, body);
  },
  changePassword(body) {
    const url = "/auth/change-password";
    return axiosClient.patch(url, body);
  },
};
