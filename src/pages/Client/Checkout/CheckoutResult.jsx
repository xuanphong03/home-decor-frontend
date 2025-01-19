import { Breadcrumbs, Typography } from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import {
  MdAttachMoney,
  MdNumbers,
  MdOutlineLocalShipping,
} from "react-icons/md";
import { FaRegCalendar } from "react-icons/fa";
import { useEffect, useMemo, useState } from "react";
import queryString from "query-string";
import { orderService } from "@/services/orderService";
import moment from "moment";

export default function CheckoutResult() {
  const params = useParams();
  const location = useLocation();
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
    };
  }, [location.search]);
  const [orderDetail, setOrderDetail] = useState(null);

  const paymentDetails = useMemo(() => {
    const totalPrice = orderDetail?.products?.reduce(
      (payment, { price, quantity }) => payment + price * quantity,
      0
    );
    const shippingPrice = totalPrice < 1000000 ? 100000 : 0;
    const discountPrice = 0;
    const totalPayment = totalPrice + shippingPrice - discountPrice;
    return {
      totalPrice,
      shippingPrice,
      discountPrice,
      totalPayment,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderDetail]);

  const getResultOrder = async () => {
    try {
      const response = await orderService.getResult(params.id, queryParams);
      setOrderDetail(response.data);
    } catch (error) {
      throw new Error("error");
    }
  };
  useEffect(() => {
    getResultOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, params.id]);
  return (
    <>
      <section className="py-[10px] mt-[90px] bg-[#FBFBFB] shadow-sm">
        <div className="max-w-full lg:max-w-[1300px] mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <h1 className="text-[26px] font-semibold text-[#323232]">
              Thanh toán
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
                Thanh toán
              </Typography>
            </Breadcrumbs>
          </div>
        </div>
      </section>
      <section className="py-[50px] mx-auto max-w-[1300px] px-5">
        <h1 className="px-4 py-5 bg-[#d4fecc] text-[#2a851c] text-center border border-solid border-green-700 mb-[30px] text-xl">
          Cảm ơn. Đơn đặt hàng của bạn đã được tiếp nhận.
        </h1>
        {orderDetail && (
          <>
            <ul className="p-[30px] mb-[30px] border border-solid border-gray-300 grid grid-cols-4">
              <li className="flex items-center gap-2 col-span-1">
                <span className="text-4xl text-gray-500">
                  <MdNumbers />
                </span>
                <div>
                  <h5 className="text-xs uppercase">Mã đơn hàng</h5>
                  <span className="font-bold">{orderDetail?.id}</span>
                </div>
              </li>
              <li className="flex items-center gap-2 col-span-1">
                <span className="text-4xl text-gray-500">
                  <FaRegCalendar />
                </span>
                <div>
                  <h5 className="text-xs uppercase">Ngày đặt hàng</h5>
                  <span className="font-bold">
                    {moment(orderDetail?.createdAt).format("DD/MM/YYYY")}
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-2 col-span-1">
                <span className="text-4xl text-gray-500">
                  <MdAttachMoney />
                </span>
                <div>
                  <h5 className="text-xs uppercase">Tổng giá</h5>
                  <span className="font-bold">
                    {orderDetail?.totalPrice.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </div>
              </li>

              <li className="flex items-center gap-2 col-span-1">
                <span className="text-4xl text-gray-500">
                  <MdOutlineLocalShipping />
                </span>
                <div>
                  <h5 className="text-xs uppercase">Phương thức thanh toán</h5>
                  <span className="font-bold">
                    {orderDetail?.paymentMethod?.name}
                  </span>
                </div>
              </li>
            </ul>
            <h2 className="border border-solid border-gray-300 p-4 bg-[#f5f5f5] text-xl text-secondary font-bold">
              Chi tiết đơn hàng
            </h2>
            <table className="text-[15px] w-full border border-solid border-gray-300">
              <thead>
                <tr>
                  <th className="p-4 text-left border border-solid border-gray-300">
                    Sản phẩm
                  </th>
                  <th className="p-4 text-right border border-solid border-gray-300">
                    Tổng cộng
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderDetail?.products?.map(
                  ({ id, price, quantity, product }) => (
                    <tr key={id}>
                      <td className="p-4 border border-solid border-gray-300 text-left">
                        <h4 className="flex gap-2">
                          <Link
                            to={`#`}
                            className="text-gray-600 hover:text-primary transition-colors"
                          >
                            {product?.name}
                          </Link>
                          <span className="text-secondary">× 1</span>
                        </h4>
                      </td>
                      <td className="p-4 border border-solid border-gray-300 text-right">
                        <span>
                          {(price * quantity).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </span>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
              <tfoot>
                <tr>
                  <th className="p-4 border border-solid border-gray-300 text-left">
                    Tổng phụ
                  </th>
                  <td className="p-4 border border-solid border-gray-300 text-right font-bold">
                    {paymentDetails.totalPrice.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                </tr>
                <tr>
                  <th className="p-4 border border-solid border-gray-300 text-left">
                    Phí vận chuyển
                  </th>
                  <td className="p-4 border border-solid border-gray-300 text-right font-bold">
                    {paymentDetails.shippingPrice.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                </tr>
                <tr>
                  <th className="p-4 border border-solid border-gray-300 text-left">
                    Giảm giá
                  </th>
                  <td className="p-4 border border-solid border-gray-300 text-right font-bold">
                    {paymentDetails.discountPrice.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                </tr>
                <tr>
                  <th className="p-4 border border-solid border-gray-300 text-left">
                    Tổng hóa đơn
                  </th>
                  <td className="p-4 border border-solid border-gray-300 text-right font-bold">
                    {paymentDetails.totalPayment.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                </tr>
              </tfoot>
            </table>
          </>
        )}
      </section>
    </>
  );
}
