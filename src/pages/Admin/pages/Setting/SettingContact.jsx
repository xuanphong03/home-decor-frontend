export default function SettingContact() {
  return (
    <section id="contact" className="bg-white shadow rounded mb-5">
      <div className="p-4">
        <h2 className="font-medium mb-4 text-xl">Thông tin liên hệ</h2>
        <form>
          <div className="mb-4 text-sm">
            <label htmlFor="contact-address" className="inline-block mb-2">
              Địa chỉ liên hệ
            </label>
            <div>
              <input
                type="text"
                id="contact-address"
                placeholder="Địa chỉ..."
                className="outline-none border border-solid border-gray-300 rounded px-4 py-2 w-full"
              />
            </div>
          </div>
          <div className="mb-4 text-sm">
            <label htmlFor="contact-phone-number" className="inline-block mb-2">
              Số điện thoại liên hệ
            </label>
            <div>
              <input
                type="text"
                id="contact-phone-number"
                placeholder="Địa chỉ..."
                className="outline-none border border-solid border-gray-300 rounded px-4 py-2 w-full"
              />
            </div>
          </div>
          <div className="mb-4 text-sm">
            <label htmlFor="contact-email" className="inline-block mb-2">
              Email hỗ trợ
            </label>
            <div>
              <input
                type="text"
                id="contact-email"
                placeholder="Địa chỉ..."
                className="outline-none border border-solid border-gray-300 rounded px-4 py-2 w-full"
              />
            </div>
          </div>
          <div className="mb-2 text-right">
            <button className="text-white bg-blue-500 px-5 py-2 rounded text-sm hover:bg-opacity-80">
              Lưu thông tin
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
