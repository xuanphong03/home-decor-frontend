import { orderService } from "@/services/orderService";
import { Alert, Breadcrumbs } from "@mui/material";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UpdateStatus from "./UpdateStatus";
import { ORDER } from "@/constants/order-status";

export default function OrderDetail() {
  const params = useParams();
  const [alert, setAlert] = useState(null);
  const [orderDetail, setOrderDetail] = useState(null);
  const [openUpdateStatusForm, setOpenUpdateStatusForm] = useState(false);
  const getOrderDetail = async () => {
    try {
      const response = await orderService.getOrderDetail(params.id);
      setOrderDetail(response.data);
    } catch (error) {
      throw new Error("");
    }
  };
  const paymentDetail = useMemo(() => {
    const totalProductPrice = orderDetail?.products?.reduce(
      (total, { quantity, price }) => total + quantity * price,
      0
    );
    return {
      totalProductPrice,
    };
  }, [orderDetail]);

  const handleUpdateOrderStatus = async (data) => {
    try {
      const payload = {};
      payload.shippingStatus = data.shippingStatus;
      payload.paymentStatus = data.paymentStatus === "PAID" ? true : false;
      const response = await orderService.updateOrderStatus(params.id, payload);
      setOrderDetail(response.data);
      setAlert({
        type: "success",
        message: response.message,
      });
    } catch (error) {
      setAlert({
        type: "error",
        message: error.response.data.message,
      });
    } finally {
      setOpenUpdateStatusForm(false);
    }
  };

  useEffect(() => {
    getOrderDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  return (
    <>
      {openUpdateStatusForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute bg-black inset-0 bg-opacity-20"></div>
          <div className="relative">
            <UpdateStatus
              paymentStatus={orderDetail?.paymentStatus ? "PAID" : "UNPAID"}
              shippingStatus={orderDetail?.shippingStatus}
              onClose={() => setOpenUpdateStatusForm(false)}
              onSubmit={handleUpdateOrderStatus}
            />
          </div>
        </div>
      )}
      <div className="h-[45px] px-10 shadow w-full flex items-center">
        <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: "14px" }}>
          <Link to="/admin" className="hover:underline">
            Thống kê
          </Link>
          <Link to="/admin/orders" className="hover:underline">
            Danh sách đơn hàng
          </Link>
          <Link to="#" className="text-secondary">
            Chi tiết đơn hàng
          </Link>
        </Breadcrumbs>
      </div>
      {alert && (
        <div className="px-10 pt-5">
          <Alert severity={alert.type}>{alert.message}</Alert>
        </div>
      )}
      <div className="px-10 py-5">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[28px] font-medium">Chi tiết đơn hàng</h2>
          <button
            onClick={() => setOpenUpdateStatusForm(true)}
            className="text-[15px] bg-primary text-white font-medium px-4 py-1 hover:bg-opacity-80 transition-colors"
          >
            Cập nhật trạng thái
          </button>
        </div>
        <div className="mb-5">
          <h2 className="mb-2 font-bold">Thông tin đơn hàng</h2>
          <table className="w-full border border-solid border-gray-300 mb-5">
            <tbody>
              <tr>
                <th className="p-2 text-left border border-solid border-gray-300">
                  Tên người mua
                </th>
                <td className="p-2 text-left border border-solid border-gray-300">
                  {orderDetail?.user?.name}
                </td>
              </tr>
              <tr>
                <th className="p-2 text-left border border-solid border-gray-300">
                  Email
                </th>
                <td className="p-2 text-left border border-solid border-gray-300">
                  {orderDetail?.user?.email}
                </td>
              </tr>
              <tr>
                <th className="p-2 text-left border border-solid border-gray-300">
                  Địa chỉ
                </th>
                <td className="p-2 text-left border border-solid border-gray-300">
                  {orderDetail?.address}
                </td>
              </tr>
              <tr>
                <th className="p-2 text-left border border-solid border-gray-300">
                  Ngày đặt
                </th>
                <td className="p-2 text-left border border-solid border-gray-300">
                  {moment(orderDetail?.createdAt).format("DD/MM/YYYY")}
                </td>
              </tr>
              <tr>
                <th className="p-2 text-left border border-solid border-gray-300">
                  Phương thức thanh toán
                </th>
                <td className="p-2 text-left border border-solid border-gray-300">
                  {orderDetail?.paymentMethod?.name}
                </td>
              </tr>
              <tr>
                <th className="p-2 text-left border border-solid border-gray-300">
                  Thanh toán
                </th>
                <td className="p-2 text-left border border-solid border-gray-300">
                  {orderDetail?.paymentStatus
                    ? "Đã thanh toán"
                    : "Chưa thanh toán"}
                </td>
              </tr>
              <tr>
                <th className="p-2 text-left border border-solid border-gray-300">
                  Trạng thái
                </th>
                <td className="p-2 text-left border border-solid border-gray-300">
                  {orderDetail?.shippingStatus === ORDER.PENDING && (
                    <span>Chờ xác nhận</span>
                  )}
                  {orderDetail?.shippingStatus === ORDER.SHIPPING && (
                    <span>Đang vận chuyển</span>
                  )}
                  {orderDetail?.shippingStatus === ORDER.RECEIVED && (
                    <span>Đã nhận hàng</span>
                  )}
                  {orderDetail?.shippingStatus === ORDER.CANCELED && (
                    <span>Đã hủy</span>
                  )}
                </td>
              </tr>
              <tr>
                <th className="p-2 text-left border border-solid border-gray-300">
                  Tổng hóa đơn
                </th>
                <td className="p-2 text-left border border-solid border-gray-300">
                  {orderDetail?.totalPrice?.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-5">
          <h2 className="mb-2 font-bold">Sản phẩm</h2>
          <table className="w-full border border-solid border-gray-300 mb-5">
            <thead>
              <tr>
                <th className="p-2 text-left border border-solid border-gray-300">
                  Tên sản phẩm
                </th>
                <th className="p-2 text-center border border-solid border-gray-300">
                  Đơn giá
                </th>
                <th className="p-2 text-center border border-solid border-gray-300">
                  Số lượng
                </th>
                <th className="p-2 text-center border border-solid border-gray-300">
                  Tổng
                </th>
              </tr>
            </thead>
            <tbody>
              {orderDetail?.products?.map(({ product, price, quantity }) => (
                <tr key={product.id}>
                  <td className="p-2 border border-solid border-gray-300">
                    {product?.name}
                  </td>
                  <td className="p-2 text-center border border-solid border-gray-300">
                    {price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                  <td className="p-2 text-center border border-solid border-gray-300">
                    {quantity}
                  </td>
                  <td className="p-2 text-center border border-solid border-gray-300">
                    {(quantity * price).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th
                  colSpan={3}
                  className="p-2 border border-solid border-gray-300"
                >
                  Tổng tiền
                </th>
                <th className="p-2 text-center border border-solid border-gray-300">
                  {paymentDetail?.totalProductPrice?.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
}
