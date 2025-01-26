import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import LoadingModal from "@/components/Loading/LoadingModal";

export default function UserUpdate({ user, onClose, onSubmit }) {
  const schema = yup.object().shape({
    isAdmin: yup.bool(),
    isSupport: yup.bool(),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      isAdmin: user?.isAdmin || false,
      isSupport: user?.isSupport || false,
    },
    resolver: yupResolver(schema),
  });

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleSubmitForm = async (data) => {
    if (onSubmit) {
      await onSubmit(data);
    }
  };

  useEffect(() => {
    if (user) {
      setValue("isAdmin", user.isAdmin);
      setValue("isSupport", user.isSupport);
    }
  }, [user, setValue]);

  return (
    <>
      {isSubmitting && <LoadingModal />}
      <div className="p-5 shadow bg-white rounded overflow-y-auto w-[500px]">
        <h2 className="font-medium text-xl mb-4">Cập nhật người dùng</h2>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="mb-4">
            <label className="font-medium inline-block">Loại tài khoản</label>
            <div>
              <label className="flex items-center gap-1">
                <Controller
                  name="isAdmin"
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        type="checkbox"
                        {...field}
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                      <span>Tài khoản quản trị viên</span>
                    </>
                  )}
                />
              </label>
              <label className="flex items-center gap-1">
                <Controller
                  name="isSupport"
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        type="checkbox"
                        {...field}
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                      <span>Tài khoản hỗ trợ</span>
                    </>
                  )}
                />
              </label>
            </div>
          </div>
          <div className="text-right text-sm">
            <button
              type="button"
              onClick={handleClose}
              className="px-5 py-2 text-white bg-gray-500 hover:bg-opacity-80 transition-all rounded"
            >
              Đóng
            </button>
            <button
              type="submit"
              className="ml-2 px-5 py-2 text-white bg-blue-500 hover:bg-opacity-80 transition-all rounded"
            >
              Lưu thông tin
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
