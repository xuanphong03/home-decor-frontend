import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Box, Button, LinearProgress, Typography } from "@mui/material";
import { useContext } from "react";
import { authService } from "@/services/authService";
import { ForgotPasswordContext } from "../ForgotPassword";
import PasswordField from "./form-controls/PasswordField";
import { RiLockPasswordLine } from "react-icons/ri";

export default function ResetPasswordForm({
  activeStep,
  onBack,
  onNext,
  steps,
}) {
  const { email, setEmail, errorMessage, setErrorMessage } = useContext(
    ForgotPasswordContext
  );
  const schema = yup.object({
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
  });
  const handleSubmitForm = async (data) => {
    try {
      const response = await authService.resetPassword({
        email,
        password: data.password,
      });
      if (response?.success) {
        setEmail("");
        setErrorMessage(null);
        handleNext();
      }
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message || "Reset mật khẩu thất bại"
      );
    }
  };

  const handleBack = () => {
    onBack();
  };
  const handleNext = () => {
    onNext();
  };
  return (
    <>
      <Typography sx={{ mt: 2, mb: 1 }}>Bước {activeStep + 1}</Typography>
      <form onSubmit={handleSubmit(handleSubmitForm)} className="">
        {isSubmitting && (
          <div className="absolute top-0 left-0 right-0">
            <LinearProgress className="w-full" />
          </div>
        )}
        {errorMessage && (
          <Alert severity="error" className="mb-5">
            {errorMessage}
          </Alert>
        )}
        <div className="text-sm mb-4">
          <PasswordField
            id="password"
            placeholder="Nhập mật khẩu mới..."
            register={{ ...register("password") }}
            errorMessage={errors?.password?.message}
            startIcon={<RiLockPasswordLine />}
          />
        </div>
        <div className="text-sm">
          <PasswordField
            id="confirmPassword"
            placeholder="Nhập lại mật khẩu mới"
            register={{ ...register("confirmPassword") }}
            errorMessage={errors?.confirmPassword?.message}
            startIcon={<RiLockPasswordLine />}
          />
        </div>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Quay lại
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          <Button type="submit">
            {activeStep === steps.length - 1 ? "Hoàn thành" : "Tiếp"}
          </Button>
        </Box>
      </form>
    </>
  );
}
