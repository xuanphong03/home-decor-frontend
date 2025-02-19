import useConfirm from "@/hooks/useConfirm";
import { Link, useLocation } from "react-router-dom";

export default function ProductItem({ product, permissions, onDelete }) {
  const confirm = useConfirm();
  const location = useLocation();

  const handleDelete = async () => {
    const choice = await confirm({
      title: "Xóa sản phẩm?",
      description: `Bạn thật sự muốn xóa sản phẩm ${product.name} chứ?`,
      confirmBtnLabel: "Xác nhận",
      cancelBtnLabel: "Đóng",
    });
    if (choice && onDelete) {
      onDelete(product.id);
    }
  };
  return (
    <tr className="px-4 border-y border-solid border-gray-200">
      <td className="p-4 text-left">
        <div className="flex items-center gap-5 relative">
          {product?.new && (
            <span className="absolute top-0 left-0 -translate-y-1/2 text-white bg-primary px-1 py-[2px] rounded text-xs">
              New
            </span>
          )}
          <div className="flex items-center justify-center size-20">
            <img
              alt={product?.name}
              src={product?.imageUrl}
              className="max-h-full object-cover"
            />
          </div>
          <div>
            <h3 className="mb-1 hover:text-primary transition-colors cursor-pointer">
              <Link to={location.pathname + `/${product?.id}`}>
                {product?.name}
              </Link>
            </h3>
            <div className="flex items-end gap-1 text-xs text-gray-500">
              <p>ID: {product?.id}</p>
            </div>
          </div>
        </div>
      </td>
      <td className="p-4 text-left">
        <h3>{product?.category?.name}</h3>
      </td>
      <td className="p-4 text-left">
        {!product?.salePercent ? (
          <span>
            {(+product?.originalPrice)?.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        ) : (
          <span>
            {(
              +(product?.originalPrice * (100 - product?.salePercent)) / 100
            )?.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        )}
      </td>
      <td className="p-4 text-left text-xs">
        {product?.quantity ? (
          <span className="inline-block px-2 py-1 rounded-sm text-green-800 bg-green-100 font-medium">
            {product?.quantity} sản phẩm
          </span>
        ) : (
          <span className="inline-block px-2 py-1 rounded-sm text-red-800 bg-red-100 font-medium">
            Hết hàng
          </span>
        )}
      </td>

      <td className="p-4 text-left text-xs">
        {product?.status ? (
          <span className="inline-block px-2 py-1 rounded-sm text-green-800 bg-green-100 font-medium">
            Kinh doanh
          </span>
        ) : (
          <span className="inline-block px-2 py-1 rounded-sm text-red-800 bg-red-100 font-medium">
            Ngưng kinh doanh
          </span>
        )}
      </td>
      <td className="p-4 text-right">
        {permissions?.includes("products.update") && (
          <Link
            to={location.pathname + `/${product.id}`}
            className="px-4 py-1 text-sm text-blue-500 hover:underline"
          >
            Sửa
          </Link>
        )}
        {permissions?.includes("products.delete") && (
          <button
            onClick={handleDelete}
            className="ml-4 px-4 py-1 text-sm text-red-500 hover:underline"
          >
            Xóa
          </button>
        )}
      </td>
    </tr>
  );
}
