import axiosClient from "./axiosClient";

export const paymentMethodService = {
  getAll(params) {
    const url = `/payment-methods`;
    return axiosClient.get(url, { params });
  },
  create(payload) {
    const url = `/payment-methods`;
    return axiosClient.post(url, payload);
  },
  update(id, payload) {
    const url = `/payment-methods/${id}`;
    return axiosClient.patch(url, payload);
  },
  remove(id) {
    const url = `/payment-methods/${id}`;
    return axiosClient.delete(url);
  },
};
