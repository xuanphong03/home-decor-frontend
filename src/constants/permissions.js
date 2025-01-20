export const PERMISSIONS = [
  {
    name: "Phân quyền",
    permissions: [
      { name: "Xem", permission: "permissions.read" },
      { name: "Thêm", permission: "permissions.create" },
      { name: "Sửa", permission: "permissions.update" },
      { name: "Xóa", permission: "permissions.delete" },
      { name: "Gán quyền cho người dùng", permission: "permissions.assign" },
    ],
  },
  {
    name: "Vai trò",
    permissions: [
      { name: "Xem", permission: "roles.read" },
      { name: "Thêm", permission: "roles.create" },
      { name: "Sửa", permission: "roles.update" },
      { name: "Xóa", permission: "roles.delete" },
      { name: "Gán vai trò cho người dùng", permission: "roles.assign" },
    ],
  },
  {
    name: "Danh mục",
    permissions: [
      { name: "Xem", permission: "categories.read" },
      { name: "Thêm", permission: "categories.create" },
      { name: "Sửa", permission: "categories.update" },
      { name: "Xóa", permission: "categories.delete" },
    ],
  },
  {
    name: "Sản phẩm",
    permissions: [
      { name: "Xem", permission: "products.read" },
      { name: "Thêm", permission: "products.create" },
      { name: "Sửa", permission: "products.update" },
      { name: "Xóa", permission: "products.delete" },
    ],
  },
  {
    name: "Đơn hàng",
    permissions: [
      { name: "Xem", permission: "orders.read" },
      { name: "Thêm", permission: "orders.create" },
      { name: "Sửa", permission: "orders.update" },
      { name: "Xóa", permission: "orders.delete" },
    ],
  },
  {
    name: "Người dùng",
    permissions: [
      { name: "Xem", permission: "users.read" },
      { name: "Thêm", permission: "users.create" },
      { name: "Sửa", permission: "users.update" },
      { name: "Xóa", permission: "users.delete" },
    ],
  },
];
