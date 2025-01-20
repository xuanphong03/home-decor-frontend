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

  create(data) {
    const url = `/roles`;
    return axiosClient.post(url, data);
  },

  update(id, data) {
    const url = `/roles/${id}`;
    return axiosClient.patch(url, data);
  },

  remove(id) {
    const url = `/roles/${id}`;
    return axiosClient.delete(url);
  },
};
