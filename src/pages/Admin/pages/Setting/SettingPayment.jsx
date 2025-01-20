export default function SettingPayment() {
  return (
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
          <li className="text-sm mb-4">
            <span>Thanh toán khi nhận hàng</span>
            <button className="hover:text-opacity-80 underline text-blue-500 ml-4">
              Chỉnh sửa
            </button>
            <button className="hover:text-opacity-80 underline text-red-500 ml-2">
              Xóa
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
}
