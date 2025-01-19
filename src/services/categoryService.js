import axiosClient from "./axiosClient";

export const categoryService = {
  getAll(params) {
    const url = `/categories`;
    return axiosClient.get(url, { params });
  },
  getDetail(id) {
    const url = `/categories/${id}`;
    return axiosClient.get(url);
  },
  createCategory(payload) {
    const url = `/categories`;
    return axiosClient.post(url, payload);
  },
  updateCategory(id, payload) {
    const url = `/categories/${id}`;
    return axiosClient.patch(url, payload);
  },
};
