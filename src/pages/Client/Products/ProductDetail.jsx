import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { productService } from "@/services/productService";

// Components
import {
  FaCartPlus,
  FaExpandAlt,
  FaExpandArrowsAlt,
  FaFacebookF,
  FaHeart,
  FaLinkedinIn,
  FaPinterest,
  FaRegHeart,
  FaTwitter,
} from "react-icons/fa";
import Slider from "react-slick";
import Tag from "@/components/Tag/Tag";
import HomeIcon from "@mui/icons-material/Home";
import ProductReview from "./components/ProductDetail/ProductReview";
import ProductDescription from "./components/ProductDetail/ProductDescription";
import { Alert, Box, Breadcrumbs, Skeleton, Typography } from "@mui/material";
import ProductItem from "./components/ProductList/ProductItem";
import ReactImageMagnifier from "simple-image-magnifier/react";
// Constants
import { tag_types } from "@/constants/tag-types";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "@/stores/slices/wishlistSlice";

// CSS
import "./ProductDetail.scss";
import { cartService } from "@/services/cartService";
import { AppContext } from "@/App";
import { toast } from "react-toastify";
import { cloneDeep } from "lodash";

export default function ProductDetail() {
  const settings = {
    speed: 750,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    cssEase: "ease",
    infinite: false,
  };

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productList: wishlistProducts } = useSelector(
    (state) => state.wishlist
  );
  const { setCartItems } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [productDetail, setProductDetail] = useState(null);
  const [relatedProductList, setRelatedProductList] = useState([]);
  const [productQuantity, setProductQuantity] = useState(0);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [alert, setAlert] = useState(null);
  const auth = useSelector((state) => state.auth);
  const isAuthenticated = Boolean(auth?.accessToken);

  const isFavorite = useMemo(() => {
    const product = wishlistProducts.find((p) => p.id === +id);
    return Boolean(product);
  }, [id, wishlistProducts]);

  const getProductDetail = async () => {
    try {
      setLoading(true);
      const response = await productService.getDetail(id);
      setProductDetail(response.data);
    } catch (error) {
      navigate("/not-found");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const getRelatedProducts = async (categoryId) => {
    try {
      const params = {
        productId: +id,
        categoryId: +categoryId,
        _page: 1,
        _limit: 10,
      };
      const response = await productService.getRelated(params);
      const { products } = response.data;
      setRelatedProductList(products);
    } catch (error) {
      throw new Error("fetch to failed");
    }
  };

  const handleChangeTab = (event) => {
    setActiveTabIndex(+event.target.value);
  };

  const handleDecrement = () => {
    if (productQuantity <= 0) return;
    setProductQuantity(productQuantity - 1);
  };

  const handleIncrement = () => {
    if (productQuantity >= 100) return;
    setProductQuantity(productQuantity + 1);
  };

  const handleChangeProductQuantity = (event) => {
    let productQuantity = Number(event.target.value);
    if (isNaN(productQuantity)) return;
    setProductQuantity(productQuantity <= 9999 ? productQuantity : 9999);
  };

  const handleAddToCart = async () => {
    try {
      if (!isAuthenticated) return toast.info("Vui lòng đăng nhập");
      if (!productQuantity || !productDetail.quantity) return;
      const response = await cartService.addToCart({
        id: productDetail.id,
        quantity: productQuantity,
      });
      setCartItems(response.data.products);
      setAlert({
        type: "success",
        message: `Thêm sản phẩm vào giỏ hàng thành công!`,
      });
    } catch (error) {
      setAlert({
        type: "error",
        message: `Số lượng sản phẩm trong giỏ hàng không được vượt quá số lượng sản phẩm trong kho. (Tối đa ${productDetail.quantity} sản phẩm)`,
      });
    }
  };

  const handleAddToWishlist = () => {
    if (productDetail) {
      dispatch(toggleWishlist(productDetail));
    }
  };

  const handleReviewProduct = async (data) => {
    try {
      const payload = {
        productId: +id,
        rating: data?.rating,
        content: data?.review,
      };
      const response = await productService.reviewProduct(payload);
      setProductDetail((prevData) => {
        const nextData = cloneDeep(prevData);
        nextData.reviews = [...nextData.reviews, response.data];
        return nextData;
      });
      return toast.success(response.message);
    } catch (error) {
      return toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getProductDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (productDetail) {
      const categoryId = productDetail.categoryId;
      getRelatedProducts(categoryId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productDetail]);

  return (
    <>
      <section className="py-[10px] mt-[90px] bg-[#FBFBFB] shadow-sm">
        <div className="max-w-full lg:max-w-[1300px] mx-auto px-4 py-2">
          <Breadcrumbs aria-label="breadcrumb">
            <Link to={"/"} className="flex items-center">
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              <span className="text-sm">Trang chủ</span>
            </Link>
            <Link to={"/products"} className="flex items-center">
              <span className="text-sm">Sản phẩm</span>
            </Link>
            <Typography
              sx={{
                color: "text.primary",
                display: "flex",
                alignItems: "center",
                fontSize: "14px",
              }}
            >
              {productDetail?.name}
            </Typography>
          </Breadcrumbs>
        </div>
      </section>

      <section className="pt-[60px]">
        <div className="max-w-full lg:max-w-[1300px] mx-auto px-4 grid grid-cols-2 gap-5">
          {alert && (
            <Alert severity={alert.type} className="col-span-full">
              {alert.message}
            </Alert>
          )}
          <div className="col-span-1">
            {!loading && (
              <div className="relative w-full mb-2">
                <ReactImageMagnifier
                  alt={productDetail?.name}
                  srcPreview={productDetail?.imageUrl}
                  srcOriginal={productDetail?.imageUrl}
                  width={"100%"}
                  className="max-w-full h-auto cursor-zoom-in"
                />
                <div className="absolute top-4 right-0">
                  <div className="mb-2">
                    <Tag type={tag_types.HOT} />
                  </div>
                  <div className="mb-2">
                    <Tag type={tag_types.SALE} />
                  </div>
                </div>
                <div className="absolute flex items-center justify-center bottom-0 right-0 bg-white size-12 rounded-tl-lg">
                  <div className="flex items-center justify-center size-8 border border-solid border-gray-200 rounded hover:bg-secondary hover:text-white transition-colors cursor-pointer">
                    <FaExpandArrowsAlt />
                  </div>
                </div>
              </div>
            )}
            {loading && (
              <Box className="w-full aspect-square rounded overflow-hidden">
                <Skeleton
                  variant="rectangular"
                  sx={{ width: "100%", height: "100%" }}
                />
              </Box>
            )}
          </div>
          <div className="col-span-1 px-4">
            {!loading ? (
              <h1 className="font-semibold text-2xl leading-8 mb-2">
                {productDetail?.name}
              </h1>
            ) : (
              <div className="h-8 rounded overflow-hidden mb-2">
                <Skeleton
                  variant="rectangular"
                  sx={{ width: "75%", height: "100%" }}
                />
              </div>
            )}
            {loading ? (
              <div className="h-8 rounded overflow-hidden mb-4">
                <Skeleton
                  variant="rectangular"
                  sx={{ width: "50%", height: "100%" }}
                />
              </div>
            ) : (
              <p className="font-semibold flex gap-2 items-end mb-4">
                {productDetail.salePercent > 0 && (
                  <span className="text-xl text-black text-opacity-30 line-through leading-none">
                    {productDetail?.originalPrice.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                )}
                <span className="text-[26px] text-primary leading-none">
                  {productDetail?.finalPrice.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </p>
            )}
            {loading ? (
              <div className="mb-5">
                <Skeleton sx={{ width: "100%" }} />
                <Skeleton sx={{ width: "75%" }} />
                <Skeleton sx={{ width: "100%" }} />
                <Skeleton sx={{ width: "75%" }} />
              </div>
            ) : (
              <p className="leading-[26px] text-[15px] pb-5 text-[#969696">
                {productDetail?.shortDescription}
              </p>
            )}
            {!loading && (
              <div className="mb-5">
                {productDetail?.quantity > 0 && (
                  <span className="bg-[#61c70e] text-sm px-5 py-2 rounded text-white">
                    {productDetail.quantity}
                  </span>
                )}
                {productDetail?.quantity <= 0 && (
                  <div className="px-5 py-[15px] border-dashed border border-red-500 rounded text-center text-red-500 uppercase font-medium">
                    Hết hàng
                  </div>
                )}
              </div>
            )}
            <div className="flex items-center gap-2 mb-5">
              <div className="h-[45px] border border-solid border-gray-200  w-fit">
                <button onClick={handleDecrement} className="w-[26px]">
                  -
                </button>
                <input
                  type="text"
                  name="product_quantity"
                  value={productQuantity}
                  onChange={handleChangeProductQuantity}
                  className="w-[50px] bg-[#f8f8f8] h-full text-center outline-none border-x border-solid border-gray-200"
                />
                <button onClick={handleIncrement} className="w-[26px]">
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className={`uppercase flex items-center gap-2 text-white rounded h-11 px-4 py-2 text-sm ${
                  productQuantity > 0 && productDetail.quantity > 0
                    ? "bg-primary hover:bg-secondary transition-colors cursor-pointer"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                <FaCartPlus />
                Thêm vào giỏ hàng
              </button>
            </div>
            <div className="flex items-center gap-5 mb-5">
              <button
                onClick={handleAddToWishlist}
                className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
              >
                {isFavorite ? (
                  <FaHeart className="text-primary text-lg" />
                ) : (
                  <FaRegHeart className="text-primary text-lg" />
                )}
                Yêu thích
              </button>
              <button className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                <FaExpandAlt className="text-primary text-lg" /> So sánh
              </button>
            </div>
            <hr></hr>
            <ul className="flex flex-col gap-2 my-5">
              <li className="text-sm">
                {loading ? (
                  <Skeleton sx={{ width: "20%" }} />
                ) : (
                  <p className="text-[#777777]">
                    <span className="pr-1 text-secondary font-semibold">
                      Danh mục:
                    </span>{" "}
                    <Link
                      to="#"
                      className="hover:text-primary transition-colors"
                    >
                      {productDetail?.category?.name}
                    </Link>
                  </p>
                )}
              </li>
            </ul>
            <hr></hr>
            <div className="my-2 flex items-center gap-2">
              <h4 className="text-sm font-semibold">Chia sẻ</h4>
              <ul className="flex items-center">
                <li className="text-primary cursor-pointer hover:bg-primary transition-colors hover:text-white size-8 flex items-center justify-center rounded">
                  <FaFacebookF />
                </li>
                <li className="text-primary cursor-pointer hover:bg-primary transition-colors hover:text-white size-8 flex items-center justify-center rounded">
                  <FaTwitter />
                </li>
                <li className="text-primary cursor-pointer hover:bg-primary transition-colors hover:text-white size-8 flex items-center justify-center rounded">
                  <FaLinkedinIn />
                </li>
                <li className="text-primary cursor-pointer hover:bg-primary transition-colors hover:text-white size-8 flex items-center justify-center rounded">
                  <FaPinterest />
                </li>
              </ul>
            </div>
            <hr></hr>
          </div>
        </div>
        <div className="mt-[30px]"></div>
      </section>
      <section className="my-[30px]">
        <div className="max-w-full lg:max-w-[1300px] mx-auto px-4">
          <div className="mb-[30px] relative ">
            <span className="absolute w-full bottom-0 left-0  border-b border-solid border-gray-200"></span>
            <ul className="relative flex items-center gap-2 pl-4">
              <li className="relative border border-solid border-gray-200">
                <input
                  hidden
                  id="tab-description"
                  type="radio"
                  name="tabs"
                  value={0}
                  onChange={handleChangeTab}
                />
                <label
                  htmlFor="tab-description"
                  className="block px-6 py-3 cursor-pointer hover:text-primary transition-colors font-medium"
                >
                  Mô tả chi tiết
                </label>
                {activeTabIndex === 0 && (
                  <span className="absolute top-full left-0 w-full border-2 border-solid border-white"></span>
                )}
              </li>
              <li className="relative border border-solid border-gray-200">
                <input
                  hidden
                  id="tab-review"
                  type="radio"
                  name="tabs"
                  value={1}
                  onChange={handleChangeTab}
                />
                <label
                  htmlFor="tab-review"
                  className="block px-6 py-3 cursor-pointer hover:text-primary transition-colors font-medium"
                >
                  Đánh giá ({productDetail?.reviews?.length || 0})
                </label>
                {activeTabIndex === 1 && (
                  <span className="absolute top-full left-0 w-full border-2 border-solid border-white"></span>
                )}
              </li>
            </ul>
          </div>
          {activeTabIndex === 0 && productDetail && (
            <ProductDescription description={productDetail.description} />
          )}
          {activeTabIndex === 1 && (
            <ProductReview
              onSubmit={handleReviewProduct}
              reviews={productDetail?.reviews}
            />
          )}
        </div>
      </section>
      {relatedProductList.length > 0 && (
        <section className="mt-[30px] text-secondary py-[60px]">
          <div className="max-w-full lg:max-w-[1300px] mx-auto px-4">
            <h2 className="text-[26px] mb-5 font-semibold">
              Sản phẩm liên quan
            </h2>
            <div className="slider-container -mx-4">
              <Slider {...settings}>
                {relatedProductList.map((product) => (
                  <Link key={product.id} to="#" className="px-4">
                    <ProductItem {...product} />
                  </Link>
                ))}
              </Slider>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
