import { Breadcrumbs } from "@mui/material";
import {
  MdAdminPanelSettings,
  MdContactEmergency,
  MdOutlineLocalShipping,
  MdOutlinePayment,
} from "react-icons/md";
import { Link } from "react-router-dom";
import SettingShipping from "./SettingShipping";
import SettingPayment from "./SettingPayment";
import SettingContact from "./SettingContact";
import SettingRole from "./SettingRole";

export default function SettingPage() {
  return (
    <>
      <div className="h-[45px] px-10 shadow w-full flex items-center">
        <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: "14px" }}>
          <Link to="/admin" className="hover:underline">
            Thống kê
          </Link>
          <Link to="#" className="text-secondary">
            Thiết lập
          </Link>
        </Breadcrumbs>
      </div>
      <div className="px-10 py-5">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[28px] font-medium">Thiết lập</h2>
        </div>
        <div className="grid grid-cols-4 gap-5">
          <Link to={"#shipping"}>
            <article className="group col-span-1 border border-solid border-gray-300 shadow rounded p-1 cursor-pointer">
              <div className="p-6 flex flex-col items-center group-hover:bg-gray-200 transition-colors">
                <div className="mb-4 text-gray-400">
                  <MdOutlineLocalShipping className="text-4xl" />
                </div>
                <h3 className="text-center font-medium">Vận chuyển</h3>
                <p className="text-sm text-center text-gray-500">
                  The study of quantity starts with numbers
                </p>
              </div>
            </article>
          </Link>
          <Link to={"#payment"}>
            <article className="group col-span-1 border border-solid border-gray-300 shadow rounded p-1 cursor-pointer">
              <div className="p-6 flex flex-col items-center group-hover:bg-gray-200 transition-colors">
                <div className="mb-4 text-gray-400">
                  <MdOutlinePayment className="text-4xl" />
                </div>
                <h3 className="text-center font-medium">
                  Phương thức thanh toán
                </h3>
                <p className="text-sm text-center text-gray-500">
                  Mathematicians seek and use patterns
                </p>
              </div>
            </article>
          </Link>
          <Link to={"#contact"}>
            <article className="group col-span-1 border border-solid border-gray-300 shadow rounded p-1 cursor-pointer">
              <div className="p-6 flex flex-col items-center group-hover:bg-gray-200 transition-colors">
                <div className="mb-4 text-gray-400">
                  <MdContactEmergency className="text-4xl" />
                </div>
                <h3 className="text-center font-medium">Thông tin liên hệ</h3>
                <p className="text-sm text-center text-gray-500">
                  The study of quantity starts with numbers
                </p>
              </div>
            </article>
          </Link>
          <Link to={"#role"}>
            <article className="group col-span-1 border border-solid border-gray-300 shadow rounded p-1 cursor-pointer">
              <div className="p-6 flex flex-col items-center group-hover:bg-gray-200 transition-colors">
                <div className="mb-4 text-gray-400">
                  <MdAdminPanelSettings className="text-4xl" />
                </div>
                <h3 className="text-center font-medium">
                  Vai trò - Phân quyền
                </h3>
                <p className="text-sm text-center text-gray-500">
                  The study of quantity starts with numbers
                </p>
              </div>
            </article>
          </Link>
        </div>
      </div>
      <div className="px-10 py-5">
        <SettingShipping />
        <SettingPayment />
        <SettingContact />
        <SettingRole />
      </div>
    </>
  );
}
