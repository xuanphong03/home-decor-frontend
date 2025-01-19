import axiosClient from "./axiosClient";

export const profileService = {
  getProfile() {
    const url = "/profile";
    return axiosClient.get(url);
  },
  updateProfile(data) {
    const url = "/profile";
    return axiosClient.patch(url, data);
  },
  deleteAddress(params) {
    const url = "/profile/address";
    return axiosClient.delete(url, { params });
  },
};
