import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function UpdateStatus({
  paymentStatus,
  shippingStatus,
  onClose,
  onSubmit,
}) {
  const schema = yup.object({
    paymentStatus: yup
      .string()
      .required("Vui lòng chọn trạng thái thanh toán."),
    shippingStatus: yup
      .string()
      .required("Vui lòng chọn trạng thái vận chuyển."),
  });
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      paymentStatus: paymentStatus,
      shippingStatus: shippingStatus,
    },
  });
  const handleCancelUpdate = () => {
    if (!onClose) return;
    onClose();
  };
  const handleSaveUpdate = async (data) => {
    if (!onSubmit) return;
    await onSubmit(data);
  };
  return (
    <div className="p-5 bg-white w-[500px]">
      <h2 className="font-bold mb-4">Cập nhật trạng thái đơn hàng</h2>
      <form onSubmit={handleSubmit(handleSaveUpdate)}>
        <div className="mb-4">
          <label className="inline-block mb-2">Trạng thái thanh toán</label>
          <div>
            <select
              {...register("paymentStatus")}
              className="border border-solid border-gray-300 px-4 py-1 outline-none w-full"
            >
              <option value={"UNPAID"}>Chưa thanh toán</option>
              <option value={"PAID"}>Đã thanh toán</option>
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label className="inline-block mb-2">Trạng thái thanh toán</label>
          <div>
            <select
              {...register("shippingStatus")}
              className="border border-solid border-gray-300 px-4 py-1 outline-none w-full"
            >
              <option value={"PENDING"}>Chờ xác nhận</option>
              <option value={"SHIPPING"}>Đang vận chuyển</option>
              <option value={"RECEIVED"}>Đã nhận hàng</option>
            </select>
          </div>
        </div>
        <div className="text-right space-x-2">
          <button
            type="button"
            onClick={handleCancelUpdate}
            className="px-4 py-1 bg-red-500 text-white rounded-sm hover:bg-opacity-80"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-1 bg-blue-500 text-white rounded-sm hover:bg-opacity-80"
          >
            Lưu trạng thái
          </button>
        </div>
      </form>
    </div>
  );
}
