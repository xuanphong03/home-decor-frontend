import LoadingModal from "@/components/Loading/LoadingModal";
import { userService } from "@/services/userService";
import { Breadcrumbs, Pagination } from "@mui/material";
import queryString from "query-string";
import { useEffect, useMemo, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function UserList() {
  const [loading, setLoading] = useState(true);
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

  const [userList, setUserList] = useState([]);
  const [searchTerm, setSearchTerm] = useState(queryParams.q || "");
  const [pagination, setPagination] = useState({
    _limit: queryParams._limit,
    _page: queryParams._page,
    _total: 100,
  });

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getAllUsers(queryParams);
      const { users, total, currentPage } = response.data;
      setTimeout(() => {
        setUserList(users);
        setPagination((prev) => ({
          ...prev,
          _total: total,
          _page: currentPage,
        }));
        setLoading(false);
      }, 500);
    } catch (error) {
      throw new Error("Get user list to failed");
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

  const handleSearchUser = (e) => {
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
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);
  return (
    <>
      {loading && <LoadingModal />}
      <div className="h-[45px] px-10 shadow w-full flex items-center">
        <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: "14px" }}>
          <Link to="/admin" className="hover:underline">
            Thống kê
          </Link>
          <Link to="#" className="text-secondary">
            Danh sách người dùng
          </Link>
        </Breadcrumbs>
      </div>
      <div className="px-10 py-5">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[28px] font-medium">Danh sách người dùng</h2>
        </div>
        <table className="w-full text-sm bg-white border border-solid border-gray-200 rounded overflow-hidden shadow">
          <thead>
            <tr className="px-4 border-y border-solid border-gray-200">
              <td colSpan={7} className="py-4 px-2">
                <form className="relative" onSubmit={handleSearchUser}>
                  <input
                    id="search-term"
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                    placeholder="Nhập tên sản phẩm để tìm kiếm..."
                    className="outline-none text-sm py-[6px] pl-9 pr-3 border border-solid border-gray-200 w-full"
                  />
                  <label
                    htmlFor="search-term"
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
              <th scope="col" className="p-4 text-center">
                STT
              </th>
              <th scope="col" className="p-4 text-left">
                Họ và tên
              </th>
              <th scope="col" className="p-4 text-left">
                Email
              </th>
              <th scope="col" className="p-4 text-left">
                Loại tài khoản
              </th>
              <th scope="col" className="p-4 text-left">
                Vai trò
              </th>
              <th scope="col" className="p-4 text-left">
                Trạng thái
              </th>
              <th scope="col" className="p-4 text-right w-44"></th>
            </tr>
          </thead>
          <tbody>
            {!loading && !userList.length && (
              <tr
                colSpan={6}
                className="px-4 border-y border-solid border-gray-200"
              >
                <td className="p-4 text-left">Không tìm thấy người dùng nào</td>
              </tr>
            )}
            {userList.map((user, index) => (
              <tr
                key={user.id}
                className="px-4 border-y border-solid border-gray-200"
              >
                <td className="p-4 text-center">
                  {index + 1 + (pagination._page - 1) * pagination._limit}
                </td>
                <td className="p-4 text-left">{user.name}</td>
                <td className="p-4 text-left">{user.email}</td>
                <td className="p-4 text-left">
                  {user.isAdmin && (
                    <span className="ml-2 capitalize text-xs px-4 py-1 bg-blue-500 rounded-full text-white">
                      Admin
                    </span>
                  )}
                  {user.isSupport && (
                    <span className="ml-2 capitalize text-xs px-4 py-1 bg-blue-500 rounded-full text-white">
                      Support
                    </span>
                  )}
                  {!user.isAdmin && !user.isSupport && (
                    <span className="ml-2 capitalize text-xs px-4 py-1 bg-blue-500 rounded-full text-white">
                      User
                    </span>
                  )}
                </td>
                <td className="p-4 text-left">
                  <ul className="flex flex-wrap gap-2">
                    {user.roles.map(({ role }) => (
                      <li
                        key={role.id}
                        className="capitalize text-xs px-4 py-1 bg-blue-500 rounded-full text-white"
                      >
                        {role.name}
                      </li>
                    ))}
                    {!user?.roles?.length && (
                      <span className="capitalize text-xs px-4 py-1 bg-gray-500 rounded-full text-white">
                        None
                      </span>
                    )}
                  </ul>
                </td>
                <td className="p-4 text-left">
                  {user.verify ? (
                    <span className="inline-block text-xs px-4 py-1 text-white bg-green-500 rounded-full">
                      Active
                    </span>
                  ) : (
                    <span className="inline-block text-xs px-4 py-1 text-white bg-red-500 rounded-full">
                      Inactive
                    </span>
                  )}
                </td>
                <td className="p-4 text-center">
                  <Link
                    to={location.pathname + `/${user.id}`}
                    className=" text-sm text-blue-500 hover:underline"
                  >
                    Chi tiết
                  </Link>
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
    </>
  );
}
