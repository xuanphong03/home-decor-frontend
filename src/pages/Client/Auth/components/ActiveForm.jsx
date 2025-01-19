import { userService } from "@/services/userService";
import { Alert, Dialog, DialogTitle } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ProfileContext } from "../Profile";

const getTimeLeft = (expiry) => {
  const difference = new Date(expiry).getTime() - new Date().getTime();
  if (difference <= 0) {
    return { minutes: "00", seconds: "00" };
  }
  const minutes = Math.floor((difference / (1000 * 60)) % 60).toString();
  const seconds = Math.floor((difference / 1000) % 60).toString();
  return {
    minutes: minutes.padStart(2, "0"),
    seconds: seconds.padStart(2, "0"),
  };
};

export default function ActiveForm({ onClose, open }) {
  const { profile, setProfile } = useContext(ProfileContext);
  const [expiry, setExpiry] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ minutes: "02", seconds: "00" });
  const [activeCode, setActiveCode] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const handleClose = () => {
    onClose();
  };
  const getActiveCode = async () => {
    if (!profile) return;
    try {
      const { email } = profile;
      await userService.getActiveCode({ email });
    } catch (error) {
      throw new Error("Failed to get active code");
    }
  };

  const handleVerifyActiveCode = async () => {
    if (!activeCode || !profile) return;
    try {
      const { email } = profile;
      const response = await userService.verifyActiveCode({
        activeCode,
        email,
      });
      if (response.success) {
        setProfile(response.data);
        setErrorMessage(null);
        toast.success("Kích hoạt tài khoản thành công");
        onClose();
      }
    } catch (error) {
      setErrorMessage("Mã xác minh không chính xác");
      throw new Error("Activate account failed");
    }
  };

  useEffect(() => {
    if (open) {
      const expiryTime = new Date().getTime() + 60 * 2 * 1000;
      setExpiry(expiryTime);
      getActiveCode();
    } else {
      setTimeLeft({ minutes: "02", seconds: "00" });
      setExpiry(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, profile]);

  useEffect(() => {
    if (!open || !expiry) return;
    const interval = setInterval(() => {
      const remainingTime = getTimeLeft(expiry);
      setTimeLeft(remainingTime);

      if (remainingTime.minutes === "00" && remainingTime.seconds === "00") {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiry, open]);

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Kích hoạt tài khoản</DialogTitle>
      <div className="px-5 pt-2 pb-5 w-[450px] text-sm">
        <div className="relative mb-2 rounded overflow-hidden">
          <input
            value={activeCode}
            onChange={(e) => setActiveCode(e.target.value)}
            type="text"
            name="activeCode"
            placeholder="Mã kích hoạt..."
            className="inline-block px-4 py-2 outline-none border border-solid border-gray-200 w-full"
          />
          <button className="absolute top-0 right-0 bottom-0 px-4 py-2 bg-green-500 text-white hover:bg-opacity-80 transition-all">
            Gửi lại mã ({timeLeft.minutes}:{timeLeft.seconds})
          </button>
        </div>
        {errorMessage && (
          <Alert severity="error" className="mb-2">
            {errorMessage}
          </Alert>
        )}
        <button
          onClick={handleVerifyActiveCode}
          className="w-full bg-blue-500 text-white px-4 py-3 rounded hover:bg-opacity-80 transition-all"
        >
          Xác minh tài khoản
        </button>
      </div>
    </Dialog>
  );
}
