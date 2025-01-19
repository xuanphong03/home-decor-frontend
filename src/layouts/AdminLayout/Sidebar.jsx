import { AiOutlineDashboard, AiOutlineProduct } from "react-icons/ai";
import { BiCoinStack } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { LuLayoutGrid, LuSettings, LuShoppingCart } from "react-icons/lu";
import { MdOutlineDiscount, MdOutlineManageAccounts } from "react-icons/md";
import { TiMessages } from "react-icons/ti";
import { NavLink } from "react-router-dom";
import "./Sidebar.scss";
import { useContext } from "react";
import { AppContext } from "@/App";

export default function Sidebar() {
  const baseUrl = "/admin";
  const { permissions } = useContext(AppContext);

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex-shrink-0 px-4 py-2 text-center bg-yellow-300">
        <img
          className="max-w-full object-cover"
          alt="logo"
          src="https://ciyashop.potenzaglobalsolutions.com/decor/wp-content/uploads/sites/84/2020/08/logo.png"
        />
      </div>
      <div className="text-white py-3 flex-1 border-b border-solid border-gray-400">
        <h2 className="text-xs px-5 py-2 uppercase tracking-wider font-semibold text-slate-400">
          Application
        </h2>
        <ul>
          <li className="mb-1">
            <NavLink
              to={baseUrl}
              className={({ isActive }) =>
                `px-5 py-2 flex gap-2 items-center transition-colors ${
                  isActive ? "bg-gray-400" : "hover:bg-gray-500"
                }`
              }
              end
            >
              <AiOutlineDashboard className="text-xl" />
              <span className="text-[15px]">Thống kê - Doanh thu</span>
            </NavLink>
          </li>
          {permissions?.includes("categories.read") && (
            <li className="mb-1">
              <NavLink
                to={baseUrl + "/categories"}
                className={({ isActive }) =>
                  `px-5 py-2 flex gap-2 items-center transition-colors ${
                    isActive ? "bg-gray-400" : "hover:bg-gray-500"
                  }`
                }
              >
                <BiCoinStack className="text-xl" />{" "}
                <span className="text-[15px]">Danh mục</span>
              </NavLink>
            </li>
          )}
          {permissions?.includes("products.read") && (
            <li className="mb-1">
              <NavLink
                to={baseUrl + "/products"}
                className={({ isActive }) =>
                  `px-5 py-2 flex gap-2 items-center transition-colors ${
                    isActive ? "bg-gray-400" : "hover:bg-gray-500"
                  }`
                }
              >
                <AiOutlineProduct className="text-xl" />{" "}
                <span className="text-[15px]">Sản phẩm</span>
              </NavLink>
            </li>
          )}
          {permissions?.includes("users.read") && (
            <li className="mb-1">
              <NavLink
                to={baseUrl + "/users"}
                className={({ isActive }) =>
                  `px-5 py-2 flex gap-2 items-center transition-colors ${
                    isActive ? "bg-gray-400" : "hover:bg-gray-500"
                  }`
                }
              >
                <FiUser className="text-xl" />{" "}
                <span className="text-[15px]"> Người dùng</span>
              </NavLink>
            </li>
          )}
          {permissions?.includes("orders.read") && (
            <li className="mb-1">
              <NavLink
                to={baseUrl + "/orders"}
                className={({ isActive }) =>
                  `px-5 py-2 flex gap-2 items-center transition-colors ${
                    isActive ? "bg-gray-400" : "hover:bg-gray-500"
                  }`
                }
              >
                <LuShoppingCart className="text-xl" />{" "}
                <span className="text-[15px]">Đơn hàng</span>
              </NavLink>
            </li>
          )}
          {permissions?.includes("coupons.read") && (
            <li className="mb-1">
              <NavLink
                to={baseUrl + "/coupons"}
                className={({ isActive }) =>
                  `px-5 py-2 flex gap-2 items-center transition-colors ${
                    isActive ? "bg-gray-400" : "hover:bg-gray-500"
                  }`
                }
              >
                <MdOutlineDiscount className="text-xl" />{" "}
                <span className="text-[15px]">Mã giảm giá</span>
              </NavLink>
            </li>
          )}
          <li className="mb-1">
            <NavLink
              to={baseUrl + "/messages"}
              className={({ isActive }) =>
                `px-5 py-2 flex gap-2 items-center transition-colors ${
                  isActive ? "bg-gray-400" : "hover:bg-gray-500"
                }`
              }
            >
              <TiMessages className="text-xl" />{" "}
              <span className="text-[15px]">Tin nhắn</span>
            </NavLink>
          </li>
          <li className="mb-1">
            <NavLink
              to={baseUrl + "/layouts"}
              className={({ isActive }) =>
                `px-5 py-2 flex gap-2 items-center transition-colors ${
                  isActive ? "bg-gray-400" : "hover:bg-gray-500"
                }`
              }
            >
              <LuLayoutGrid className="text-xl" />{" "}
              <span className="text-[15px]">Giao diện</span>
            </NavLink>
          </li>
          <li className="mb-1">
            <h3 className="cursor-pointer">
              <NavLink
                to={baseUrl + "/settings"}
                className={({ isActive }) =>
                  `px-5 py-2 flex gap-2 items-center transition-colors ${
                    isActive ? "bg-gray-400" : "hover:bg-gray-500"
                  }`
                }
                end
              >
                <LuSettings className="text-xl" />{" "}
                <span className="text-[15px]">Cài đặt</span>
              </NavLink>
            </h3>
          </li>
          <li className="mb-1">
            <h3 className="cursor-pointer">
              <NavLink
                to={baseUrl + "/account"}
                className={({ isActive }) =>
                  `px-5 py-2 flex gap-2 items-center transition-colors ${
                    isActive ? "bg-gray-400" : "hover:bg-gray-500"
                  }`
                }
                end
              >
                <MdOutlineManageAccounts className="text-xl" />{" "}
                <span className="text-[15px]">Tài khoản</span>
              </NavLink>
            </h3>
          </li>
        </ul>
      </div>
      <div className="flex-shrink-0">
        <div className="px-2 py-3 flex items-center gap-2 cursor-pointer">
          <div className="flex-shrink-0 size-8">
            <img
              alt="avatar"
              src="https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-4-64x64.jpg"
              className="max-w-full object-cover"
            />
          </div>
          <div className="text-white flex-1">
            <h2 className="text-[15px] font-semibold">Nguyễn Xuân Phong</h2>
            <h3 className="line-clamp-1 text-sm">xuanphong@gmail.com</h3>
          </div>
        </div>
        <button className="text-center text-white px-5 py-2 w-full bg-primary hover:bg-opacity-80">
          Đăng xuất
        </button>
      </div>
    </div>
  );
}
