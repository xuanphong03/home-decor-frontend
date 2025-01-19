import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

export default function OrderDetail({ orderDetail, onClose }) {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="px-5 py-5 bg-white max-h-[600px] overflow-y-auto rounded-sm">
      <div className="mb-4 text-xl flex items-center justify-between">
        <h2 className="font-bold">Chi tiết đơn hàng #{orderDetail.id}</h2>
        <button
          onClick={handleClose}
          className="hover:text-primary transition-all"
        >
          <IoMdClose className="text-xl" />
        </button>
      </div>
      <table className="text-[15px] w-[500px] border border-solid border-gray-300">
        <tbody>
          {orderDetail?.products.map((product) => (
            <tr
              key={product?.id}
              className="border-y border-solid border-gray-300"
            >
              <td className="p-2">
                <div className="flex items-center gap-2">
                  <div className="size-14">
                    <img
                      alt={product?.product?.name}
                      src={product?.product?.imageUrl}
                      className="max-h-full object-cover"
                    />
                  </div>
                  <div className="text-sm">
                    <h3 className="mb-1 text-[15px]">
                      <Link
                        to={`/products/${product?.productId}`}
                        className="hover:text-primary transition-all"
                      >
                        {product?.product?.name}
                      </Link>
                    </h3>
                    <p className="text-gray-500">
                      Số lượng: {product?.quantity}
                    </p>
                  </div>
                </div>
              </td>
              <td className="text-end p-2">
                <span className="text-[15px]">
                  {(product?.quantity * product?.price).toLocaleString(
                    "vi-VN",
                    {
                      style: "currency",
                      currency: "VND",
                    }
                  )}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-y border-solid border-gray-300">
            <th className="p-2 text-left">Phí vận chuyển</th>
            <td className="p-2 text-right">
              {orderDetail?.shippingPrice ? (
                orderDetail?.shippingPrice.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })
              ) : (
                <span>Miễn phí</span>
              )}
            </td>
          </tr>
          <tr className="border-y border-solid border-gray-300">
            <th className="p-2 text-left">Giảm giá</th>
            <td className="p-2 text-right">
              {orderDetail?.discountPrice.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </td>
          </tr>
          <tr className="border-y border-solid border-gray-300">
            <th className="p-2 text-left">Tổng hóa đơn</th>
            <td className="p-2 text-right">
              {orderDetail?.totalPrice.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </td>
          </tr>
          <tr className="border-y border-solid border-gray-300">
            <th className="p-2 text-left    ">Địa chỉ giao hàng</th>
            <td className="p-2 text-left">{orderDetail?.address}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
