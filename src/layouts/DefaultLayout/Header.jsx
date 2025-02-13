import { useContext, useMemo, useState } from "react";
import { FaHeart, FaShoppingBag, FaUser } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

import { AppContext } from "@/App";
import { authService } from "@/services/authService";
import { Badge } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AccountMenu from "./AccountMenu";
import { cartService } from "@/services/cartService";
import "./DefaultLayout.scss";
import { logout } from "@/stores/slices/authSlice";
import { AiOutlineMenu } from "react-icons/ai";
import { MdArrowBackIos } from "react-icons/md";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
  const auth = useSelector((state) => state.auth);
  const { scrolledDown, setProfile, cartItems, setCartItems } =
    useContext(AppContext);
  const cartData = useMemo(() => {
    const totalItem = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    const totalPrice = cartItems.reduce(
      (total, item) => total + item.quantity * item.product.finalPrice,
      0
    );
    return {
      totalItem,
      totalPrice,
    };
  }, [cartItems]);
  const isAuthenticated = Boolean(auth?.accessToken);

  const handleDeleteProduct = async (event, productId) => {
    try {
      event.preventDefault();
      event.stopPropagation();
      const response = await cartService.removeProductByUser(productId);
      setCartItems(response.data.products);
    } catch (error) {
      throw new Error("Remove product failed");
    }
  };

  const handleLogoutAccount = async () => {
    try {
      await authService.logout();
    } catch (error) {
      throw new Error("Logout to failed");
    } finally {
      setProfile(null);
      setCartItems([]);
      dispatch(logout());
    }
  };

  return (
    <>
      <header
        className={`h-[90px] fixed top-0 left-0 right-0 z-50 ${
          scrolledDown ? "bg-white shadow-xl" : "bg-transparent"
        }`}
      >
        <div className="max-w-full lg:max-w-[1300px] mx-auto px-4 flex items-center justify-between flex-nowrap h-full">
          <div className="flex-1 flex-shrink-0">
            <Link to="/">
              <img
                alt="logo"
                src="https://ciyashop.potenzaglobalsolutions.com/decor/wp-content/uploads/sites/84/2020/08/logo.png"
                className="max-w-full h-auto"
              />
            </Link>
          </div>
          <nav className="flex-1 hidden lg:flex items-center justify-center">
            <ul className="flex flex-1 items-center gap-5 text-[15px] font-medium">
              <li className="group relative uppercase py-3">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `inline-block whitespace-nowrap ${
                      isActive
                        ? "text-primary"
                        : "text-secondary group-hover:text-primary"
                    }`
                  }
                >
                  Trang chủ
                </NavLink>
              </li>
              <li className="group relative uppercase py-3">
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `inline-block whitespace-nowrap ${
                      isActive
                        ? "text-primary"
                        : "text-secondary group-hover:text-primary"
                    }`
                  }
                >
                  Giới thiệu
                </NavLink>
              </li>
              <li className="group relative uppercase py-3">
                <NavLink
                  to="/blogs"
                  className={({ isActive }) =>
                    `inline-block whitespace-nowrap ${
                      isActive
                        ? "text-primary"
                        : "text-secondary group-hover:text-primary"
                    }`
                  }
                >
                  Blog
                </NavLink>
              </li>
              <li className="group relative uppercase py-3">
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    `inline-block whitespace-nowrap ${
                      isActive
                        ? "text-primary"
                        : "text-secondary group-hover:text-primary"
                    }`
                  }
                >
                  Cửa hàng
                </NavLink>
              </li>

              <li className="group relative uppercase py-3">
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `inline-block whitespace-nowrap ${
                      isActive
                        ? "text-primary"
                        : "text-secondary group-hover:text-primary"
                    }`
                  }
                >
                  Liên hệ
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="flex-1 flex items-center justify-end">
            <ul className="flex items-center">
              {!isAuthenticated && (
                <li className="cursor-pointer text-lg text-secondary hover:text-primary transition-colors">
                  <Link
                    to="/login"
                    className="size-9 flex items-center justify-center"
                  >
                    <FaUser />
                  </Link>
                </li>
              )}
              <li className="cursor-pointer text-lg text-secondary hover:text-primary transition-colors">
                <Link
                  to="/wishlist"
                  className="relative size-9 flex items-center justify-center"
                >
                  <Badge
                    badgeContent={wishlist?.productList?.length}
                    max={99}
                    color="primary"
                    showZero
                  >
                    <FaHeart />
                  </Badge>
                </Link>
              </li>
              <li className="relative group cursor-pointer">
                <Link
                  to="/cart"
                  className="relative text-lg size-9 flex items-center justify-center text-secondary hover:text-primary transition-colors"
                >
                  <Badge
                    badgeContent={cartData.totalItem}
                    max={99}
                    color="primary"
                    showZero
                  >
                    <FaShoppingBag />
                  </Badge>
                </Link>
                <div className="opacity-0 invisible  translate-y-5 group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible transition-all duration-300 absolute w-[340px] p-4 bg-white top-full right-0 dropdown-menu">
                  {!!cartItems.length && (
                    <>
                      <ul className="w-full">
                        {cartItems?.map(({ product, quantity }) => (
                          <li
                            key={product.id}
                            className="w-full mb-2 border-b border-solid border-gray-200"
                          >
                            <Link
                              to={`/products/${product.id}`}
                              className="inline-block w-full"
                            >
                              <article className="flex gap-2 w-full">
                                <div className="size-[60px]">
                                  <img
                                    alt={product?.name}
                                    src={product?.imageUrl}
                                    className="w-[60px] aspect-square object-cover"
                                  />
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-sm mb-1 hover:text-primary">
                                    {product?.name}
                                  </h4>
                                  <p className="text-[15px]">
                                    <span>{quantity}</span> x{" "}
                                    <span className="text-primary font-semibold">
                                      {product?.finalPrice?.toLocaleString(
                                        "vi-VN",
                                        {
                                          style: "currency",
                                          currency: "VND",
                                        }
                                      )}
                                    </span>
                                  </p>
                                </div>
                                <div>
                                  <button
                                    onClick={(event) =>
                                      handleDeleteProduct(event, product.id)
                                    }
                                    className="text-sm hover:text-primary transition-colors"
                                  >
                                    Xóa
                                  </button>
                                </div>
                              </article>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <div className="pb-2">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-bold text-secondary text-lg">
                            Tổng cộng:
                          </h3>
                          <span className="text-xl text-primary font-semibold">
                            {cartData.totalPrice?.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <Link
                            to="/cart"
                            className="basis-1/2 max-w-[50%] flex justify-center items-center h-11 uppercase bg-primary hover:bg-secondary text-white px-7 py-1 text-sm transition-all"
                          >
                            Giỏ hàng
                          </Link>
                          <Link
                            to="/checkout"
                            className="basis-1/2 max-w-[50%] flex justify-center items-center h-11 uppercase bg-secondary hover:bg-primary text-white px-7 py-1 text-sm transition-all"
                          >
                            Thanh toán
                          </Link>
                        </div>
                      </div>
                    </>
                  )}
                  {!cartItems.length && (
                    <div className="w-full flex items-center justify-center">
                      <p className="text-[15px] my-3">
                        Không có sản phẩm nào trong giỏ hàng.
                      </p>
                    </div>
                  )}
                </div>
              </li>
              {isAuthenticated && (
                <li className="relative">
                  <AccountMenu onLogout={handleLogoutAccount} />
                </li>
              )}
              <li className="block lg:hidden ml-2">
                <AiOutlineMenu
                  className="text-2xl"
                  onClick={() => setOpenMenu(true)}
                />
              </li>
            </ul>
          </div>
        </div>
      </header>
      <div
        className={`fixed inset-0 z-50 ${openMenu ? "visible" : "invisible"}`}
      >
        <div
          onClick={() => setOpenMenu(false)}
          className={`absolute inset-0 bg-black transition-all ${
            openMenu ? "opacity-30 visible" : "opacity-0 invisible"
          }`}
        ></div>
        <div
          className={`fixed top-0 left-0 bottom-0 w-[300px] bg-white transition-all ${
            openMenu ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <ul className="px-4 py-2 text-[15px] font-medium">
            <li className="group relative uppercase py-3">
              <NavLink
                onClick={() => setOpenMenu(false)}
                to="/"
                className={({ isActive }) =>
                  `inline-block whitespace-nowrap ${
                    isActive
                      ? "text-primary"
                      : "text-secondary group-hover:text-primary"
                  }`
                }
              >
                Trang chủ
              </NavLink>
            </li>
            <li className="group relative uppercase py-3">
              <NavLink
                onClick={() => setOpenMenu(false)}
                to="/about"
                className={({ isActive }) =>
                  `inline-block whitespace-nowrap ${
                    isActive
                      ? "text-primary"
                      : "text-secondary group-hover:text-primary"
                  }`
                }
              >
                Giới thiệu
              </NavLink>
            </li>
            <li className="group relative uppercase py-3">
              <NavLink
                onClick={() => setOpenMenu(false)}
                to="/blogs"
                className={({ isActive }) =>
                  `inline-block whitespace-nowrap ${
                    isActive
                      ? "text-primary"
                      : "text-secondary group-hover:text-primary"
                  }`
                }
              >
                Blog
              </NavLink>
            </li>
            <li className="group relative uppercase py-3">
              <NavLink
                onClick={() => setOpenMenu(false)}
                to="/products"
                className={({ isActive }) =>
                  `inline-block whitespace-nowrap ${
                    isActive
                      ? "text-primary"
                      : "text-secondary group-hover:text-primary"
                  }`
                }
              >
                Cửa hàng
              </NavLink>
            </li>

            <li className="group relative uppercase py-3">
              <NavLink
                onClick={() => setOpenMenu(false)}
                to="/contact"
                className={({ isActive }) =>
                  `inline-block whitespace-nowrap ${
                    isActive
                      ? "text-primary"
                      : "text-secondary group-hover:text-primary"
                  }`
                }
              >
                Liên hệ
              </NavLink>
            </li>
          </ul>
          <button className="size-8 flex items-center justify-center rounded-full bg-primary absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2">
            <MdArrowBackIos
              className="text-2xl text-white translate-x-1/4"
              onClick={() => setOpenMenu(false)}
            />
          </button>
        </div>
      </div>
    </>
  );
}
