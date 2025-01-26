import { AppContext } from "@/App";
import Tag from "@/components/Tag/Tag";
import { tag_types } from "@/constants/tag-types";
import { cartService } from "@/services/cartService";
import { toggleWishlist } from "@/stores/slices/wishlistSlice";
import { Alert, Snackbar, Tooltip } from "@mui/material";
import { useContext, useState } from "react";
import {
  FaCompressAlt,
  FaHeart,
  FaRegHeart,
  FaShoppingCart,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function ProductItem(product) {
  const {
    id,
    name,
    category,
    imageUrl,
    salePercent,
    quantity,
    originalPrice,
    finalPrice,
    new: isNew,
  } = product;
  const dispatch = useDispatch();
  const { setCartItems } = useContext(AppContext);
  const { productList } = useSelector((state) => state.wishlist);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const auth = useSelector((state) => state.auth);
  const isAuthenticated = Boolean(auth?.accessToken);

  const existInWishlist = Boolean(
    productList.find((product) => product.id === id)
  );

  const handleAddToCart = async (event) => {
    try {
      event.preventDefault();
      event.stopPropagation();
      if (!isAuthenticated) return toast.info("Vui lòng đăng nhập");
      if (!product.quantity) return toast.error("Sản phẩm đã hết hàng.");
      const response = await cartService.addToCart({
        id: product.id,
        quantity: 1,
      });
      setCartItems(response.data.products);
      return toast.success("Đã thêm sản phẩm vào giỏ hàng");
    } catch (error) {
      return toast.error(error.response.data.message);
    }
  };

  const handleToggleWishlist = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenSnackbar(true);
    dispatch(toggleWishlist(product));
  };

  const handleCloseSnackbar = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      <Snackbar
        color="primary"
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={existInWishlist ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {existInWishlist
            ? "Đã thêm vào danh sách yêu thích"
            : "Đã xóa khỏi danh sách yêu thích"}
        </Alert>
      </Snackbar>
      <article className="group border border-solid border-gray-300">
        <div className="relative w-full aspect-square overflow-hidden">
          <img
            alt={name}
            src={imageUrl}
            className="absolute w-full h-full object-cover group-hover:scale-110 duration-500 transition-all"
          />
          <div className="absolute top-3 right-0">
            <div className="mb-2 flex flex-col gap-2">
              {salePercent > 0 && <Tag type={tag_types.SALE} />}
              {isNew && <Tag type={tag_types.NEW} />}
            </div>
          </div>
          <div className="absolute top-3 left-3 text-xs text-white">
            {quantity ? (
              <div className="bg-[#61d008cc] px-2 py-1 rounded-sm">
                {quantity} sản phẩm
              </div>
            ) : (
              <div className="bg-[#de4646] px-2 py-1 rounded-sm">Hết hàng</div>
            )}
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1/2 z-10 flex gap-2 items-center transition-all">
            <div className="flex items-center gap-4">
              <Tooltip title={"Thêm vào giỏ hàng"} placement="top">
                <button
                  onClick={handleAddToCart}
                  className="flex size-10 items-center justify-center bg-white shadow rounded text-secondary hover:text-primary transition-all"
                >
                  <FaShoppingCart />
                </button>
              </Tooltip>
              <Tooltip title={"Yêu thích"} placement="top">
                <button
                  onClick={handleToggleWishlist}
                  className="flex size-10 items-center justify-center bg-white shadow rounded "
                >
                  {existInWishlist ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="text-secondary hover:text-primary transition-all" />
                  )}
                </button>
              </Tooltip>
              <Tooltip title={"So sánh"} placement="top">
                <button className="flex size-10 items-center justify-center bg-white shadow rounded text-secondary hover:text-primary transition-all">
                  <FaCompressAlt />
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="p-5 flex flex-col gap-1 items-center font-medium">
          <h3 className="text-sm text-[#ababab] hover:text-secondary transition-all cursor-pointer">
            {name}
          </h3>
          <h4 className="text-sm text-[#323232] hover:text-primary transition-all cursor-pointer">
            {category.name}
          </h4>
          <p className="text-base flex gap-2 items-center font-semibold">
            {salePercent > 0 && (
              <span className="line-through text-gray-400">
                {originalPrice?.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            )}
            <span className="text-[#323232]">
              {finalPrice?.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </p>
        </div>
      </article>
    </>
  );
}
