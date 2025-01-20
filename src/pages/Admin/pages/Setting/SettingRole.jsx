import { cloneDeep } from "lodash";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { roleService } from "@/services/roleService";
import { toast } from "react-toastify";
import LoadingModal from "@/components/Loading/LoadingModal";
import { form_types } from "@/constants/form-types";
import { PERMISSIONS } from "@/constants/permissions";

export default function SettingRole() {
  const schema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập tên vai trò."),
    permissions: yup
      .array()
      .of(yup.string())
      .min(1, "Bạn phải chọn ít nhất một quyền."),
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      permissions: [],
    },
    resolver: yupResolver(schema),
  });

  const [roleList, setRoleList] = useState([]);
  const [formType, setFormType] = useState(form_types.CREATE);
  const [editedRole, setEditedRole] = useState(null);

  const getRoles = async () => {
    try {
      const response = await roleService.getAll();
      setRoleList(response.data);
    } catch (error) {
      throw new Error("");
    }
  };

  const handleSubmitForm = async (payload) => {
    try {
      if (formType === form_types.CREATE) {
        const { data, message } = await roleService.create({
          name: payload.name,
          permissions: payload.permissions,
        });
        setRoleList((prevData) => [...prevData, data]);
        reset();
        return toast.success(message);
      }
      if (formType === form_types.EDIT) {
        const { data, message } = await roleService.update(editedRole.id, {
          name: payload.name,
          permissions: payload.permissions,
        });
        setRoleList((prevList) => {
          const cloneList = cloneDeep(prevList);
          const nextList = cloneList.map((role) => {
            if (role.id === data.id) {
              return {
                ...data,
              };
            }
            return role;
          });
          return nextList;
        });
        setEditedRole(null);
        setFormType(form_types.CREATE);
        reset();
        return toast.success(message);
      }
    } catch (error) {
      return toast.error(error.response.data.message);
    }
  };

  const handleClickEditRole = (role) => {
    setEditedRole(role);
    setFormType(form_types.EDIT);
  };

  const handleClickCancelEdit = () => {
    setEditedRole(null);
    setFormType(form_types.CREATE);
  };

  const handleClickDeleteRole = async (roleId) => {
    try {
      if (!confirm("Bạn chắc chắn muốn xóa vai trò này chứ")) {
        return;
      }
      const response = await roleService.remove(roleId);
      if (response.success) {
        setRoleList((prevList) => {
          const nextList = cloneDeep(prevList).filter(
            (role) => role.id !== roleId
          );
          return nextList;
        });
      }
    } catch (error) {
      return toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  useEffect(() => {
    if (editedRole) {
      const name = editedRole.name;
      const permissions = editedRole.permissions.map(
        ({ permission }) => permission.name
      );
      setValue("name", name);
      setValue("permissions", permissions);
    } else {
      setValue("name", "");
      setValue("permissions", []);
    }
  }, [editedRole, setValue]);

  return (
    <>
      {isSubmitting && <LoadingModal />}
      <section id="role" className="bg-white shadow rounded mb-5">
        <div className="p-4">
          <h2 className="font-medium mb-4 text-xl">Vai trò - Phân quyền</h2>
          <div className="pt-4 border-t border-solid border-gray-300">
            <h3 className="font-medium mb-4">Danh sách các vai trò</h3>
            <ul className="pl-4 list-decimal text-sm">
              {roleList.map((role) => (
                <li key={role.id} className="mb-2">
                  {role.name}
                  <button
                    onClick={() => handleClickEditRole(role)}
                    className="underline ml-4 mr-2 text-blue-500"
                  >
                    Chỉnh sửa
                  </button>
                  <button
                    onClick={() => handleClickDeleteRole(role.id)}
                    className="text-red-500 underline"
                  >
                    Xóa
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <form
            onSubmit={handleSubmit(handleSubmitForm)}
            className="mt-5 pt-5 border-t border-solid border-gray-300"
          >
            <h3 className="font-medium mb-4">
              {formType === form_types.CREATE && "Thêm vai trò"}
              {formType === form_types.EDIT && "Chỉnh sửa vai trò"}
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-sm col-span-3">
                <label htmlFor="permission-name" className="inline-block mb-2">
                  Tên vai trò
                </label>
                <div>
                  <input
                    {...register("name")}
                    type="text"
                    id="permission-name"
                    placeholder="Nhập tên vai trò..."
                    className="outline-none border border-solid border-gray-300 rounded px-4 py-2 w-full"
                  />
                </div>
                {errors?.name && (
                  <p className="text-sm px-2 text-red-500 my-1">
                    {errors?.name?.message}
                  </p>
                )}
              </div>
              <div className="text-sm col-span-3">
                <label htmlFor="permission-name" className="inline-block mb-2">
                  Quyền hạn
                </label>
                <table className="w-full border border-solid border-gray-300">
                  <tbody className="border border-solid border-gray-300">
                    {PERMISSIONS.map(({ name, permissions }) => (
                      <tr
                        key={name}
                        className="border border-solid border-gray-300"
                      >
                        <th className="px-4 py-2 text-left border border-solid border-gray-300">
                          {name}
                        </th>
                        <td className="px-4 py-2 text-left border border-solid border-gray-300">
                          {permissions.map(({ name, permission }) => (
                            <label
                              key={permission}
                              className="flex items-center gap-1 mr-4"
                            >
                              <Controller
                                name="permissions"
                                control={control}
                                render={({ field }) => (
                                  <input
                                    type="checkbox"
                                    value={permission}
                                    checked={field.value.includes(permission)}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        field.onChange([
                                          ...field.value,
                                          permission,
                                        ]);
                                      } else {
                                        field.onChange(
                                          field.value.filter(
                                            (p) => p !== permission
                                          )
                                        );
                                      }
                                    }}
                                  />
                                )}
                              />
                              {name}
                            </label>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {errors?.permissions && (
                  <p className="text-sm px-2 text-red-500 my-1">
                    {errors?.permissions?.message}
                  </p>
                )}
              </div>
              <div className="flex justify-end text-sm col-span-3 text-right">
                {formType === form_types.CREATE && (
                  <button
                    type="submit"
                    className="text-white bg-blue-500 px-5 py-2 rounded text-sm hover:bg-opacity-80"
                  >
                    Thêm mới
                  </button>
                )}
                {formType === form_types.EDIT && (
                  <>
                    <button
                      type="button"
                      onClick={handleClickCancelEdit}
                      className="text-white bg-red-500 px-5 py-2 rounded text-sm hover:bg-opacity-80 mr-2"
                    >
                      Hủy bỏ
                    </button>
                    <button
                      type="submit"
                      className="text-white bg-blue-500 px-5 py-2 rounded text-sm hover:bg-opacity-80"
                    >
                      Lưu thông tin
                    </button>
                  </>
                )}
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
