import { paymentMethodService } from "@/services/paymentMethodService";
import { useEffect, useState } from "react";
import PaymentMethodUpdate from "./components/PaymentMethodUpdate";
import { toast } from "react-toastify";
import { cloneDeep } from "lodash";

export default function SettingPayment() {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const [updatedPaymentMethod, setUpdatedPaymentMethod] = useState(null);

  const getPaymentMethods = async () => {
    try {
      const response = await paymentMethodService.getAll();
      setPaymentMethods(response.data);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  const handleClickEdit = (paymentMethod) => {
    setOpenUpdateForm(true);
    setUpdatedPaymentMethod(paymentMethod);
  };

  const handleClickClose = () => {
    setOpenUpdateForm(false);
    setUpdatedPaymentMethod(null);
  };

  const handleClickUpdate = async (data) => {
    try {
      const response = await paymentMethodService.update(
        updatedPaymentMethod?.id,
        data
      );
      const method = response.data;
      setPaymentMethods((prevData) => {
        const nextData = cloneDeep(prevData);
        const targetMethod = nextData.find(
          (item) => item.id === updatedPaymentMethod.id
        );
        if (targetMethod) {
          targetMethod.name = method.name;
          targetMethod.status = method.status;
        }
        return nextData;
      });
      return toast.success(response.message);
    } catch (error) {
      return toast.error(error.response.data.message);
    } finally {
      setOpenUpdateForm(false);
      setUpdatedPaymentMethod(null);
    }
  };

  const handleClickDelete = async (id) => {
    try {
      const response = await paymentMethodService.remove(id);
      return toast.success(response.message);
    } catch (error) {
      return toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getPaymentMethods();
  }, []);

  return (
    <>
      {openUpdateForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="relative">
            <PaymentMethodUpdate
              paymentMethod={updatedPaymentMethod}
              onClose={handleClickClose}
              onSubmit={handleClickUpdate}
            />
          </div>
        </div>
      )}
      <section id="payment" className="bg-white shadow rounded mb-5">
        <div className="p-4">
          <h2 className="font-medium mb-4 text-xl">Phương thức thanh toán</h2>
          <form className="mb-4">
            <div className="grid grid-cols-5 gap-x-5">
              <div className="text-sm col-span-4">
                <label
                  htmlFor="payment-method-name"
                  className="inline-block mb-2"
                >
                  Tên phương thức thanh toán
                </label>
                <div>
                  <input
                    type="text"
                    id="payment-method-name"
                    placeholder="Tên phương thức thanh toán..."
                    className="outline-none border border-solid border-gray-300 rounded px-4 py-2 w-full"
                  />
                </div>
              </div>
              <div className="flex items-end text-sm col-span-1 text-right">
                <button className="text-white bg-blue-500 px-5 py-2 rounded text-sm hover:bg-opacity-80">
                  Thêm mới
                </button>
              </div>
            </div>
          </form>
          <hr className="my-4"></hr>
          <ul className="list-decimal pl-4">
            {paymentMethods.map((paymentMethod) => (
              <li key={paymentMethod?.id} className="text-sm mb-4">
                <span>{paymentMethod?.name}</span>
                <button
                  onClick={() => handleClickEdit(paymentMethod)}
                  className="hover:text-opacity-80 underline text-blue-500 ml-4"
                >
                  Chỉnh sửa
                </button>
                <button
                  onClick={() => handleClickDelete(paymentMethod.id)}
                  className="hover:text-opacity-80 underline text-red-500 ml-2"
                >
                  Xóa
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
