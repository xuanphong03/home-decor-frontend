import axiosClient from "./axiosClient";

export const userService = {
  getActiveCode(params) {
    const url = "/auth/active";
    return axiosClient.get(url, { params });
  },
  verifyActiveCode(payload) {
    const url = "/auth/active";
    return axiosClient.post(url, payload);
  },
  getAllUsers(params) {
    const url = "/admin/users";
    return axiosClient.get(url, { params });
  },
  getUserDetail(id) {
    const url = `/admin/users/${id}`;
    return axiosClient.get(url);
  },
};
