import { userService } from "@/services/userService";
import { Alert, Avatar, Breadcrumbs } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserSetting from "./UserSetting";

export default function UserDetail() {
  const { id } = useParams();
  const [alert, setAlert] = useState(null);
  const [userDetail, setUserDetail] = useState(null);
  const [openUserSetting, setOpenUserSetting] = useState(false);

  const getUserDetail = async () => {
    try {
      const response = await userService.getUserDetail(id);
      setUserDetail(response.data);
    } catch (error) {
      setAlert({ type: "error", message: error.response.data.message });
    }
  };
  useEffect(() => {
    getUserDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <>
      {openUserSetting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="relative">
            <UserSetting user={userDetail} />
          </div>
        </div>
      )}
      <div className="h-[45px] px-10 shadow w-full flex items-center">
        <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: "14px" }}>
          <Link to="/admin" className="hover:underline">
            Thống kê - Doanh thu
          </Link>
          <Link to="/admin/users" className="hover:underline">
            Người dùng
          </Link>
          <Link to="#" className="text-secondary">
            {userDetail?.name}
          </Link>
        </Breadcrumbs>
      </div>

      {alert && (
        <div className="px-10 pt-5">
          <Alert severity={alert.type}>{alert.message}</Alert>
        </div>
      )}

      <div className="px-10 py-5">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[28px] font-medium">Thông tin người dùng</h2>
        </div>
        <div className="py-2 grid grid-cols-12 gap-10">
          <section className="col-span-4">
            <div className="bg-white h-full shadow flex flex-col items-center gap-4 p-5">
              <label className="group relative block w-40 aspect-square rounded-full overflow-hidden">
                <Avatar
                  alt={userDetail?.name}
                  src={userDetail?.imageUrl}
                  sx={{ width: "100%", height: "100%" }}
                />
              </label>
              <ul>
                <li className="text-center text-secondary font-medium">
                  {userDetail?.name}
                </li>
                <li className="text-center text-blue-500 text-sm">
                  {userDetail?.email}
                </li>
                <li className="text-center text-[#777777] text-sm mb-2">
                  {userDetail?.phoneNumber}
                </li>
                {userDetail?.verify && (
                  <p className="text-center text-sm text-white bg-primary rounded-full py-1 px-3">
                    Đã kích hoạt
                  </p>
                )}
                {!userDetail?.verify && (
                  <li className="text-center  text-white text-sm">
                    <p className="text-center text-sm text-white bg-red-500 rounded-full py-1 px-3">
                      Chưa kích hoạt
                    </p>
                  </li>
                )}
              </ul>
            </div>
          </section>
          <section className="col-span-8 ">
            <div className="p-5 shadow bg-white">
              <h2 className="font-medium text-lg mb-5 flex items-center gap-2">
                Thông tin cơ bản
              </h2>
              <form>
                <div className="mb-4 text-sm">
                  <label htmlFor="fullname" className="font-medium">
                    Họ và tên
                  </label>
                  <div className="relative mt-[6px] overflow-hidden border border-solid border-gray-200 rounded">
                    <input
                      disabled
                      type="text"
                      id="fullname"
                      defaultValue={userDetail?.name}
                      className="px-4 py-2 w-full outline-none"
                    />
                  </div>
                </div>
                <div className="mb-4 text-sm">
                  <label htmlFor="email" className="font-medium">
                    Email
                  </label>
                  <div className="relative mt-[6px] overflow-hidden border border-solid border-gray-200 rounded">
                    <input
                      disabled
                      type="text"
                      id="email"
                      defaultValue={userDetail?.email}
                      className="px-4 py-2 w-full outline-none"
                    />
                  </div>
                </div>
                <div className="mb-4 text-sm">
                  <label htmlFor="phoneNumber" className="font-medium">
                    Số điện thoại
                  </label>
                  <div className="relative mt-[6px] overflow-hidden border border-solid border-gray-200 rounded">
                    <input
                      disabled
                      type="text"
                      id="phoneNumber"
                      defaultValue={userDetail?.phoneNumber}
                      className="px-4 py-2 w-full outline-none"
                    />
                  </div>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
