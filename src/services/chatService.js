import axiosClient from "./axiosClient";

export const chatService = {
  getMessages(params) {
    const url = `/chat/messages`;
    return axiosClient.get(url, { params });
  },
  getReceivers() {
    const url = `/chat/conversations`;
    return axiosClient.get(url);
  },
};
