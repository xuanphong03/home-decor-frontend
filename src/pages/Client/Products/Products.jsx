import { Box, Breadcrumbs, Pagination, Skeleton } from "@mui/material";
import queryString from "query-string";
import { createContext, useEffect, useMemo, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Banner from "./components/Banner/Banner";
import ProductFilter from "./components/ProductFilter/ProductFilter";
import ProductTool from "./components/ProductTool/ProductTool";
import HomeIcon from "@mui/icons-material/Home";
import { Typography } from "@mui/material";
import ProductItem from "./components/ProductList/ProductItem";
import { productService } from "@/services/productService";

export const ProductContext = createContext();

export default function Products() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 6,
      q: params.q || "",
    };
  }, [location.search]);

  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAll(queryParams);
      const { total, products } = response.data;

      setTimeout(() => {
        setTotalCount(total);
        setProductList(products);
        setLoading(false);
      }, 500);
    } catch (error) {
      throw new Error("Get product list to failed");
    }
  };

  const handlePageChange = (e, page) => {
    const filters = {
      ...queryParams,
      _page: page,
    };
    if (!filters.q) {
      delete filters.q;
    }
    navigate(location.pathname + `?${queryString.stringify(filters)}`);
  };

  const handleFilterChange = (newFilter) => {
    const filters = {
      ...queryParams,
      ...newFilter,
    };
    if (!filters.q) {
      delete filters.q;
    }
    const pathname = location.pathname;
    navigate(`${pathname}?${queryString.stringify(filters)}`);
  };

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  return (
    <ProductContext.Provider
      value={{
        productList: productList,
        totalCount: totalCount,
        limit: queryParams._limit,
        currentPage: queryParams._page,
      }}
    >
      <section className="py-[10px] mt-[90px] bg-[#FBFBFB] shadow-sm">
        <div className="max-w-full lg:max-w-[1300px] mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <h1 className="text-[26px] font-semibold text-[#323232]">
              Cửa hàng
            </h1>
            <Breadcrumbs aria-label="breadcrumb">
              <Link to={"/"} className="flex items-center">
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                <span className="text-sm">Trang chủ</span>
              </Link>
              <Typography
                sx={{
                  color: "text.primary",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "14px",
                }}
              >
                Cửa hàng
              </Typography>
            </Breadcrumbs>
          </div>
        </div>
      </section>
      <div className="max-w-full lg:max-w-[1300px] mx-auto px-4 py-[40px] lg:py-[60px] ">
        <div className="-mx-4 flex flex-wrap-reverse">
          <aside className="px-4 basis-full max-w-full lg:basis-1/4 lg:max-w-[75%]">
            <ProductFilter params={queryParams} onChange={handleFilterChange} />
          </aside>
          <section className="px-4 basis-full max-w-full lg:basis-3/4 lg:max-w-[75%]">
            <Banner />
            <ProductTool filters={queryParams} onChange={handleFilterChange} />
            {!loading && productList.length > 0 && (
              <>
                <div className="grid grid-cols-12 gap-x-5 gap-y-6">
                  {productList.map((product) => (
                    <Link
                      to={location.pathname + `/${product.id}`}
                      key={product.id}
                      className={`col-span-1 sm:col-span-6 md:col-span-4`}
                    >
                      <ProductItem {...product} on />
                    </Link>
                  ))}
                </div>
                <div className="mt-5 flex justify-center">
                  <Pagination
                    size="small"
                    variant="outlined"
                    shape="rounded"
                    color="primary"
                    page={queryParams._page}
                    count={Math.ceil(totalCount / queryParams._limit)}
                    onChange={handlePageChange}
                  />
                </div>
              </>
            )}
            {loading && (
              <>
                <div className="grid grid-cols-12 gap-x-5 gap-y-6">
                  {[...Array(queryParams._limit)].map((_, index) => (
                    <article
                      key={index}
                      className="col-span-1 sm:col-span-6 md:col-span-4"
                    >
                      <Box className="w-full aspect-square rounded overflow-hidden">
                        <Skeleton
                          variant="rectangular"
                          sx={{ width: "100%", height: "100%" }}
                        />
                      </Box>
                      <Box sx={{ pt: 0.5 }}>
                        <Skeleton />
                        <Skeleton width="60%" />
                      </Box>
                    </article>
                  ))}
                </div>
                <div className="mt-5 flex justify-center">
                  <Pagination
                    size="small"
                    variant="outlined"
                    shape="rounded"
                    color="primary"
                    page={queryParams._page}
                    count={Math.ceil(totalCount / queryParams._limit)}
                    onChange={handlePageChange}
                  />
                </div>
              </>
            )}

            {!loading && productList.length === 0 && (
              <div className="w-full py-[25px] pl-[60px] pr-[190px] bg-[#2C91C3] text-white flex items-center gap-2">
                <FaInfoCircle />{" "}
                <p className="text-sm">
                  Không tìm thấy sản phẩm nào khớp với lựa chọn của bạn.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </ProductContext.Provider>
  );
}
