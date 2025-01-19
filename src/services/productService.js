import axiosClient from "./axiosClient";

export const productService = {
  getDetail(productId) {
    const url = `/products/${productId}`;
    return axiosClient.get(url);
  },
  getAll(params) {
    const url = `/products`;
    return axiosClient.get(url, { params });
  },
  update(id, payload) {
    const url = `/products/${id}`;
    return axiosClient.patch(url, payload);
  },
  create(payload) {
    const url = `/products`;
    return axiosClient.post(url, payload);
  },
  getRelated(params) {
    const url = `/products/recommend`;
    return axiosClient.get(url, { params });
  },
};
