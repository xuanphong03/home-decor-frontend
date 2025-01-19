import { Link } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRef } from "react";
import Slider from "react-slick";
import "./LatestPost.scss";

export default function LatestPost() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  let sliderRef = useRef(null);

  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };

  return (
    <section className="pt-[50px] xl:pt-[100px] pb-[50px]">
      <div className="mx-auto max-w-[1300px] px-[15px]">
        <div className="text-center">
          <h2 className="font-bold text-[26px] xl:text-4xl mb-[10px]">
            Bài đăng mới nhất
          </h2>
          <p className="text-[15px] text-[#777777] mb-[15px]">
            Hãy cho mình sức mạnh của trách nhiệm. Hãy nhắc nhở bản thân rằng
            điều duy nhất ngăn cản bạn là chính bạn.
          </p>
        </div>
        <div className="slider-container relative -mx-4 product-list">
          <Slider
            ref={(slider) => {
              sliderRef = slider;
            }}
            {...settings}
          >
            {[...Array(10)].map((_, index) => (
              <article key={index} className="relative px-4">
                <img
                  alt=""
                  src={`https://ciyashop.potenzaglobalsolutions.com/decor/wp-content/uploads/sites/84/2017/08/blog-04-500x375.jpg`}
                  className="max-w-full h-auto"
                />
                <div className="mx-auto -bottom-1/2 -translate-y-1/2 w-4/5 bg-white shadow text-center pt-10 px-5 pb-[15px]">
                  <h4 className="font-bold mb-[10px] text-secondary hover:text-primary transition-all cursor-pointer">
                    Blog post with image
                  </h4>
                  <p className="text-[15px] text-[#777777] mb-[15px]">
                    Success isn’t really that difficult. there is a significant
                    portion of the...
                  </p>
                  <button className="text-sm text-primary font-semibold hover:text-secondary transition-all">
                    <Link to="#">Read more...</Link>
                  </button>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-primary shadow">
                    <p className="w-[60px] py-2 text-lg font-semibold leading-none text-center">
                      02 <br />
                      <span className="text-sm">JUN</span>
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </Slider>
          <button
            onClick={previous}
            className="prev-btn flex items-center justify-center absolute top-1/2 left-0 -translate-y-1/2 z-20 h-12 text-3xl bg-secondary text-white hover:bg-primary transition-all rounded-sm"
          >
            <IoIosArrowBack />
          </button>
          <button
            onClick={next}
            className="next-btn flex items-center justify-center absolute top-1/2 right-0 -translate-y-1/2 z-20 h-12 text-3xl bg-secondary text-white hover:bg-primary transition-all rounded-sm"
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </section>
  );
}
