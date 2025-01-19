import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MdOutlineSecurity } from "react-icons/md";
import PasswordField from "./form-controls/PasswordField";
import { RiLockPasswordLine } from "react-icons/ri";

export default function PasswordForm({ onSubmit }) {
  const schema = yup.object({
    currentPassword: yup.string().required("Vui lòng nhập mật khẩu hiện tại"),
    newPassword: yup
      .string()
      .required("Vui lòng nhập mật khẩu mới")
      .min(6, "Mật khẩu phải chứa ít nhất 6 ký tự.")
      .max(256, "Mật khẩu không được chứa quá 256 ký tự"),
    confirmNewPassword: yup
      .string()
      .required("Vui lòng xác nhận mật khẩu mới")
      .oneOf([yup.ref("newPassword")], "Mật khẩu không khớp"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleChangePassword = async (data) => {
    if (onSubmit) {
      await onSubmit(data);
      reset();
    }
  };
  return (
    <div className="p-5">
      <h3 className="flex items-center gap-2 font-medium text-lg mb-5">
        <MdOutlineSecurity className="text-2xl" /> Mật khẩu
      </h3>
      <form onSubmit={handleSubmit(handleChangePassword)}>
        <div className="mb-4 text-sm">
          <PasswordField
            id="currentPassword"
            label="Mật khẩu hiện tại"
            placeholder="Nhập mật khẩu hiện tại..."
            register={{ ...register("currentPassword") }}
            errorMessage={errors?.currentPassword?.message}
            startIcon={<RiLockPasswordLine />}
          />
        </div>
        <div className="mb-4 text-sm">
          <PasswordField
            id="newPassword"
            label="Mật khẩu mới"
            placeholder="Nhập mật khẩu mới..."
            register={{ ...register("newPassword") }}
            errorMessage={errors?.newPassword?.message}
            startIcon={<RiLockPasswordLine />}
          />
        </div>
        <div className="mb-4 text-sm">
          <PasswordField
            id="confirmNewPassword"
            label="Xác nhận mật khẩu mới"
            placeholder="Nhập lại mật khẩu mới..."
            register={{ ...register("confirmNewPassword") }}
            errorMessage={errors?.confirmNewPassword?.message}
            startIcon={<RiLockPasswordLine />}
          />
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="px-5 py-2 rounded text-white bg-primary text-sm hover:bg-opacity-80 transition-all"
          >
            Thay đổi mật khẩu
          </button>
        </div>
      </form>
    </div>
  );
}
