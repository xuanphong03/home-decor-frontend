import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "./form-controls/TextField";
import { Alert, Box, Button, LinearProgress, Typography } from "@mui/material";
import { useContext } from "react";
import { authService } from "@/services/authService";
import { ForgotPasswordContext } from "../ForgotPassword";
import { MdOutlineNumbers } from "react-icons/md";

export default function VerificationCodeForm({
  activeStep,
  onBack,
  onNext,
  steps,
}) {
  const { email, errorMessage, setErrorMessage } = useContext(
    ForgotPasswordContext
  );
  const schema = yup.object({
    verificationCode: yup.string().required("Vui lòng nhập mã xác minh"),
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
      const { verificationCode } = data;
      const response = await authService.verifyAccount({
        email,
        verificationCode,
      });
      if (response?.success) {
        setErrorMessage(null);
        handleNext();
      }
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message || "Mã kích xác minh không hợp lệ"
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
        <div className="text-sm">
          <TextField
            id="verificationCode"
            placeholder="Nhập mã xác minh tài khoản..."
            register={{ ...register("verificationCode") }}
            errorMessage={errors?.verificationCode?.message}
            startIcon={<MdOutlineNumbers />}
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
