export const ORDER_STATUS = [
  { id: 0, status: "", name: "--Chọn trạng thái giao hàng---" },
  { id: 1, status: "PENDING", name: "Chờ xác nhận" },
  { id: 2, status: "SHIPPING", name: "Đang vận chuyển" },
  { id: 3, status: "RECEIVED", name: "Đã nhận hàng" },
  { id: 4, status: "CANCELED", name: "Đã hủy" },
];

export const ORDER = {
  PENDING: "PENDING",
  SHIPPING: "SHIPPING",
  RECEIVED: "RECEIVED",
  CANCELED: "CANCELED",
};
