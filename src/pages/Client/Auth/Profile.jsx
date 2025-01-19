import { authService } from "@/services/authService";
import HomeIcon from "@mui/icons-material/Home";
import { Alert, Avatar, Breadcrumbs, Typography } from "@mui/material";
import { createContext, useContext, useState } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import ActiveForm from "./components/ActiveForm";
import AddressList from "./components/AddressList";
import BasicInfoForm from "./components/BasicInfoForm";
import PasswordForm from "./components/PasswordForm";
import { AppContext } from "@/App";
import { profileService } from "@/services/profileService";

export const ProfileContext = createContext();

export default function Profile() {
  const { profile, setProfile } = useContext(AppContext);
  const [activeForm, setActiveForm] = useState(false);
  const [message, setMessage] = useState(null);

  const handleShowActiveForm = () => {
    setActiveForm(true);
  };

  const handleCloseActiveForm = () => {
    setActiveForm(false);
  };

  const handleChangeBasicInfo = async (data) => {
    try {
      const response = await profileService.updateProfile(data);
      if (response.success) {
        setProfile(response.data);
        setMessage({
          status: "success",
          text: "Thay đổi thông tin thành công",
        });
      }
    } catch (error) {
      setMessage({
        status: "error",
        text: "Thay đổi thông tin thất bại",
      });
    } finally {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  const handleChangePassword = async (data) => {
    try {
      delete data.confirmNewPassword;
      const response = await authService.changePassword(data);
      if (response.success) {
        setMessage({
          status: "success",
          text: "Thay đổi mật thành công",
        });
      }
    } catch (error) {
      setMessage({
        status: "error",
        text: "Mật khẩu hiện tại chưa chính xác",
      });
    } finally {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  const handleAddNewAddress = async (data) => {
    try {
      const response = await profileService.updateProfile({
        address: { ...data },
      });
      if (response.success) {
        setProfile(response.data);
        setMessage({
          status: "success",
          text: "Thêm địa chỉ thành công",
        });
      }
    } catch (error) {
      setMessage({
        status: "error",
        text: "Thêm địa chỉ thất bại",
      });
      throw new Error("Add new address to failed");
    } finally {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, setProfile, setMessage }}>
      <ActiveForm open={activeForm} onClose={handleCloseActiveForm} />

      <section className="py-[10px] mt-[90px] bg-[#FBFBFB] shadow-sm">
        <div className="max-w-full lg:max-w-[1300px] mx-auto px-4 py-2">
          {message && (
            <Alert severity={message?.status} className="mb-5">
              {message?.text}
            </Alert>
          )}
          <div className="flex justify-between items-center">
            <h1 className="text-[26px] font-semibold text-[#323232]">
              Thông tin cá nhân
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
                Thông tin cá nhân
              </Typography>
            </Breadcrumbs>
          </div>
        </div>
      </section>
      <section className="py-[40px] max-w-full lg:max-w-[1300px] mx-auto px-4 font-roboto">
        <div className="py-2 grid grid-cols-12 gap-10">
          <div className="col-span-4">
            <div className="bg-white shadow flex flex-col items-center gap-4 p-5">
              <label className="group relative block w-40 aspect-square rounded-full cursor-pointer overflow-hidden">
                <Avatar
                  alt=""
                  src={profile?.avatar_url}
                  sx={{ width: "100%", height: "100%" }}
                />
                <input type="file" hidden accept="image/*" />
                <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible absolute inset-0 flex items-center justify-center transition-all">
                  <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                  <div className="relative text-gray-300">
                    <MdOutlineModeEdit className="text-xl" />
                  </div>
                </div>
              </label>
              <ul>
                <li className="text-center text-secondary font-medium">
                  {profile?.name}
                </li>
                <li className="text-center text-blue-500 text-sm">
                  {profile?.email}
                </li>
                <li className="text-center text-[#777777] text-sm mb-2">
                  {profile?.phoneNumber}
                </li>
                {profile?.verify && (
                  <p className="text-center text-sm text-white bg-primary rounded-full py-1 px-3">
                    Đã kích hoạt
                  </p>
                )}
                {!profile?.verify && (
                  <li className="text-center  text-white text-sm">
                    <button
                      onClick={handleShowActiveForm}
                      className="bg-green-500 px-4 py-1 rounded-full hover:bg-green-400 transition-all"
                    >
                      Xác minh tài khoản
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="col-span-8 flex flex-col gap-y-[30px]">
            <div className="p-5 shadow bg-white">
              <BasicInfoForm
                profile={profile}
                onSubmit={handleChangeBasicInfo}
              />
            </div>
            <div className="shadow bg-white">
              <PasswordForm onSubmit={handleChangePassword} />
            </div>
            <div className="shadow bg-white">
              <AddressList
                address={profile?.address}
                onAddNewAddress={handleAddNewAddress}
              />
            </div>
          </div>
        </div>
      </section>
    </ProfileContext.Provider>
  );
}
