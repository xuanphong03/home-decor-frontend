import HomeIcon from "@mui/icons-material/Home";
import {
  Alert,
  Box,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import React, { createContext, useState } from "react";
import { Link } from "react-router-dom";
import EmailForm from "./components/EmailForm";
import VerificationCodeForm from "./components/VerificationCodeForm";
import ResetPasswordForm from "./components/ResetPasswordForm";

const steps = [
  "Nhập email người dùng",
  "Xác nhận mã kích hoạt",
  "Đặt lại mật khẩu",
];

export const ForgotPasswordContext = createContext(null);

export default function ForgotPassword() {
  const [activeStep, setActiveStep] = useState(2);
  const [errorMessage, setErrorMessage] = useState(null);
  const [email, setEmail] = useState("");

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <ForgotPasswordContext.Provider
      value={{ email, setEmail, errorMessage, setErrorMessage }}
    >
      <section className="py-[10px] mt-[90px] bg-[#FBFBFB] shadow-sm">
        <div className="max-w-full lg:max-w-[1300px] mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <h1 className="text-[26px] font-semibold text-[#323232]">
              Quên mật khẩu
            </h1>
            <Breadcrumbs aria-label="breadcrumb">
              <Link to={"/"} className="flex items-center">
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                <span className="text-sm">Trang chủ</span>
              </Link>
              <Link to={"/login"} className="flex items-center">
                <span className="text-sm">Tài khoản</span>
              </Link>
              <Typography
                sx={{
                  color: "text.primary",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "14px",
                }}
              >
                Quên mật khẩu
              </Typography>
            </Breadcrumbs>
          </div>
        </div>
      </section>

      <section className="py-[60px]">
        <div className="max-w-full lg:max-w-[1300px] mx-auto px-4">
          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label) => {
                const stepProps = {};
                const labelProps = {};

                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>

            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  <Alert severity="success" className="mb-5">
                    Mật khẩu đã được đặt lại - bạn đã hoàn tất
                  </Alert>
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Link
                    to="/login"
                    className="inline-block uppercase py-3 px-7 text-sm bg-primary text-white hover:bg-secondary font-medium transition-all rounded"
                  >
                    Đăng nhập
                  </Link>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {activeStep === 0 && (
                  <EmailForm
                    steps={steps}
                    activeStep={activeStep}
                    onBack={handleBack}
                    onNext={handleNext}
                  />
                )}
                {activeStep === 1 && (
                  <VerificationCodeForm
                    steps={steps}
                    activeStep={activeStep}
                    onBack={handleBack}
                    onNext={handleNext}
                  />
                )}
                {activeStep === 2 && (
                  <ResetPasswordForm
                    steps={steps}
                    activeStep={activeStep}
                    onBack={handleBack}
                    onNext={handleNext}
                  />
                )}
              </React.Fragment>
            )}
          </Box>
        </div>
      </section>
    </ForgotPasswordContext.Provider>
  );
}
