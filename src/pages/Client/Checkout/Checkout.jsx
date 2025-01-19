import LoadingModal from "@/components/Loading/LoadingModal";
import { paymentMethodService } from "@/services/paymentMethodService";
import { profileService } from "@/services/profileService";
import { yupResolver } from "@hookform/resolvers/yup";
import HomeIcon from "@mui/icons-material/Home";
import { Alert, Breadcrumbs, Typography } from "@mui/material";
import { useContext, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as yup from "yup";
import TextareaField from "./components/form-controls/TextareaField";
import { cartService } from "@/services/cartService";
import { AppContext } from "@/App";
import { orderService } from "@/services/orderService";

// Yup schema
const schema = yup.object({
  note: yup.string(),
  paymentMethodId: yup
    .number()
    .required("Vui lòng chọn phương thức thanh toán"),
  addressId: yup
    .number()
    .required("Vui lòng chọn địa chỉ giao hàng")
    .notOneOf([0], "Vui lòng chọn địa chỉ giao hàng"),
});

export default function Checkout() {
  const { cartItems } = useContext(AppContext);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [paymentMethodList, setPaymentMethodList] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      addressId: paymentInfo?.address[0]?.id || 0,
      note: "",
      paymentMethodId: 0,
    },
  });
  const paymentMethodId = watch("paymentMethodId");
  const [alert, setAlert] = useState(null);
  const { setCartItems } = useContext(AppContext);
  const navigate = useNavigate();
  const paymentDetails = useMemo(() => {
    const totalPrice = cartItems.reduce(
      (payment, { product, quantity }) =>
        payment + product.finalPrice * quantity,
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
  }, [cartItems]);

  const getProfile = async () => {
    try {
      const response = await profileService.getProfile();
      setPaymentInfo(response.data);
    } catch (error) {
      throw new Error("Get profile to failed");
    }
  };
  const handleCreateOrder = async (data) => {
    try {
      const products = cartItems.map(({ product, quantity }) => ({
        id: product.id,
        quantity,
      }));
      await cartService.checkoutCartItem();
      const createData = {
        ...data,
        discountPrice: paymentDetails.discountPrice,
        shippingPrice: paymentDetails.shippingPrice,
        products: products,
      };
      const response = await orderService.userCreate(createData);
      setCartItems([]);
      if (response.key) {
        navigate(
          `/checkout/order-received/${response.data.id}?key=${response.key}`
        );
      }
    } catch (error) {
      setAlert({ type: "error", message: error.response.data.message });
    }
  };

  useEffect(() => {
    (async () => {
      const response = await paymentMethodService.getAll({ status: true });
      const methodList = response.data;
      setPaymentMethodList(methodList);
      setValue("paymentMethodId", methodList[0].id);
    })();
  }, [setValue]);

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (paymentInfo) {
      setValue("addressId", paymentInfo.address[0]?.id || 0);
    }
  }, [paymentInfo, setValue]);

  return cartItems.length > 0 ? (
    <>
      {isSubmitting && <LoadingModal />}
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
      <section className="py-[60px] mx-auto max-w-[1300px] px-5 font-roboto">
        {alert && (
          <Alert severity={alert.type} className="mb-4">
            {alert.message}
            <Link to="/cart" className="ml-2 text-primary underline">
              Quay lại giỏ hàng
            </Link>
          </Alert>
        )}
        <form
          onSubmit={handleSubmit(handleCreateOrder)}
          className="w-full grid grid-cols-12 gap-x-[30px]"
        >
          <div className="col-span-6 flex flex-col gap-[15px]">
            <div>
              <h2 className="text-[32px] font-bold mb-[15px]">
                Chi tiết thanh toán
              </h2>
              <div>
                <div className="mb-5 text-sm">
                  <label
                    htmlFor="fullName"
                    className="inline-block mb-[6px] text-[#777777] text-[15px]"
                  >
                    Họ và tên <span className="text-red-500 font-bold">*</span>
                  </label>
                  <div className="overflow-hidden border border-solid border-gray-200 rounded">
                    <input
                      id="fullName"
                      type="text"
                      defaultValue={paymentInfo?.name}
                      className="px-4 py-2 w-full outline-none"
                      disabled={true}
                    />
                  </div>
                </div>
                <div className="mb-5 text-sm">
                  <label
                    htmlFor="payment_method"
                    className="inline-block mb-[6px] text-[#777777] text-[15px]"
                  >
                    Địa chỉ giao hàng{" "}
                    <span className="text-red-500 font-bold">*</span>
                  </label>
                  <div className="overflow-hidden border border-solid border-gray-200 rounded">
                    <Controller
                      name="addressId"
                      control={control}
                      render={({ field }) => (
                        <select
                          id="payment_method"
                          className="px-4 py-2 w-full outline-none"
                          {...field}
                        >
                          <option disabled value={0}>
                            ---Chọn địa chỉ giao hàng---
                          </option>
                          {paymentInfo?.address.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.streetName}, {item.districtName},{" "}
                              {item.provinceName}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                  </div>
                  {errors?.addressId && (
                    <p className="px-2 mt-1 text-red-500 text-sm">
                      {errors?.addressId?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-[32px] font-bold mb-[15px]">
                Thông tin bổ sung
              </h2>
              <div>
                <div className="mb-5 text-sm">
                  <TextareaField
                    id="note"
                    name="note"
                    label="Ghi chú đơn hàng (không bắt buộc)"
                    placeholder="Nhập họ và tên..."
                    control={control}
                    errors={errors}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-6">
            <h2 className="text-[32px] font-bold mb-[15px]">
              Đơn hàng của bạn
            </h2>
            <div className="text-secondary">
              <div className="px-[30px] border border-solid border-gray-200">
                <table className="w-full">
                  <tbody>
                    <tr className="text-base border-b border-solid border-gray-200">
                      <th className="font-semibold pr-[10px] py-[15px] text-left">
                        Sản phẩm
                      </th>
                      <th className="font-semibold pr-[10px] py-[15px] text-right">
                        Giá
                      </th>
                    </tr>
                    {cartItems.map(({ id, product, quantity }) => (
                      <tr
                        key={id}
                        className="text-sm text-[#777777] border-b border-solid border-gray-200"
                      >
                        <td className="pr-[10px] py-[15px] text-left">
                          {product.name} x {quantity}
                        </td>
                        <td className="pr-[10px] py-[15px] text-right">
                          {(quantity * product.finalPrice).toLocaleString(
                            "vi-VN",
                            {
                              style: "currency",
                              currency: "VND",
                            }
                          )}
                        </td>
                      </tr>
                    ))}
                    <tr className="text-base border-b border-solid border-gray-200">
                      <th className="font-semibold pr-[10px] py-[15px] text-left">
                        Tổng giá
                      </th>
                      <td className="pr-[10px] py-[15px] text-right">
                        {paymentDetails.totalPrice.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </td>
                    </tr>
                    <tr className="text-base border-b border-solid border-gray-200">
                      <th className="font-semibold pr-[10px] py-[15px] text-left">
                        Phí vận chuyển
                      </th>
                      <td className="pr-[10px] py-[15px] text-right">
                        {paymentDetails.shippingPrice.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </td>
                    </tr>
                    <tr className="text-base border-b border-solid border-gray-200">
                      <th className="font-semibold pr-[10px] py-[15px] text-left">
                        Giảm giá
                      </th>
                      <td className="pr-[10px] py-[15px] text-right">
                        {paymentDetails.discountPrice.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </td>
                    </tr>
                    <tr className="text-base">
                      <th className="font-semibold pr-[10px] py-[15px] text-left">
                        Tổng giá trị đơn hàng
                      </th>
                      <td className="pr-[10px] py-[15px] text-right">
                        {paymentDetails.totalPayment.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                id="payment_methods"
                className="px-[30px] py-[15px] border-x border-solid border-gray-200"
              >
                <h3 className="font-bold">Phương thức thanh toán</h3>
                <div className="mt-3">
                  {paymentMethodList.map((paymentMethod) => (
                    <label
                      key={paymentMethod.id}
                      className="flex items-center gap-2 w-full cursor-pointer mb-1"
                    >
                      <input
                        type="radio"
                        value={paymentMethod.id}
                        checked={Number(paymentMethodId) === paymentMethod.id}
                        {...register("paymentMethodId")}
                      />
                      <span>{paymentMethod.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="bg-secondary px-10 py-[15px] text-white hover:bg-primary transition-all w-full uppercase"
              >
                Đặt hàng ngay
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  ) : (
    <Navigate to="/cart" />
  );
}
