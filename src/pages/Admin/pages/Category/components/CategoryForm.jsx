import { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import LoadingModal from "@/components/Loading/LoadingModal";
import { form_types } from "@/constants/form-types";
import { status } from "@/constants/status";
import { uploadImageCloudinary } from "@/utils/clientUtils";

const schema = yup.object({
  categoryName: yup.string().required("Vui lòng nhập tên danh mục"),
  categoryVisibility: yup
    .string()
    .required("Vui lòng chọn trạng thái của danh mục"),
  categoryImageUrl: yup
    .string()
    .required("Vui lòng thiết lập ảnh cho danh mục"),
});

export default function CategoryForm({
  type = form_types.CREATE,
  categoryName,
  categoryVisibility,
  categoryImageUrl,
  onSubmit,
}) {
  const [uploading, setUploading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      categoryName,
      categoryVisibility,
      categoryImageUrl,
    },
  });

  const handleUploadFile = async (e) => {
    const file = e.target.files[0];
    if (file.size > 5 * 1024 * 1024) {
      return alert("Kích thước tệp quá lớn!");
    }
    if (!file) return;
    setUploading(true);
    const imageUrl = await uploadImageCloudinary(file);
    setValue("categoryImageUrl", imageUrl);
    setError("categoryImageUrl", null);
    setUploading(false);
  };

  const handleDeleteImage = () => {
    setValue("categoryImageUrl", "");
  };

  const handleSubmitForm = async (data) => {
    if (onSubmit) {
      await onSubmit(data);
      if (type === form_types.CREATE) {
        reset();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      {uploading && <LoadingModal />}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[28px] font-medium">
          {type === form_types.CREATE && "Tạo danh mục"}
          {type === form_types.EDIT && "Chỉnh sửa danh mục"}
        </h2>
        <button
          type="submit"
          className="text-[15px] bg-primary text-white font-medium px-4 py-1 hover:bg-opacity-80 transition-colors"
        >
          Lưu danh mục
        </button>
      </div>
      <div className="grid grid-cols-3 gap-x-[30px]">
        <div className="col-span-2 flex flex-col gap-y-[30px]">
          <div className="bg-white shadow p-6 h-full">
            <h3 className="font-medium text-lg mb-5">Thông tin cơ bản</h3>
            <div>
              <div className="mb-4 text-sm">
                <label htmlFor="categoryName" className="font-medium">
                  Tên danh mục
                </label>
                <div className="mt-[6px]">
                  <input
                    type="text"
                    id="categoryName"
                    placeholder="Nhập tên danh mục..."
                    className="px-[13px] py-[6px] w-full outline-none border border-solid border-gray-200 rounded"
                    {...register("categoryName")}
                  />
                </div>
                {errors?.categoryName && (
                  <p className="px-2 mt-1 text-red-500">
                    {errors?.categoryName?.message}
                  </p>
                )}
              </div>
              <div className="mb-4 text-sm">
                <h3 className="font-medium mb-1">Trạng thái</h3>
                <ul className="text-sm">
                  <li className="mb-1">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value={status.VISIBLE}
                        {...register("categoryVisibility")}
                      />
                      Kinh doanh
                    </label>
                  </li>
                  <li className="mb-1">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value={status.INVISIBLE}
                        {...register("categoryVisibility")}
                      />
                      Ngưng kinh doanh
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 flex flex-col gap-y-[30px]">
          <div className="bg-white shadow p-6">
            <h3 className="font-medium text-lg mb-5">Ảnh</h3>
            <div className="flex items-center justify-center w-full">
              {getValues("categoryImageUrl") ? (
                <div className="w-full">
                  <div className="mb-2 w-full h-64 border border-solid border-gray-200 flex items-center justify-center rounded-lg">
                    <img
                      alt=""
                      src={getValues("categoryImageUrl")}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div className="text-sm">
                    <label className="text-blue-500 hover:underline cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleUploadFile}
                      />
                      Thay ảnh khác
                    </label>
                    <button
                      onClick={handleDeleteImage}
                      className="ml-4 text-red-500 hover:underline"
                    >
                      Xóa ảnh
                    </button>
                  </div>
                </div>
              ) : (
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleUploadFile}
                  />
                </label>
              )}
            </div>
            {errors?.categoryImageUrl && (
              <p className="px-2 mt-1 text-red-500 text-sm">
                {errors?.categoryImageUrl?.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
