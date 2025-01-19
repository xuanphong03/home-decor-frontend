import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "./form-controls/TextField";
import { HiOutlineMail } from "react-icons/hi";
import { Alert, Box, Button, LinearProgress, Typography } from "@mui/material";
import { useContext } from "react";
import { authService } from "@/services/authService";
import { ForgotPasswordContext } from "../ForgotPassword";

export default function EmailForm({ activeStep, onBack, onNext, steps }) {
  const { email, setEmail, errorMessage, setErrorMessage } = useContext(
    ForgotPasswordContext
  );
  const schema = yup.object({
    email: yup
      .string()
      .email("Email không hợp lệ")
      .required("Vui lòng nhập email"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email,
    },
  });
  const handleSubmitForm = async (data) => {
    try {
      const response = await authService.forgotPassword(data);
      if (response?.success) {
        setEmail(data.email);
        setErrorMessage(null);
        handleNext();
      }
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || "Email không tồn tại");
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
            id="email"
            placeholder="Nhập địa chỉ email..."
            register={{ ...register("email") }}
            errorMessage={errors?.email?.message}
            startIcon={<HiOutlineMail />}
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
