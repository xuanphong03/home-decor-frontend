import axiosClient from "./axiosClient";

export const permissionService = {
  getAll() {
    const url = `/permissions/user`;
    return axiosClient.get(url);
  },
};
