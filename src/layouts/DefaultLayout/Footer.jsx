import { useState } from "react";
import { FaFacebookF, FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";

export default function Footer() {
  const [email, setEmail] = useState("");
  const handleChange = (event) => {
    setEmail(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <footer id="footer" className="text-[#e8e8e8]">
      <div className="bg-[#010101]">
        <section className="max-w-full lg:max-w-[1300px] mx-auto px-4">
          <div className="py-10 flex flex-wrap items-center justify-between -mx-4 gap-5 xl:gap-0">
            <div className="basis-full max-w-full xl:basis-1/2 xl:max-w-[50%] px-4 flex-1">
              <h3 className="text-[22px] xl:text-[32px] font-bold mb-[10px] text-white">
                Thông báo của chúng tôi
              </h3>
              <p className="basis-full max-w-full xl:basis-1/2 xl:max-w-[50%] text-[15px]">
                Đăng ký nhận thông báo của chúng tôi để nhận được thông báo và
                ưu đãi mới nhất.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="flex px-4 flex-1">
              <input
                value={email}
                onChange={handleChange}
                placeholder="Nhập email của bạn..."
                className="placeholder:text-secondary text-secondary rounded-l text-sm bg-white px-4 h-12 outline-none border border-solid border-primary transition-all flex-1"
              />
              <button className="rounded-r uppercase bg-primary text-sm text-white px-10 h-12 text-center">
                Đăng ký
              </button>
            </form>
          </div>
        </section>
        <div className="max-w-full lg:max-w-[1300px] mx-auto px-4 pt-[30px] pb-[50px] xl:pt-[60px] xl:pb-20">
          <div className="flex flex-wrap -mx-4">
            <div className="basis-full max-w-full xl:basis-1/3 xl:max-w-[33.33333%] px-4">
              <div className="mt-[30px]">
                <img
                  alt="logo"
                  src="https://ciyashop.potenzaglobalsolutions.com/decor/wp-content/uploads/sites/84/2020/08/logo-footer.png"
                  className="h-7 w-auto"
                />
              </div>
              <p className="mb-4 mt-[30px] text-[15px]">
                CiyaShop là một chủ đề WP thương mại điện tử hấp dẫn và dễ sử
                dụng cho phép bạn bán sản phẩm theo cách năng động.
              </p>
              <ul className="flex items-center gap-2 mt-[30px]">
                <li className="flex items-center justify-center size-9 rounded border border-solid border-gray-600 hover:bg-primary hover:border-primary cursor-pointer transition-all">
                  <FaFacebookF className="text-sm" />
                </li>
                <li className="flex items-center justify-center size-9 rounded border border-solid border-gray-600 hover:bg-primary hover:border-primary cursor-pointer transition-all">
                  <FaFacebookF className="text-sm" />
                </li>
                <li className="flex items-center justify-center size-9 rounded border border-solid border-gray-600 hover:bg-primary hover:border-primary cursor-pointer transition-all">
                  <FaFacebookF className="text-sm" />
                </li>
                <li className="flex items-center justify-center size-9 rounded border border-solid border-gray-600 hover:bg-primary hover:border-primary cursor-pointer transition-all">
                  <FaFacebookF className="text-sm" />
                </li>
              </ul>
            </div>
            <div className="basis-full max-w-full xl:basis-1/3 xl:max-w-[33.33333%] px-4">
              <div className="mt-[30px]">
                <h3 className="mb-6 text-[22px] xl:text-2xl font-semibold">
                  Liên hệ với cửa hàng của chúng tôi
                </h3>
                <ul className="flex flex-col gap-2">
                  <li className="flex items-start gap-2">
                    <FaLocationDot className="text-primary" />
                    <span className="text-[15px]">
                      Số 1 Ngõ 41 Trần Duy Hưng, Trung Hoà, Cầu Giấy, Hà Nội
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MdOutlineMail className="text-primary" />
                    <span className="text-[15px]">support@ciyashop.com</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaPhone className="text-primary" />
                    <span className="text-[15px]">126-632-2345</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="basis-full max-w-full xl:basis-1/3 xl:max-w-[33.33333%] px-4">
              <div className="mt-[30px] grid grid-cols-4 gap-1">
                <div className="col-span-1">
                  <img
                    alt="thumbnail product"
                    src="https://ciyashop.potenzaglobalsolutions.com/decor/wp-content/uploads/sites/84/2018/01/product8_01-150x150.jpg"
                    className="size-full object-cover"
                  />
                </div>
                <div className="col-span-1">
                  <img
                    alt="thumbnail product"
                    src="https://ciyashop.potenzaglobalsolutions.com/decor/wp-content/uploads/sites/84/2018/01/product3_01-150x150.jpg"
                    className="size-full object-cover"
                  />
                </div>
                <div className="col-span-1">
                  <img
                    alt="thumbnail product"
                    src="https://ciyashop.potenzaglobalsolutions.com/decor/wp-content/uploads/sites/84/2018/01/product3_02-150x150.jpg"
                    className="size-full object-cover"
                  />
                </div>
                <div className="col-span-1">
                  <img
                    alt="thumbnail product"
                    src="https://ciyashop.potenzaglobalsolutions.com/decor/wp-content/uploads/sites/84/2018/01/product5_01-150x150.jpg"
                    className="size-full object-cover"
                  />
                </div>
                <div className="col-span-1">
                  <img
                    alt="thumbnail product"
                    src="https://ciyashop.potenzaglobalsolutions.com/decor/wp-content/uploads/sites/84/2018/01/product4_01-150x150.jpg"
                    className="size-full object-cover"
                  />
                </div>
                <div className="col-span-1">
                  <img
                    alt="thumbnail product"
                    src="https://ciyashop.potenzaglobalsolutions.com/decor/wp-content/uploads/sites/84/2018/01/product1_01-150x150.jpg"
                    className="size-full object-cover"
                  />
                </div>
                <div className="col-span-1">
                  <img
                    alt="thumbnail product"
                    src="https://ciyashop.potenzaglobalsolutions.com/decor/wp-content/uploads/sites/84/2018/01/product2_01-150x150.jpg"
                    className="size-full object-cover"
                  />
                </div>
                <div className="col-span-1">
                  <img
                    alt="thumbnail product"
                    src="https://ciyashop.potenzaglobalsolutions.com/decor/wp-content/uploads/sites/84/2018/01/product7_01-150x150.jpg"
                    className="size-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="py-[25px] max-w-full lg:max-w-[1300px] mx-auto px-4 text-secondary text-[15px]">
        © Copyright 2024 Decor All Rights Reserved.
      </section>
    </footer>
  );
}
