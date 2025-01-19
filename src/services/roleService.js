import axiosClient from "./axiosClient";

export const roleService = {
  getAll() {
    const url = `/roles`;
    return axiosClient.get(url);
  },
  getAllByUser() {
    const url = `/admin/users/roles`;
    return axiosClient.get(url);
  },
};
