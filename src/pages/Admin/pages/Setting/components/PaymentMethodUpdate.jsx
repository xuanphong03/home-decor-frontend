import { Switch } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import LoadingModal from "@/components/Loading/LoadingModal";

export default function PaymentMethodUpdate({
  paymentMethod,
  onClose,
  onSubmit,
}) {
  const schema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập tên phương thức thanh toán."),
    status: yup.bool(),
  });

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: paymentMethod?.name || "",
      status: paymentMethod?.status || false,
    },
    resolver: yupResolver(schema),
  });

  const handleSubmitForm = async (data) => {
    if (onSubmit) {
      await onSubmit(data);
    }
  };

  const handleClickClose = () => {
    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    setValue("name", paymentMethod?.name);
    setValue("status", paymentMethod?.status);
  }, [paymentMethod, setValue]);
  return (
    <>
      {isSubmitting && <LoadingModal />}
      <div className="p-5 bg-white rounded">
        <h2 className="mb-5 font-medium text-xl">
          Cập nhật phương thức thanh toán
        </h2>
        <form onSubmit={handleSubmit(handleSubmitForm)} className="w-[500px]">
          <div className="mb-4 text-sm">
            <label
              htmlFor="payment-method-name"
              className="mb-1 inline-block font-medium"
            >
              Tên phương thức thanh toán
            </label>
            <input
              {...register("name")}
              type="text"
              id="payment-method-name"
              placeholder="Nhập tên phương thức thanh toán..."
              className="w-full px-4 py-2 outline-none border border-solid border-gray-300 focus:border-gray-500 rounded-sm"
            />
            {errors?.name && (
              <p className="p-1 text-red-500">{errors?.name?.message}</p>
            )}
          </div>
          <div className="mb-4 text-sm flex items-center">
            <label className="font-medium">Trạng thái kích hoạt:</label>
            <Controller
              name="status"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Switch
                  color="info"
                  checked={value}
                  onChange={(e) => onChange(e.target.checked)}
                />
              )}
            />
          </div>
          <div className="text-sm flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={handleClickClose}
              className="px-5 py-2 rounded text-white bg-red-500 hover:bg-opacity-80 transition-colors"
            >
              Đóng
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded text-white bg-blue-500 hover:bg-opacity-80 transition-colors"
            >
              Lưu thông tin
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
