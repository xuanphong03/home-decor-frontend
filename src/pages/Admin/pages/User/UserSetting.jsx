import { PERMISSIONS } from "@/constants/permissions";
import { roleService } from "@/services/roleService";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingModal from "@/components/Loading/LoadingModal";
import { IoMdClose } from "react-icons/io";

export default function UserSetting({ user, onSubmit, onClose }) {
  const schema = yup.object().shape({
    roles: yup.array().of(yup.number()),
    permissions: yup.array().of(yup.string()),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      roles: [],
      permissions: [],
    },
    resolver: yupResolver(schema),
  });
  const [roleList, setRoleList] = useState([]);

  const getRoles = async () => {
    try {
      const response = await roleService.getAll();
      setRoleList(response.data);
    } catch (error) {
      throw new Error("Get roles to failed");
    }
  };

  const handleSubmitForm = async (data) => {
    if (onSubmit) {
      await onSubmit(data);
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  useEffect(() => {
    if (user) {
      const roleIds = user.roles.map(({ roleId }) => roleId);
      const permissionsOnUser = user.permissions.map(
        ({ permission }) => permission.name
      );
      setValue("roles", roleIds);
      setValue("permissions", permissionsOnUser);
    }
  }, [user, setValue]);
  return (
    <>
      {isSubmitting && <LoadingModal />}
      <div className="p-5 shadow bg-white rounded w-[800px] h-[600px] overflow-y-auto custom-scrollbar">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-medium text-xl">Gán quyền cho người dùng</h2>
          <button
            type="button"
            onClick={handleClose}
            className="text-2xl hover:bg-gray-200"
          >
            <IoMdClose />
          </button>
        </div>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="mb-5">
            <h3 className="mb-2">Vai trò</h3>
            <div>
              {roleList.map(({ id, name }) => (
                <label key={id} className="flex items-center gap-1 mr-4">
                  <Controller
                    name="roles"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="checkbox"
                        value={id}
                        checked={field.value.includes(id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            field.onChange([...field.value, id]);
                          } else {
                            field.onChange(field.value.filter((p) => p !== id));
                          }
                        }}
                      />
                    )}
                  />
                  {name}
                </label>
              ))}
            </div>
          </div>
          <div className="mb-5">
            <h3 className="mb-2">Thêm quyền</h3>
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
          </div>
          <div className="text-right text-sm">
            <button
              type="button"
              onClick={handleClose}
              className="px-5 py-2 text-white bg-gray-500 hover:bg-opacity-80 transition-all rounded"
            >
              Đóng
            </button>
            <button
              type="submit"
              className="ml-2 px-5 py-2 text-white bg-blue-500 hover:bg-opacity-80 transition-all rounded"
            >
              Lưu thông tin
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
