import { useEffect, useState } from "react";
import Slider from "react-slick";

export default function BrandList() {
  const settings = {
    infinite: true,
    speed: 750,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
    cssEase: "ease",
  };
  const [brandList, setBrandList] = useState([]);

  const getBrands = async () => {
    setBrandList([
      {
        id: 1,
        imageUrl:
          "https://ciyashop.potenzaglobalsolutions.com/decor/wp-content/uploads/sites/84/2020/08/flexor-dark.png",
      },
      {
        id: 2,
        imageUrl:
          "https://ciyashop.potenzaglobalsolutions.com/decor/wp-content/uploads/sites/84/2020/08/hi-soft-dark.png",
      },
      {
        id: 3,
        imageUrl:
          "https://ciyashop.potenzaglobalsolutions.com/decor/wp-content/uploads/sites/84/2020/08/finaxo-dark.png",
      },
      {
        id: 4,
        imageUrl:
          "https://ciyashop.potenzaglobalsolutions.com/decor/wp-content/uploads/sites/84/2020/08/sitter-dark.png",
      },
      {
        id: 5,
        imageUrl:
          "https://ciyashop.potenzaglobalsolutions.com/decor/wp-content/uploads/sites/84/2020/08/corps-dark.png",
      },
      {
        id: 6,
        imageUrl:
          "https://ciyashop.potenzaglobalsolutions.com/decor/wp-content/uploads/sites/84/2020/08/realvilla-dark.png",
      },
      {
        id: 7,
        imageUrl:
          "https://ciyashop.potenzaglobalsolutions.com/decor/wp-content/uploads/sites/84/2020/08/mentor-dark.png",
      },
    ]);
  };

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <section className="py-10 max-w-[1300px] mx-auto px-[15px]">
      <ul className="slider-container -mx-4">
        <Slider {...settings}>
          {brandList.map((brand) => (
            <li key={brand.id} className="px-4">
              <div className="h-[80px] py-[10px]">
                <img
                  alt=""
                  src={brand.imageUrl}
                  className="h-full w-auto object-cover"
                />
              </div>
            </li>
          ))}
        </Slider>
      </ul>
    </section>
  );
}
