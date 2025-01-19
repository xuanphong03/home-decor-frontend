import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, LinearProgress, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch } from "react-redux";
import { fetchLoginAccount } from "@/stores/slices/authSlice";
import { useState } from "react";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const schema = yup.object({
    email: yup
      .string()
      .email("Email không hợp lệ")
      .required("Vui lòng nhập email"),
    password: yup.string().required("Vui lòng nhập mật khẩu"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLoginAccount = async (data) => {
    const resultAction = await dispatch(fetchLoginAccount(data));
    if (fetchLoginAccount.fulfilled?.match(resultAction)) {
      navigate("/");
      setErrorMessage(null);
    } else {
      setErrorMessage(
        "Tài khoản hoặc mật khẩu chưa chính xác. Vui lòng thử lại"
      );
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
          <h2 className="font-bold text-[#323232] text-[22px] mb-5">
            Đăng nhập
          </h2>
          {errorMessage && (
            <Alert severity="error" className="mb-5">
              {errorMessage}
            </Alert>
          )}
          <form
            onSubmit={handleSubmit(handleLoginAccount)}
            className="relative p-5 mb-[30px] border border-solid border-gray-200 overflow-hidden"
          >
            {isSubmitting && (
              <div className="absolute top-0 left-0 right-0">
                <LinearProgress className="w-full" />
              </div>
            )}
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
            <div className="flex items-center justify-between mb-5">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="remember_password" value={1} /> Nhớ
                mật khẩu
              </label>
              <p className="text-sm">
                Bạn chưa có tài khoản?{" "}
                <Link
                  to="/register"
                  className="text-primary hover:underline cursor-pointer"
                >
                  Đăng ký ngày
                </Link>
              </p>
            </div>
            <div className="mb-5">
              <button
                type="submit"
                className="uppercase py-3 px-7 text-sm bg-primary text-white hover:bg-secondary font-medium transition-all rounded"
              >
                Đăng nhập
              </button>
            </div>
            <Link
              to="/forgot-password"
              className="block text-sm underline text-primary pb-4"
            >
              Quên mật khẩu
            </Link>
          </form>
        </div>
      </section>
    </>
  );
}
