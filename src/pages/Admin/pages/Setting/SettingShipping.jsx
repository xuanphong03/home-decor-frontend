export default function SettingShipping() {
  return (
    <section id="shipping" className="bg-white shadow rounded mb-5">
      <div className="p-4">
        <h2 className="font-medium mb-4 text-xl">Chi phí vận chuyển</h2>
        <form>
          <div className="text-sm mb-4">
            <label htmlFor="payment-method-name" className="inline-block mb-2">
              Phí vận chuyển mặc định
            </label>
            <div>
              <input
                type="text"
                id="default-shipping-fee"
                placeholder="Nhập phí vận chuyển mặc định..."
                className="outline-none border border-solid border-gray-300 rounded px-4 py-2 w-full"
              />
            </div>
          </div>
          <div className="text-sm mb-4">
            <label htmlFor="payment-method-name" className="inline-block mb-2">
              Giá trị tối thiểu của đơn hàng để được Freeship
            </label>
            <div>
              <input
                type="text"
                id="condition-free-shipping-fee"
                placeholder="Nhập giá tối thiểu của 1 đơn hàng..."
                className="outline-none border border-solid border-gray-300 rounded px-4 py-2 w-full"
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
