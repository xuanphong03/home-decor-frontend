import { ORDER } from "@/constants/order-status";
import { generateOrderCode } from "@/utils/clientUtils";
import moment from "moment";
import { Link, useLocation } from "react-router-dom";

export default function OrderItem({ order }) {
  const location = useLocation();

  return (
    <tr key={order?.id} className="px-4 border-y border-solid border-gray-200">
      <td className="p-4 text-center">
        <Link
          to={`${location.pathname}/${order.id}`}
          className="text-blue-500 underline"
        >
          {generateOrderCode(order.id)}
        </Link>
      </td>
      <td className="p-4 text-center">
        {moment(order.createdAt).format("DD/MM/YYYY")}
      </td>
      <td className="p-4 text-center">
        {order.paymentStatus ? (
          <span>Đã thanh toán</span>
        ) : (
          <span>Chưa thanh toán</span>
        )}
      </td>
      <td className="p-4 text-center">
        {order.shippingStatus === ORDER.PENDING && <span>Chờ xác nhận</span>}
        {order.shippingStatus === ORDER.SHIPPING && (
          <span>Đang vận chuyển</span>
        )}
        {order.shippingStatus === ORDER.RECEIVED && <span>Đã nhận hàng</span>}
        {order.shippingStatus === ORDER.CANCELED && <span>Đã hủy</span>}
      </td>
      <td className="p-4 text-center">
        {order?.totalPrice?.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}
      </td>
      <td className="p-4 text-center">
        <Link
          to={`${location.pathname}/${order.id}`}
          className="underline text-blue-500"
        >
          Chi tiết
        </Link>
      </td>
    </tr>
  );
}
