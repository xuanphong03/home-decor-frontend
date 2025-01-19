import { permissionService } from "@/services/permissionService";
import { roleService } from "@/services/roleService";
import { useEffect, useState } from "react";

export default function UserSetting({ user }) {
  const [roleList, setRoleList] = useState([]);
  const [permissionList, setPermissionList] = useState([]);

  const getRoles = async () => {
    try {
      const roles = await roleService.getAll();
      setRoleList(roles);
    } catch (error) {
      throw new Error("Get roles to failed");
    }
  };
  const getPermissions = async () => {
    try {
      const response = await permissionService.getAll();
      const permissions = Object.values(
        response.reduce((result, permission) => {
          const item = { value: permission };
          if (permission.endsWith("read")) {
            item.name = "Xem";
          } else if (permission.endsWith("create")) {
            item.name = "Thêm";
          } else if (permission.endsWith("update")) {
            item.name = "Sửa";
          } else if (permission.endsWith("delete")) {
            item.name = "Xóa";
          } else if (permission.endsWith("asign")) {
            item.name = "Gán";
          }
          let name;
          if (permission.startsWith("products")) {
            name = "Sản phẩm";
          } else if (permission.startsWith("categories")) {
            name = "Danh mục";
          } else if (permission.startsWith("orders")) {
            name = "Đơn hàng";
          } else if (permission.startsWith("users")) {
            name = "Người dùng";
          } else if (permission.startsWith("coupons")) {
            name = "Mã giảm giá";
          } else if (permission.startsWith("roles")) {
            name = "Vai trò";
          } else if (permission.startsWith("permissions")) {
            name = "Phân quyền";
          }
          if (!result[name]) {
            result[name] = { name, items: [] };
          }
          result[name].items.push(item);
          return result;
        }, {})
      );

      console.log(permissions);
      setPermissionList(permissions);
    } catch (error) {
      throw new Error("Get roles to failed");
    }
  };

  useEffect(() => {
    getRoles();
    getPermissions();
  }, []);
  return (
    <div className="p-5 shadow bg-white rounded w-[800px] h-[600px] overflow-y-auto">
      <h2 className="font-medium text-xl mb-4">Gán quyền cho người dùng</h2>
      <form>
        <div className="mb-5">
          <h3 className="mb-2">Vai trò</h3>
          <div>
            {roleList.map(({ id, name }) => (
              <label key={id} className="flex items-center gap-1 mb-1">
                <input type="checkbox" name="role" value={name} />
                {name}
              </label>
            ))}
          </div>
        </div>
        <div className="mb-5">
          <h3 className="mb-2">Thêm quyền</h3>
          <table className="w-full border border-solid border-gray-300">
            <thead>
              <tr>
                <th className="p-2 text-left border border-solid border-gray-300">
                  Chức năng
                </th>
                <th className="p-2 text-left border border-solid border-gray-300">
                  Quyền
                </th>
              </tr>
            </thead>
            <tbody>
              {permissionList.map(({ name, items }) => (
                <tr key={name}>
                  <td className="p-2 border border-solid border-gray-300">
                    {name}
                  </td>
                  <td className="p-2 border border-solid border-gray-300">
                    <div className="flex flex-wrap items-center gap-5 ">
                      {items.map(({ name, value }) => (
                        <label key={value} className="flex items-center gap-1">
                          <input type="checkbox" value={value} />
                          {name}
                        </label>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
}
