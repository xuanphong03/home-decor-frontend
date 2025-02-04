import Slider from "react-slick";

export default function FeedbackList() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    cssEase: "linear",
  };
  return (
    <section className="bg-[#f5f5f5]">
      <div className="max-w-[1300px] mx-auto py-[100px]">
        <h2 className="text-center text-secondary text-4xl font-bold mb-[10px]">
          Khách hàng của chúng tôi nói gì?
        </h2>
        <p className="text-center text-[#777777] mb-[15px] text-[15px]">
          Chúng tôi yêu những gì chúng tôi làm. Khách hàng của chúng tôi nói với
          chúng tôi điều tương tự.
        </p>
        <div className="slider-container -mx-4">
          <Slider {...settings}>
            {[...Array(10)].map((_, index) => (
              <div key={index} className="px-4">
                <article className="bg-white p-10 flex items-start">
                  <div className="flex-shrink-0 size-24 rounded-full overflow-hidden border-2 border-solid border-primary mr-[35px]">
                    <img
                      alt="avatar"
                      src={`https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-5.jpg`}
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                  <div>
                    <q className="text-[15px] text-secondary">
                      Một trong những chủ đề đầy đủ nhất ở đây. Cảm ơn rất nhiều
                      vì các tính năng, trang, mã ngắn và biến thể trang chủ
                      tuyệt vời như vậy. Và trên hết, giá giới thiệu tuyệt vời.
                    </q>
                    <h3 className="text-primary font-semibold text-sm mt-[10px]">
                      Nguyễn Xuân Phong
                    </h3>
                  </div>
                </article>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
