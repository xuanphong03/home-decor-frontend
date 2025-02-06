import Slider from "react-slick";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
// Redux
import { useSelector } from "react-redux";
// Components
import { Tooltip } from "@mui/material";
import Tag from "@/components/Tag/Tag";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaCompressAlt, FaRegHeart, FaShoppingCart } from "react-icons/fa";
// Constants
import { tag_types } from "@/constants/tag-types";
// Service Api
import { productService } from "@/services/productService";
// CSS
import "./NewProductList.scss";
import { cartService } from "@/services/cartService";
import { toast } from "react-toastify";
import { AppContext } from "@/App";

function ProductItem(product) {
  const { id, name, category, imageUrl, quantity, salePercent, originalPrice } =
    product;
  const auth = useSelector((state) => state.auth);
  const isAuthenticated = Boolean(auth?.accessToken);
  const { setCartItems } = useContext(AppContext);

  const handleAddToCart = async (event) => {
    try {
      event.preventDefault();
      event.stopPropagation();
      if (!product.quantity) return;
      if (!isAuthenticated) return toast.info("Vui lòng đăng nhập");
      const response = await cartService.addToCart({
        id: id,
        quantity: 1,
      });
      setCartItems(response.data.products);
      return toast.success("Đã thêm vào giỏ hàng!");
    } catch (error) {
      return toast.error(error.response.data.message);
    }
  };

  const handleToggleWishlist = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <article className="group border border-solid border-gray-200">
      <div className="relative w-full aspect-square overflow-hidden">
        <img
          alt={name}
          src={imageUrl}
          className="absolute w-full h-full object-cover group-hover:scale-110 duration-500 transition-all"
        />
        <div className="absolute top-3 right-0">
          <div className="mb-2">
            {salePercent > 0 && <Tag type={tag_types.SALE} />}
          </div>
        </div>
        <div className="absolute top-3 left-3 text-xs text-white">
          {quantity ? (
            <div className="bg-[#61d008cc] px-2 py-1 rounded-sm">
              {quantity} sản phẩm
            </div>
          ) : (
            <div className="bg-[#de4646] px-2 py-1 rounded-sm">Hết hàng</div>
          )}
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1/2 z-10 flex gap-2 items-center transition-all">
          <div className="flex items-center gap-4">
            <Tooltip title={"Thêm vào giỏ hàng"} placement="top">
              <button
                onClick={handleAddToCart}
                className="flex size-10 items-center justify-center bg-white shadow rounded text-secondary hover:text-primary transition-all"
              >
                <FaShoppingCart />
              </button>
            </Tooltip>
            <Tooltip title={"Yêu thích"} placement="top">
              <button
                onClick={handleToggleWishlist}
                className="flex size-10 items-center justify-center bg-white shadow rounded "
              >
                <FaRegHeart className="text-secondary hover:text-primary transition-all" />
              </button>
            </Tooltip>
            <Tooltip title={"So sánh"} placement="top">
              <button className="flex size-10 items-center justify-center bg-white shadow rounded text-secondary hover:text-primary transition-all">
                <FaCompressAlt />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="p-5 flex flex-col gap-1 items-center font-medium">
        <h3 className="text-sm text-[#ababab] hover:text-secondary transition-all cursor-pointer">
          {name}
        </h3>
        <h4 className="text-sm text-[#323232] hover:text-primary transition-all cursor-pointer">
          {category.name}
        </h4>
        <p className="text-base flex gap-2 items-center font-semibold">
          {salePercent > 0 && (
            <span className="line-through text-gray-400">
              {(+originalPrice)?.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          )}
          <span className="text-[#323232]">
            {(((100 - salePercent) / 100) * originalPrice)?.toLocaleString(
              "vi-VN",
              {
                style: "currency",
                currency: "VND",
              }
            )}
          </span>
        </p>
      </div>
    </article>
  );
}

export default function NewProductList() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
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
  const [productList, setProductList] = useState([]);
  let sliderRef = useRef(null);

  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };

  const getProducts = async () => {
    try {
      const response = await productService.getAll({ _new: true });
      const { products } = response.data;
      setProductList(products);
    } catch (error) {
      throw new Error("Fetch products to failed");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className="mb-[100px] max-w-[1300px] mx-auto px-[15px]">
      <div className="text-center mb-[15px]">
        <h2 className="text-secondary text-[22px] lg:text-[32px] font-bold mb-[10px]">
          Sản phẩm mới
        </h2>
        <p className="text-[#777777] text-[15px]">
          Thành công là thứ mà tất cả chúng ta đều mong muốn nhiều hơn nữa.
        </p>
      </div>
      <div className="slider-container relative -mx-4 product-list">
        <Slider
          ref={(slider) => {
            sliderRef = slider;
          }}
          {...settings}
        >
          {productList.map((product) => (
            <div key={product.id} className="px-4">
              <Link to={`/products/${product.id}`}>
                <ProductItem {...product} />
              </Link>
            </div>
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
    </section>
  );
}
