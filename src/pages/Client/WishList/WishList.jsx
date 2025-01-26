import { Alert, Breadcrumbs, Snackbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromWishlist } from "@/stores/slices/wishlistSlice";
import { useContext, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import { toast } from "react-toastify";
import { cartService } from "@/services/cartService";
import { AppContext } from "@/App";

export default function WishList() {
  const dispatch = useDispatch();
  const { setCartItems } = useContext(AppContext);
  const { productList } = useSelector((state) => state.wishlist);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const auth = useSelector((state) => state.auth);
  const isAuthenticated = Boolean(auth?.accessToken);
  const handleAddToCart = async (product) => {
    try {
      if (!product.quantity) return;
      if (!isAuthenticated) return toast.info("Vui lòng đăng nhập");
      const response = await cartService.addToCart({
        id: product.id,
        quantity: 1,
      });
      setCartItems(response.data.products);
      return toast.success("Đã thêm vào giỏ hàng!");
    } catch (error) {
      return toast.error(error.response.data.message);
    }
  };

  const handleRemoveFromWishlist = (productId) => {
    if (confirm("Bạn chắc chắn muốn xóa sản phẩm khỏi danh sách yêu thích?")) {
      setOpenSnackbar(true);
      dispatch(removeFromWishlist(productId));
    }
  };

  const handleCloseSnackbar = () => {
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
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Đã xóa khỏi danh sách yêu thích
        </Alert>
      </Snackbar>
      <div className="mt-[90px]">
        <section className="h-[450px] bg-center bg-cover bg-scroll pt-20 bg-no-repeat bg-[url('https://ciyashop.potenzaglobalsolutions.com/decor/wp-content/uploads/sites/84/2020/08/page-header-1.jpg')]">
          <div className="max-w-full lg:max-w-[1300px] mx-auto px-4 py-2 h-[370px] flex flex-col justify-center gap-y-5">
            <h1 className="text-4xl font-semibold text-[#323232]">
              Danh sách yêu thích
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
                Danh sách yêu thích
              </Typography>
            </Breadcrumbs>
          </div>
        </section>
        <section className="max-w-full lg:max-w-[1300px] mx-auto px-4 py-[60px]">
          <table className="w-full mb-6 text-sm">
            <thead className="border border-solid border-gray-200">
              <tr>
                <th className="py-[10px] px-5 text-left">Sản phẩm</th>
                <th className="py-[10px] px-5 text-center">Đơn giá</th>
                <th className="py-[10px] px-5 text-center">Tình trạng hàng</th>
                <th className="py-[10px] px-5"></th>
                <th className="py-[10px] px-5"></th>
              </tr>
            </thead>
            <tbody>
              {productList.map((product) => (
                <tr
                  key={product.id}
                  className="border border-solid border-gray-200"
                >
                  <td className="py-[10px] px-5 text-left">
                    <div className="flex items-center gap-5">
                      <div className="size-20">
                        <img
                          alt=""
                          src={product.imageUrl}
                          className="max-w-full aspect-square object-cover"
                        />
                      </div>
                      <Link to="#">
                        <h3 className="text-secondary cursor-pointer hover:text-primary transition-all">
                          {product.name}
                        </h3>
                      </Link>
                    </div>
                  </td>
                  <td className="py-[10px] px-5 text-center">
                    {product.finalPrice.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                  <td className="py-[10px] px-5 text-center">
                    <span className="px-4 py-1 rounded bg-green-100 text-green-600">
                      Còn hàng
                    </span>
                  </td>
                  <td className="py-[10px] px-5 text-right w-52">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="px-4 py-1 bg-primary text-white rounded hover:bg-opacity-80 transition-all"
                    >
                      Thêm vào giỏ hàng
                    </button>
                  </td>
                  <td className="py-[10px] px-5 text-right w-20">
                    <button
                      onClick={() => handleRemoveFromWishlist(product.id)}
                      className="hover:text-red-500 transition-all"
                    >
                      <RiDeleteBin6Line className="text-2xl" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!productList.length && (
            <p className="text-center text-[15px] text-[#777777]">
              Không có sản phẩm nào được thêm vào danh sách yêu thích
            </p>
          )}
        </section>
      </div>
    </>
  );
}
