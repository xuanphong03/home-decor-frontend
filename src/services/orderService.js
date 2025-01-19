import axiosClient from "./axiosClient";

export const orderService = {
  getAllByUser(params) {
    const url = `/orders/personal-orders`;
    return axiosClient.get(url, { params });
  },
  getDetailByUser(id) {
    const url = `/orders/${id}/personal-orders`;
    return axiosClient.get(url);
  },
  createOrderByUser(payload) {
    const url = `/orders`;
    return axiosClient.post(url, payload);
  },
  getResult(id, params) {
    const url = `/orders/order-received/${id}`;
    return axiosClient.get(url, { params });
  },
  getAllOrders(params) {
    const url = `/orders`;
    return axiosClient.get(url, { params });
  },
  getOrderDetail(id) {
    const url = `/orders/${id}`;
    return axiosClient.get(url);
  },
  updateOrderStatus(id, data) {
    const url = `/orders/${id}`;
    return axiosClient.patch(url, data);
  },

  // Update
  userCreate(data) {
    const url = `/user/orders`;
    return axiosClient.post(url, data);
  },
  userGetAll(params) {
    const url = `/user/orders`;
    return axiosClient.get(url, { params });
  },
  userRemove(id) {
    const url = `/user/orders/${id}`;
    return axiosClient.delete(url);
  },
  userGetDetail(id) {
    const url = `/user/orders/${id}`;
    return axiosClient.get(url);
  },
};
