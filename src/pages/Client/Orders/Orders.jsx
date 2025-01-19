import { useEffect, useMemo, useState } from "react";
import { Alert, Breadcrumbs, Pagination, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import HomeIcon from "@mui/icons-material/Home";
import { orderService } from "@/services/orderService";
import moment from "moment";
import OrderDetail from "./OrderDetail";
import { ORDER_STATUS } from "@/constants/order-status";
import queryString from "query-string";
import LoadingModal from "@/components/Loading/LoadingModal";

export default function Orders() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 10,
      q: params.q || "",
    };
  }, [location.search]);
  const [alert, setAlert] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderList, setOrderList] = useState([]);
  const [openOrderDetail, setOpenOrderDetail] = useState(false);
  const [orderDetail, setOrderDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    _limit: queryParams._limit,
    _page: queryParams._page,
    _total: 100,
  });

  const handleFilterByOrderStatus = (e) => {
    const shippingStatus = e.target.value;
    const filters = {
      ...queryParams,
      _page: 1,
      shippingStatus,
    };
    const pathname = location.pathname;
    navigate(`${pathname}?${queryString.stringify(filters)}`);
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const getPersonalOrders = async () => {
    try {
      setLoading(true);
      const response = await orderService.userGetAll(queryParams);
      const { orders, total, currentPage } = response.data;
      if (!orders.length && currentPage > 1) {
        handlePageChange(null, currentPage - 1);
      } else {
        setTimeout(() => {
          setOrderList(orders);
          setPagination((prev) => ({
            ...prev,
            _total: total,
            _page: currentPage,
          }));
          setLoading(false);
        }, 500);
      }
    } catch (error) {
      throw new Error("Get personal orders to failed");
    }
  };

  const handleOpenOrderDetail = async (orderId) => {
    try {
      const response = await orderService.userGetDetail(orderId);
      setOrderDetail(response.data);
      setOpenOrderDetail(true);
    } catch (error) {
      throw new Error("Get order detail to failed");
    }
  };

  const handleCloseOrderDetail = () => {
    setOrderDetail(null);
    setOpenOrderDetail(false);
  };

  const handlePageChange = (e, page) => {
    const filters = {
      ...queryParams,
      _page: page,
    };
    setPagination((prev) => ({ ...prev, _page: page }));
    navigate(location.pathname + `?${queryString.stringify(filters)}`);
  };

  const handleCancelOrder = async (orderId) => {
    try {
      if (confirm("Bạn chắc chắn muốn hủy đơn hàng này chứ?")) {
        const response = await orderService.userRemove(orderId);
        setAlert({ type: "success", message: response.message });
      }
    } catch (error) {
      setAlert({ type: "error", message: error.response.data.message });
    } finally {
      getPersonalOrders();
    }
  };

  useEffect(() => {
    getPersonalOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  return (
    <>
      {openOrderDetail && orderDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative">
            <OrderDetail
              orderDetail={orderDetail}
              onClose={handleCloseOrderDetail}
            />
          </div>
        </div>
      )}
      {loading && <LoadingModal />}
      <section className="py-[10px] mt-[90px] bg-[#FBFBFB] shadow-sm">
        <div className="max-w-full lg:max-w-[1300px] mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <h1 className="text-[26px] font-semibold text-[#323232]">
              Đơn hàng của tôi
            </h1>
            <Breadcrumbs aria-label="breadcrumb">
              <Link to={"/"} className="flex items-center">
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                <span className="text-sm">Trang chủ</span>
              </Link>
              <Typography
                sx={{
                  color: "text.primary",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "14px",
                }}
              >
                Đơn hàng
              </Typography>
            </Breadcrumbs>
          </div>
        </div>
      </section>

      <section className="pt-10 pb-[60px] mx-auto max-w-[1300px] px-5">
        {alert && (
          <Alert severity={alert.type} className="mb-5">
            {alert.message}
          </Alert>
        )}
        <div className="flex items-center justify-between gap-5 mb-2">
          <div className="text-[15px] flex items-center flex-1 relative pl-10 border border-solid border-gray-300">
            <span className="absolute top-1/2 left-5 -translate-x-1/2 -translate-y-1/2">
              <IoSearchOutline className="text-xl text-gray-500" />
            </span>
            <input
              value={searchTerm}
              onChange={handleSearchTermChange}
              placeholder="Nhập mã đơn hàng..."
              className="outline-none py-2 flex-1 rounded-sm"
            />
            <button className="text-white bg-blue-500 px-6 inline-block py-2">
              Tìm kiếm
            </button>
          </div>
          <div className="text-[#777777]">
            <select
              onChange={handleFilterByOrderStatus}
              className="text-[15px] outline-none w-60 border border-solid border-gray-200 px-4 py-2"
            >
              {ORDER_STATUS.map(({ id, status, name }) => (
                <option key={id} value={status}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <table className="text-[15px] w-full border border-solid border-gray-300">
          <thead className="border-y border-solid border-gray-300">
            <tr>
              <th className="p-4">Mã đơn hàng</th>
              <th className="p-4">Trạng thái giao hàng</th>
              <th className="p-4">Trạng thái thanh toán</th>
              <th className="p-4">Ngày đặt</th>
              <th className="p-4">Tổng giá</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((orderItem) => (
              <tr
                key={orderItem.id}
                className="border-y border-solid border-gray-300"
              >
                <td className="p-4 text-center">{orderItem.id}</td>
                <td className="p-4 text-center">
                  {orderItem.shippingStatus === "PENDING" && (
                    <span>Chờ xác nhận</span>
                  )}
                  {orderItem.shippingStatus === "SHIPPING" && (
                    <span>Đang vận chuyển</span>
                  )}
                  {orderItem.shippingStatus === "RECEIVED" && (
                    <span>Đã nhận hàng</span>
                  )}
                </td>
                <td className="p-4 text-center">
                  {orderItem.paymentMethod.name}
                </td>
                <td className="p-4 text-center">
                  {moment(orderItem.createdAt).format("DD/MM/YYYY hh:mm:ss a")}
                </td>
                <td className="p-4 text-center">
                  {orderItem.totalPrice.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </td>
                <td className="p-4 text-end text-white">
                  <button
                    onClick={() => handleOpenOrderDetail(orderItem.id)}
                    className="px-4 py-1 bg-green-500 rounded hover:bg-opacity-80"
                  >
                    Chi tiết
                  </button>
                  {orderItem.shippingStatus === "PENDING" ? (
                    <button
                      onClick={() => handleCancelOrder(orderItem.id)}
                      className="ml-2 px-4 py-1 bg-red-500 rounded hover:bg-opacity-80"
                    >
                      Hủy đơn
                    </button>
                  ) : (
                    <button className="ml-2 px-4 py-1 bg-gray-400 rounded cursor-not-allowed">
                      Hủy đơn
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={5} className="p-4">
                <Pagination
                  size="small"
                  variant="outlined"
                  shape="rounded"
                  page={pagination._page}
                  count={Math.ceil(pagination._total / pagination._limit)}
                  onChange={handlePageChange}
                />
              </td>
            </tr>
          </tfoot>
        </table>
      </section>
    </>
  );
}
