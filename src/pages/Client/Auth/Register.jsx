import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, LinearProgress, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchRegisterAccount } from "@/stores/slices/authSlice";
import { toast } from "react-toastify";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const schema = yup.object({
    name: yup.string().required("Vui lòng nhập họ và tên"),
    email: yup
      .string()
      .email("Email không hợp lệ")
      .required("Vui lòng nhập email"),
    password: yup
      .string()
      .required("Vui lòng nhập mật khẩu")
      .min(6, "Mật khẩu phải chứa ít nhất 6 ký tự.")
      .max(256, "Mật khẩu không được chứa quá 256 ký tự"),
    confirmPassword: yup
      .string()
      .required("Vui lòng xác nhận mật khẩu")
      .oneOf([yup.ref("password")], "Mật khẩu không khớp"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleRegisterAccount = async (data) => {
    delete data.confirmPassword;
    const resultAction = await dispatch(fetchRegisterAccount(data));
    if (fetchRegisterAccount.fulfilled?.match(resultAction)) {
      navigate("/");
      setErrorMessage(null);
      return toast.success("Đăng ký thành công");
    } else {
      const { message } = resultAction.payload;
      setErrorMessage(message);
    }
  };

  return (
    <>
      <section className="py-[10px] mt-[90px] bg-[#FBFBFB] shadow-sm">
        <div className="max-w-full lg:max-w-[1300px] mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <h1 className="text-[26px] font-semibold text-[#323232]">
              Tài khoản
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
                Tài khoản
              </Typography>
            </Breadcrumbs>
          </div>
        </div>
      </section>

      <section className="py-[60px]">
        <div className="max-w-full lg:max-w-[1300px] mx-auto px-4">
          <h2 className="font-bold text-[#323232] text-[22px] mb-5">Đăng ký</h2>
          {errorMessage && (
            <Alert severity="error" className="mb-5">
              {errorMessage}
            </Alert>
          )}
          <form
            onSubmit={handleSubmit(handleRegisterAccount)}
            className="relative p-5 mb-[30px] border border-solid border-gray-200"
          >
            {isSubmitting && (
              <div className="absolute top-0 left-0 right-0">
                <LinearProgress className="w-full" />
              </div>
            )}
            <div className="mb-5">
              <label
                htmlFor="name"
                className="text-[#777777] text-sm mb-2 block"
              >
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                className="w-full px-4 bg-white outline-none h-12 border border-solid border-gray-200 rounded focus:border-[#FFA800] transition-all"
                {...register("name")}
              />
              {errors?.name && (
                <p className="text-sm text-red-500">{errors?.name?.message}</p>
              )}
            </div>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="text-[#777777] text-sm mb-2 block"
              >
                Địa chỉ email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="text"
                className="w-full px-4 bg-white outline-none h-12 border border-solid border-gray-200 rounded focus:border-[#FFA800] transition-all"
                {...register("email")}
              />
              {errors?.email && (
                <p className="text-sm text-red-500">{errors?.email?.message}</p>
              )}
            </div>
            <div className="mb-5">
              <label className="text-[#777777] text-sm mb-2 block">
                Mật khẩu <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-4 bg-white outline-none h-12 border border-solid border-gray-200 rounded focus:border-[#FFA800] transition-all"
                {...register("password")}
              />
              {errors?.password && (
                <p className="text-sm text-red-500">
                  {errors?.password?.message}
                </p>
              )}
            </div>
            <div className="mb-5">
              <label className="text-[#777777] text-sm mb-2 block">
                Xác nhận mật khẩu <span className="text-red-500">*</span>
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="w-full px-4 bg-white outline-none h-12 border border-solid border-gray-200 rounded focus:border-[#FFA800] transition-all"
                {...register("confirmPassword")}
              />
              {errors?.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors?.confirmPassword?.message}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between mb-5">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="remember_password" value={1} /> Nhớ
                mật khẩu
              </label>
              <p className="text-sm">
                Bạn đã có tài khoản?{" "}
                <Link
                  to="/login"
                  className="text-primary hover:underline cursor-pointer"
                >
                  Đăng nhập ngay
                </Link>
              </p>
            </div>
            <div className="mb-5">
              <button
                type="submit"
                className="uppercase py-3 px-7 text-sm bg-primary text-white hover:bg-secondary font-medium transition-all rounded"
              >
                Đăng ký ngay
              </button>
            </div>
            <Link to="#" className="block text-sm underline text-primary pb-4">
              Quên mật khẩu
            </Link>
          </form>
        </div>
      </section>
    </>
  );
}
