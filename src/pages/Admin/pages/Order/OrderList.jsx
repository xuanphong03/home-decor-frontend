import { AppContext } from "@/App";
import LoadingModal from "@/components/Loading/LoadingModal";
import { ORDER_STATUS } from "@/constants/order-status";
import { orderService } from "@/services/orderService";
import { Breadcrumbs, Pagination } from "@mui/material";
import queryString from "query-string";
import { useContext, useEffect, useMemo, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import OrderItem from "./components/OrderItem";

export default function OrderList() {
  const location = useLocation();
  const navigate = useNavigate();
  const { permissions } = useContext(AppContext);

  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 10,
      q: params.q || "",
    };
  }, [location.search]);

  const [loading, setLoading] = useState(true);
  const [orderList, setOrderList] = useState([]);
  const [searchTerm, setSearchTerm] = useState(queryParams.q || "");
  const [pagination, setPagination] = useState({
    _limit: queryParams._limit,
    _page: queryParams._page,
    _total: 100,
  });

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await orderService.getAllOrders(queryParams);
      const { orders, total, currentPage } = response.data;
      setTimeout(() => {
        setOrderList(orders);
        setPagination((prev) => ({
          ...prev,
          _total: total,
          _page: currentPage,
        }));
        setLoading(false);
      }, 500);
    } catch (error) {
      throw new Error("Get product list to failed");
    }
  };

  const handlePageChange = (e, page) => {
    const filters = {
      ...queryParams,
      _page: page,
    };
    setPagination((prev) => ({ ...prev, _page: page }));
    navigate(location.pathname + `?${queryString.stringify(filters)}`);
  };

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

  const handleSearchProduct = (e) => {
    e.preventDefault();
    const filters = {
      ...queryParams,
      q: searchTerm,
    };
    if (!searchTerm) {
      delete filters.q;
    }
    navigate(location.pathname + `?${queryString.stringify(filters)}`);
  };

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  return (
    <>
      {loading && <LoadingModal />}
      <div className="h-[45px] px-10 shadow w-full flex items-center">
        <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: "14px" }}>
          <Link to="/admin" className="hover:underline">
            Thống kê
          </Link>
          <Link to="/admin/orders" className="text-secondary">
            Danh sách đơn hàng
          </Link>
        </Breadcrumbs>
      </div>
      <div className="px-10 py-5">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[28px] font-medium">Danh sách đơn hàng</h2>
          {permissions?.includes("products.create") && (
            <Link
              to={location.pathname + "/create"}
              className="text-[15px] bg-primary text-white font-medium px-4 py-1 hover:bg-opacity-80 transition-colors"
            >
              Thêm sản phẩm
            </Link>
          )}
        </div>
        <table className="w-full text-sm bg-white border border-solid border-gray-200 rounded overflow-hidden shadow">
          <thead>
            <tr className="px-4 border-y border-solid border-gray-200">
              <td colSpan={5} className="py-4 px-2">
                <form className="relative" onSubmit={handleSearchProduct}>
                  <input
                    id="productName"
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                    placeholder="Nhập email người dùng để tìm kiếm..."
                    className="outline-none text-sm py-[6px] pl-9 pr-3 border border-solid border-gray-200 w-full"
                  />
                  <label
                    htmlFor="productName"
                    className="absolute top-1/2 left-5 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  >
                    <IoSearchOutline className="text-gray-500" />
                  </label>
                  <button
                    type="submit"
                    className={`absolute top-0 bottom-0 right-0 px-7 text-white transition-all bg-blue-500 cursor-pointer hover:bg-opacity-80`}
                  >
                    Tìm kiếm
                  </button>
                </form>
              </td>
              <td colSpan={3} className="py-4 px-2">
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
              </td>
            </tr>
            <tr className="px-4 border-y border-solid border-gray-200 bg-[#f2f2f2]">
              <th scope="col" className="p-4 text-center">
                Mã đơn hàng
              </th>
              <th scope="col" className="p-4 text-center">
                Ngày tạo
              </th>
              <th scope="col" className="p-4 text-center">
                Thanh toán
              </th>
              <th scope="col" className="p-4 text-center">
                Vận chuyển
              </th>
              <th scope="col" className="p-4 text-center">
                Tổng
              </th>
              <th scope="col" className="p-4 text-right w-44"></th>
            </tr>
          </thead>
          <tbody>
            {!loading && !orderList.length && (
              <tr className="px-4 border-y border-solid border-gray-200">
                <td colSpan={7} className="p-4 text-center">
                  Không có đơn hàng nào
                </td>
              </tr>
            )}
            {orderList.map((order) => (
              <OrderItem key={order.id} order={order} />
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
      </div>
    </>
  );
}
