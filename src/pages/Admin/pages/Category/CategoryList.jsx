import LoadingModal from "@/components/Loading/LoadingModal";
import { categoryService } from "@/services/categoryService";
import { Breadcrumbs, Pagination } from "@mui/material";
import queryString from "query-string";
import { useEffect, useMemo, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function CategoryList() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 5,
      q: params.q || "",
    };
  }, [location.search]);

  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);
  const [searchTerm, setSearchTerm] = useState(queryParams.q || "");
  const [pagination, setPagination] = useState({
    _limit: queryParams._limit,
    _page: queryParams._page,
    _total: 100,
  });
  const getCategories = async () => {
    try {
      setLoading(true);
      const response = await categoryService.getAll(queryParams);
      const { categories, total, currentPage } = response.data;
      setTimeout(() => {
        setCategoryList(categories);
        setPagination((prev) => ({
          ...prev,
          _total: total,
          _page: currentPage,
        }));
        setLoading(false);
      }, 500);
    } catch (error) {
      throw new Error("Get category list to failed");
    }
  };

  const handlePageChange = (e, page) => {
    const filters = {
      ...queryParams,
      _page: page,
    };
    setPagination((prev) => ({ ...prev, _page: page }));
    navigate(location.pathname + `?${queryString.stringify(filters)}`);
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchCategory = (e) => {
    e.preventDefault();
    const filters = {
      ...queryParams,
      q: searchTerm,
    };
    if (!searchTerm) {
      delete filters.q;
    }
    navigate(location.pathname + `?${queryString.stringify(filters)}`);
  };

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  return (
    <div>
      {loading && <LoadingModal />}
      <div className="h-[45px] px-10 shadow w-full flex items-center">
        <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: "14px" }}>
          <Link to="/admin" className="hover:underline">
            Thống kê
          </Link>
          <Link to="/admin/categories" className="text-secondary">
            Danh sách danh mục
          </Link>
        </Breadcrumbs>
      </div>
      <div className="px-10 py-5">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[28px] font-medium">Danh sách danh mục</h2>
          <Link
            to={location.pathname + "/create"}
            className="text-[15px] bg-primary text-white font-medium px-4 py-1 hover:bg-opacity-80 transition-colors"
          >
            Thêm danh mục
          </Link>
        </div>
        <table className="w-full text-sm bg-white border border-solid border-gray-200 rounded overflow-hidden shadow">
          <thead>
            <tr className="px-4 border-y border-solid border-gray-200">
              <td colSpan={6} className="py-4 px-2">
                <form className="relative" onSubmit={handleSearchCategory}>
                  <input
                    id="productName"
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                    placeholder="Nhập tên danh mục để tìm kiếm..."
                    className="outline-none text-sm py-[6px] pl-9 pr-3 border border-solid border-gray-200 w-full"
                  />
                  <label
                    htmlFor="productName"
                    className="absolute top-1/2 left-5 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  >
                    <IoSearchOutline className="text-gray-500" />
                  </label>
                  <button
                    type="submit"
                    className={`absolute top-0 bottom-0 right-0 px-7 text-white transition-all bg-blue-500 cursor-pointer hover:bg-opacity-80`}
                  >
                    Tìm kiếm
                  </button>
                </form>
              </td>
            </tr>
            <tr className="px-4 border-y border-solid border-gray-200 bg-[#f2f2f2]">
              <th scope="col" className="p-4 text-left w-[40%] max-w-[40%]">
                Danh mục
              </th>
              <th scope="col" className="p-4 text-center w-1/5 max-w-[20%]">
                Số lượng sản phẩm
              </th>
              <th scope="col" className="p-4 text-center w-1/5 max-w-[20%]">
                Trạng thái
              </th>
              <th
                scope="col"
                className="p-4 text-center w-1/5 max-w-[20%]"
              ></th>
            </tr>
          </thead>
          <tbody>
            {!loading && !categoryList.length && (
              <tr
                colSpan={6}
                className="px-4 border-y border-solid border-gray-200"
              >
                <td className="p-4 text-left">Không có danh mục nào phù hợp</td>
              </tr>
            )}
            {categoryList.map((category) => (
              <tr
                key={category.id}
                className="px-4 border-y border-solid border-gray-200"
              >
                <td className="p-4 text-left">
                  <h3>
                    <Link
                      to={location.pathname + `/${category.id}`}
                      className="hover:text-primary transition-colors flex items-center gap-2"
                    >
                      <div className="flex items-center justify-center size-20">
                        <img
                          alt={category?.name}
                          src={category?.imageUrl}
                          className="max-h-full object-cover"
                        />
                      </div>
                      {category.name}
                    </Link>
                  </h3>
                </td>

                <td className="p-4 text-center text-xs">
                  <span>{category?.products?.length}</span>
                </td>

                <td className="p-4 text-center text-xs">
                  {category?.status ? (
                    <span className="inline-block px-2 py-1 rounded-sm text-green-800 bg-green-100 font-medium">
                      Kinh doanh
                    </span>
                  ) : (
                    <span className="inline-block px-2 py-1 rounded-sm text-red-800 bg-red-100 font-medium">
                      Ngưng kinh doanh
                    </span>
                  )}
                </td>
                <td className="p-4 text-right text-sm">
                  <Link
                    to={location.pathname + `/${category.id}`}
                    className="px-4 py-1 rounded hover:underline text-blue-500"
                  >
                    Sửa
                  </Link>
                  <button className="px-4 py-1 rounded hover:underline text-red-500">
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={5} className="p-4">
                <Pagination
                  size="small"
                  variant="outlined"
                  shape="rounded"
                  page={pagination._page}
                  count={Math.ceil(pagination._total / pagination._limit)}
                  onChange={handlePageChange}
                />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
