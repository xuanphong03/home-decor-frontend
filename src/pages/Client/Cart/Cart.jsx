import { useContext, useEffect, useMemo, useState } from "react";
import { Alert, Breadcrumbs, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";
import HomeIcon from "@mui/icons-material/Home";
import { cloneDeep } from "lodash";
import { AppContext } from "@/App";
import { cartService } from "@/services/cartService";

export default function Cart() {
  const { cartItems, setCartItems } = useContext(AppContext);
  const [productList, setProductList] = useState([]);
  const [changedStatus, setChangedStatus] = useState(false);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const paymentDetails = useMemo(() => {
    const totalPrice = cartItems.reduce(
      (total, { quantity, product }) => total + product.finalPrice * quantity,
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

  const handleDecrement = (productId) => {
    setProductList((prevList) => {
      const nextList = cloneDeep(prevList);
      const targetProduct = nextList.find(
        (product) => product.productId === productId
      );
      if (targetProduct && targetProduct.quantity > 0) {
        targetProduct.quantity -= 1;
      }
      return nextList;
    });
    if (!changedStatus) setChangedStatus(true);
  };

  const handleIncrement = (productId) => {
    setProductList((prevList) => {
      const nextList = cloneDeep(prevList);
      const targetProduct = nextList.find(
        (product) => product.productId === productId
      );
      if (targetProduct) {
        targetProduct.quantity += 1;
      }
      return nextList;
    });
    if (!changedStatus) setChangedStatus(true);
  };

  const handleChangeQuantity = (e, productId) => {
    const newQuantity = Number(e.target.value);
    if (isNaN(newQuantity)) return;

    setProductList((prevList) => {
      const nextList = cloneDeep(prevList);
      const targetProduct = nextList.find(
        (product) => product.productId === productId
      );
      if (targetProduct) {
        targetProduct.quantity = newQuantity <= 9999 ? newQuantity : 9999;
      }
      return nextList;
    });
    if (!changedStatus) setChangedStatus(true);
  };

  const handleUpdateCart = async () => {
    try {
      if (!changedStatus) return;
      const updateData = productList.map((item) => ({
        id: item.productId,
        quantity: item.quantity,
      }));
      const response = await cartService.updateCart({
        items: updateData,
      });
      setCartItems(response.data.products);
      setAlert({
        type: "success",
        message: "Cập nhật giỏ hàng thành công.",
      });
    } catch (error) {
      setAlert({
        type: "error",
        message: error.response.data.message,
      });
    } finally {
      setChangedStatus(false);
    }
  };

  const handleRemoveProductInCart = async (productId) => {
    try {
      if (confirm("Bạn chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng chứ?")) {
        const response = await cartService.removeProductByUser(productId);
        setCartItems(response.data.products);
      }
    } catch (error) {
      throw new Error("Failed");
    }
  };

  const handleCheckoutCartItem = async () => {
    try {
      const response = await cartService.checkoutCartItem();
      if (response.success) {
        navigate("/checkout");
      }
    } catch (error) {
      setAlert({
        type: "error",
        message: error.response.data.message,
      });
    }
  };

  useEffect(() => {
    if (cartItems.length) {
      setProductList(cartItems);
    }
  }, [cartItems]);

  return (
    <>
      <section className="py-[10px] mt-[90px] bg-[#FBFBFB] shadow-sm">
        <div className="max-w-full lg:max-w-[1300px] mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <h1 className="text-[26px] font-semibold text-[#323232]">
              Giỏ hàng
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
                Giỏ hàng
              </Typography>
            </Breadcrumbs>
          </div>
        </div>
      </section>

      <section className="py-[60px] grid grid-cols-12 mx-auto max-w-[1300px] gap-x-5">
        {cartItems.length > 0 ? (
          <>
            <div className="col-span-8">
              {alert && (
                <Alert severity={alert.type} className="mb-5">
                  {alert.message}
                </Alert>
              )}

              <table className="w-full border border-solid border-gray-200">
                <thead className="border-b border-solid border-gray-200">
                  <tr className="h-[54px]">
                    <th className="px-[10px] py-[15px] text-start w-[10%]"></th>
                    <th className="px-[10px] py-[15px] text-start w-[20%]">
                      Sản phẩm
                    </th>
                    <th className="px-[10px] py-[15px] text-center w-[20%]">
                      Giá
                    </th>
                    <th className="px-[10px] py-[15px] text-center w-[20%]">
                      Số lượng
                    </th>
                    <th className="px-[10px] py-[15px] text-right w-[20%]">
                      Tổng
                    </th>
                    <th className="px-[10px] py-[15px] text-start w-[10%]"></th>
                  </tr>
                </thead>
                <tbody>
                  {productList.map(({ quantity, product }) => (
                    <tr
                      key={product.id}
                      className="relative border-b border-solid border-gray-200"
                    >
                      <td className="px-[10px] py-[15px]">
                        <img
                          alt=""
                          src={product.imageUrl}
                          className="w-[70px] aspect-square object-cover"
                        />
                      </td>
                      <td className="px-[10px] py-[15px]">
                        <p className="text-[#777] text-[15px]">
                          {product.name}
                        </p>
                      </td>
                      <td className="px-[10px] py-[15px]">
                        <p className="text-[#777] text-[15px] text-center">
                          {(+product?.finalPrice)?.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </p>
                      </td>
                      <td className="px-[10px] py-[15px] text-center">
                        <div className="h-[45px] border border-solid border-gray-200 mx-auto w-fit">
                          <button
                            onClick={() => handleDecrement(product.id)}
                            className={`w-[26px] h-full ${
                              product.quantity > 0
                                ? ""
                                : "bg-gray-100 cursor-not-allowed"
                            }`}
                          >
                            -
                          </button>
                          <input
                            type="text"
                            name="product_quantity"
                            value={quantity}
                            onChange={(e) =>
                              handleChangeQuantity(e, product.id)
                            }
                            className="w-[50px] bg-[#f8f8f8] h-full text-center outline-none border-x border-solid border-gray-200"
                          />
                          <button
                            className={`w-[26px] h-full`}
                            onClick={() => handleIncrement(product.id)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-[10px] py-[15px] text-right">
                        <p className="text-primary">
                          {(quantity * product.finalPrice)?.toLocaleString(
                            "vi-VN",
                            {
                              style: "currency",
                              currency: "VND",
                            }
                          )}
                        </p>
                      </td>
                      <td className="px-[10px] py-[15px] text-center">
                        <button
                          onClick={() => handleRemoveProductInCart(product.id)}
                          className="hover:text-primary transition-colors duration-200"
                        >
                          <FaRegTrashCan />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td className="px-[10px] py-[15px]" colSpan={6}>
                      <div className="flex justify-between items-center">
                        <div className="h-10">
                          <input
                            type="text"
                            name="coupon_code"
                            placeholder="Mã giảm giá..."
                            className="text-sm w-[250px] h-full px-[15px] bg-[#f5f5f5] outline-none"
                          />
                          <button className="px-[18px] text-white text-sm uppercase bg-primary h-full inline-block hover:bg-secondary transition-colors duration-300">
                            Áp dụng mã giảm giá
                          </button>
                        </div>
                        <button
                          onClick={handleUpdateCart}
                          className={`px-[18px] bg-primary text-white text-sm uppercase h-10 inline-block  transition-colors duration-300 ${
                            changedStatus
                              ? "hover:bg-secondary cursor-pointer"
                              : "bg-opacity-50 hover:cursor-not-allowed hover:bg-[#e9e6ed]"
                          }`}
                        >
                          Cập nhật giỏ hàng
                        </button>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="col-span-4">
              <div className="p-[30px] border border-solid border-gray-200 text-secondary">
                <h2 className="mb-5 text-xl font-semibold">
                  Hóa đơn thanh toán
                </h2>
                <table className="w-full">
                  <tbody>
                    <tr className="border-y border-solid border-gray-200">
                      <th className="text-start">Tổng giá sản phẩm</th>
                      <td className="text-end py-[15px]">
                        {paymentDetails.totalPrice?.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </td>
                    </tr>
                    <tr className="border-y border-solid border-gray-200">
                      <th className="text-start">Phí vận chuyển</th>
                      <td className="text-end py-[15px]">
                        {paymentDetails.shippingPrice <= 0 && "Miễn phí"}
                        {paymentDetails.shippingPrice > 0 &&
                          paymentDetails.shippingPrice?.toLocaleString(
                            "vi-VN",
                            {
                              style: "currency",
                              currency: "VND",
                            }
                          )}
                      </td>
                    </tr>
                    <tr className="border-y border-solid border-gray-200">
                      <th className="text-start">Giảm giá</th>
                      <td className="text-end py-[15px]">
                        {paymentDetails.discountPrice?.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </td>
                    </tr>
                    <tr>
                      <th className="text-start">Tổng tiền</th>
                      <td className="text-end py-[15px] text-[22px] text-primary font-bold">
                        {paymentDetails.totalPayment?.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <button
                          onClick={handleCheckoutCartItem}
                          className="px-[18px] text-white text-sm uppercase bg-primary h-[50px] w-full flex items-center justify-center hover:bg-secondary transition-colors duration-300"
                        >
                          Tiến hành thanh toán
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="col-span-full">
            <div className="pt-[100px] pb-[180px] bg-contain bg-center bg-no-repeat bg-[url('https://ciyashop.potenzaglobalsolutions.com/decor/wp-content/themes/ciyashop/images/empty-cart-icon.png')]">
              <h2 className="text-center text-3xl font-bold">
                Giỏ hàng của bạn hiện đang trống.
              </h2>
              <div className="text-center mt-5">
                <Link
                  to="/products"
                  className="text-white bg-primary rounded-full px-5 py-2 text-sm hover:bg-opacity-80 transition-all"
                >
                  Quay lại cửa hàng
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
