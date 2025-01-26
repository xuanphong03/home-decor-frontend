import axiosClient from "./axiosClient";

export const userService = {
  getActiveCode(params) {
    const url = "/auth/active";
    return axiosClient.get(url, { params });
  },
  verifyActiveCode(payload) {
    const url = "/auth/active";
    return axiosClient.post(url, payload);
  },
  getAllUsers(params) {
    const url = "/admin/users";
    return axiosClient.get(url, { params });
  },
  getUserDetail(id) {
    const url = `/admin/users/${id}`;
    return axiosClient.get(url);
  },

  updatePermissionsOnUser(userId, permissionsOnUser) {
    const url = `/admin/users/${userId}/permissions`;
    return axiosClient.put(url, permissionsOnUser);
  },

  updateRolesOnUser(userId, rolesOnUsr) {
    const url = `/admin/users/${userId}/roles`;
    return axiosClient.put(url, rolesOnUsr);
  },

  updateUserById(userId, data) {
    const url = `admin/users/${userId}/user`;
    return axiosClient.patch(url, data);
  },

  contactAdmin(data) {
    const url = `/contact`;
    return axiosClient.post(url, data);
  },
};
