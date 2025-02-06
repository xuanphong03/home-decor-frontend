import { Link } from "react-router-dom";

export default function ServiceList() {
  return (
    <>
      <section>
        <div className="flex px-[15px] py-[60px] lg:py-[160px] lg:px-[110px] items-center lg:h-[550px] bg-center bg-[url('https://ciyashop.potenzaglobalsolutions.com/decor/wp-content/uploads/sites/84/2020/08/section-bg1.jpg?id=13287')]">
          <div className=" text-white">
            <h3 className="uppercase tracking-[8px] text-[22px] font-medium mb-4">
              Modern Sofa
            </h3>
            <h2 className="text-[60px] lg:text-[75px] font-bold leading-[74px]">
              Ưu đãi tốt nhất
            </h2>
            <p className="mb-4 text-base lg:text-lg leading-[22px]">
              You will run aground and become hopelessly stuck in the mud
            </p>
            <button className="uppercase px-7 py-4 text-secondary bg-primary text-sm leading-tight font-medium hover:bg-secondary hover:text-white transition-all">
              Mua ngay
            </button>
          </div>
        </div>
        <div className="max-w-full lg:max-w-[1300px] mx-auto px-[15px]">
          <div className="pt-[100px] pb-[70px] flex gap-4 flex-wrap">
            <div className="basis-full max-w-full lg:basis-1/2 lg:max-w-[50%] bg-[#F6F6F6]">
              <div className="relative">
                <img
                  alt=""
                  src={`https://ciyashop.potenzaglobalsolutions.com/decor/wp-content/uploads/sites/84/2020/08/sub-banner-01.jpg`}
                  className="w-full h-auto"
                />
                <div className="absolute top-1/2 left-14 -translate-y-1/2">
                  <h3 className="text-3xl font-bold capitalize">
                    Comfort Sofa <br /> Chair
                  </h3>
                  <button className="flex items-center justify-center h-11 px-[25px] uppercase text-sm font-sm mt-[15px] text-secondary bg-primary hover:bg-secondary hover:text-white transition-all duration-300">
                    Mua ngay
                  </button>
                </div>
              </div>
            </div>
            <div className="basis-full max-w-full lg:basis-1/2 lg:max-w-[50%] bg-[#F6F6F6]">
              <div className="relative">
                <img
                  alt=""
                  src={`https://ciyashop.potenzaglobalsolutions.com/decor/wp-content/uploads/sites/84/2020/08/sub-banner-02.jpg`}
                  className="w-full h-auto"
                />
                <div className="absolute top-1/2 left-10 -translate-y-1/2">
                  <div className="text-2xl">20% OFF</div>
                  <div className="text-3xl text-primary font-bold">
                    Ưu đãi lớn
                  </div>
                  <div className="text-[28px] text-secondary font-bold">
                    Lighting
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  alt=""
                  src={`https://ciyashop.potenzaglobalsolutions.com/decor/wp-content/uploads/sites/84/2020/08/sub-banner-03.jpg`}
                  className="w-full h-auto"
                />
                <div className="absolute top-1/2 right-10 -translate-y-1/2 text-right">
                  <h3 className="text-2xl font-semibold">Sang trọng</h3>
                  <h4 className="text-3xl font-semibold">New Desk</h4>
                  <div className="mt-[15px]">
                    <Link
                      to="#"
                      className="text-primary text-sm underline hover:text-secondary transition-colors duration-300"
                    >
                      Mua ngay
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pb-[70px] max-w-full lg:max-w-[1300px] mx-auto">
        <div className="flex flex-wrap px-[15px] items-center justify-between -mx-[15px]">
          <div className="basis-full max-w-full lg:basis-1/3 lg:max-w-[33.333333%] px-[15px] pb-[30px]">
            <article className="p-[30px] text-center bg-[#fbccd4]">
              <h3 className="text-secondary text-[26px] font-semibold mb-[10px]">
                Miễn phí vận chuyển
              </h3>
              <p className="text-[15px] text-[#777777]">
                Miễn phí vận chuyển tất cả đơn hàng giá trị trên 1 triệu
              </p>
            </article>
          </div>
          <div className="basis-full max-w-full lg:basis-1/3 lg:max-w-[33.333333%] px-[15px] pb-[30px]">
            <article className="p-[30px] text-center bg-[#ccebfb]">
              <h3 className="text-secondary text-[26px] font-semibold mb-[10px]">
                Hoàn trả trong 30 ngày
              </h3>
              <p className="text-[15px] text-[#777777]">
                Sản phẩm có lỗi trong vòng 30 ngày được đổi trả.
              </p>
            </article>
          </div>
          <div className="basis-full max-w-full lg:basis-1/3 lg:max-w-[33.333333%] px-[15px] pb-[30px]">
            <article className="p-[30px] text-center bg-[#fbeccc]">
              <h3 className="text-secondary text-[26px] font-semibold mb-[10px]">
                Hỗ trợ 24/7
              </h3>
              <p className="text-[15px] text-[#777777]">
                Đội ngũ hỗ trợ thân thiện của chúng tôi luôn sẵn sàng trợ giúp
                24/7
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
