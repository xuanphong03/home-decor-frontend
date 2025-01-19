import axiosClient from "./axiosClient";

export const cartService = {
  getCartItemsByUser() {
    const url = `/cart`;
    return axiosClient.get(url);
  },
  removeProductByUser(productId) {
    const url = `/cart/${productId}/product`;
    return axiosClient.delete(url);
  },
  addToCart(payload) {
    const url = `/cart`;
    return axiosClient.post(url, payload);
  },
  updateCart(payload) {
    const url = `/cart`;
    return axiosClient.patch(url, payload);
  },
  checkoutCartItem() {
    const url = `/cart/checkout`;
    return axiosClient.get(url);
  },
};
