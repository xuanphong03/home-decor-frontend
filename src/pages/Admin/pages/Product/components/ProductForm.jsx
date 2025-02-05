import LoadingModal from "@/components/Loading/LoadingModal";
import { useEffect, useState } from "react";

import { form_types } from "@/constants/form-types";
import { categoryService } from "@/services/categoryService";
import { yupResolver } from "@hookform/resolvers/yup";
import CurrencyInput from "react-currency-input-field";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { status } from "@/constants/status";
import ReactQuill from "react-quill";
import { uploadImageCloudinary } from "@/utils/clientUtils";

const schema = yup.object({
  productName: yup.string().required("Vui lòng nhập tên sản phẩm"),
  productQuantity: yup
    .number()
    .typeError("Vui lòng nhập số lượng sản phẩm")
    .required("Vui lòng nhập số lượng sản phẩm")
    .min(0, "Số lượng sản phẩm phải lớn hơn hoặc bằng 0"),
  productDesc: yup
    .string()
    .required("Vui lòng nhập mô tả chi tiết về sản phẩm"),
  productShortDesc: yup
    .string()
    .required("Vui lòng nhập mô tả ngắn gọn về sản phẩm"),
  productOriginalPrice: yup
    .number()
    .typeError("Vui lòng nhập giá gốc của sản phẩm")
    .required("Vui lòng nhập giá gốc của sản phẩm")
    .min(0, "Giá của sản phẩm phải lớn hơn hoặc bằng 0"),
  productCategoryId: yup.number().required("Vui lòng chọn loại sản phẩm"),
  productSalePercent: yup
    .number()
    .required("Vui lòng nhập phần trăm khuyến mãi của sản phẩm")
    .min(0, "Phần trăm khuyến mãi phải lơn hơn hoặc bằng 0")
    .max(100, "Phần trăm khuyễn mãi phải bé hơn hoặc bằng 100"),
  productStatus: yup
    .string()
    .required("Vui lòng chọn trạng thái hiển thị của sản phẩm"),
  productImageUrl: yup.string().required("Vui lòng thiết lập ảnh cho sản phẩm"),
});

export default function ProductForm({
  type = form_types.CREATE,
  productName,
  productQuantity,
  productDesc,
  productShortDesc,
  productOriginalPrice,
  productSalePercent,
  productCategoryId,
  productStatus,
  productImageUrl,
  onSubmit,
}) {
  const [uploading, setUploading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      productName,
      productQuantity,
      productDesc,
      productShortDesc,
      productOriginalPrice,
      productSalePercent,
      productStatus,
      productCategoryId,
      productImageUrl,
    },
  });

  const handleSubmitForm = async (data) => {
    if (onSubmit) {
      await onSubmit(data);
      if (type === form_types.CREATE) {
        reset();
        setValue("productCategoryId", categoryList[0].id);
      }
    }
  };

  const handleUploadFile = async (e) => {
    const file = e.target.files[0];
    if (file.size > 5 * 1024 * 1024) {
      alert("Kích thước tệp quá lớn!");
      return;
    }
    if (!file) return;
    setUploading(true);
    const imageUrl = await uploadImageCloudinary(file);
    setValue("productImageUrl", imageUrl);
    setUploading(false);
  };

  const handleDeleteImage = () => {
    setValue("productImageUrl", "");
  };

  const getCategoryList = async () => {
    try {
      const response = await categoryService.getAll();
      const { categories } = response.data;
      setCategoryList(categories);
    } catch (error) {
      throw new Error("Get category list to failed");
    }
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  // Thiết lập giá trị mặc định sau khi call api lấy danh sách loại sản phẩm
  useEffect(() => {
    if (categoryList.length > 0) {
      const catId = productCategoryId || categoryList[0].id;
      setValue("productCategoryId", catId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryList]);

  return (
    <>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        {uploading && <LoadingModal />}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[28px] font-medium">
            {type === "create" && "Tạo sản phẩm"}
            {type === "edit" && "Chỉnh sửa sản phẩm"}
          </h2>
          <button
            type="submit"
            className="text-[15px] bg-primary text-white font-medium px-4 py-1 hover:bg-opacity-80 transition-colors"
          >
            Lưu sản phẩm
          </button>
        </div>
        <div className="grid grid-cols-3 gap-x-[30px]">
          <div className="col-span-2 flex flex-col gap-y-[30px]">
            <div className="bg-white shadow p-6">
              <h3 className="font-medium text-lg mb-5">Thông tin cơ bản</h3>
              <div>
                <div className="mb-4 text-sm">
                  <label htmlFor="productName" className="font-medium">
                    Tên sản phẩm
                  </label>
                  <div className="mt-[6px]">
                    <input
                      type="text"
                      id="productName"
                      placeholder="Nhập tên sản phẩm..."
                      className="px-[13px] py-[6px] w-full outline-none border border-solid border-gray-200 rounded"
                      {...register("productName")}
                    />
                  </div>
                  {errors?.productName && (
                    <p className="px-2 mt-1 text-red-500">
                      {errors?.productName?.message}
                    </p>
                  )}
                </div>
                <div className="mb-4 text-sm">
                  <label htmlFor="productQuantity" className="font-medium">
                    Số lượng sản phẩm
                  </label>
                  <div className="mt-[6px]">
                    <input
                      type="number"
                      min={0}
                      id="productQuantity"
                      placeholder="Nhập số lượng sản phẩm..."
                      className="px-[13px] py-[6px] w-full outline-none border border-solid border-gray-200 rounded"
                      {...register("productQuantity")}
                    />
                  </div>
                  {errors?.productQuantity && (
                    <p className="px-2 mt-1 text-red-500">
                      {errors?.productQuantity?.message}
                    </p>
                  )}
                </div>
                <div className="mb-4 text-sm">
                  <label
                    htmlFor="categoryDesc"
                    className="inline-block mb-[6px] text-sm font-medium"
                  >
                    Mô tả chi tiết sản phẩm
                  </label>
                  <Controller
                    name="productDesc"
                    control={control}
                    render={({ field }) => (
                      <ReactQuill
                        theme="snow"
                        placeholder="Nhập mô tả chi tiết về sản phẩm..."
                        value={field.value || ""}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  {errors?.productDesc && (
                    <p className="px-2 mt-1 text-red-500">
                      {errors?.productDesc?.message}
                    </p>
                  )}
                </div>
                <div className="mb-4 text-sm">
                  <label htmlFor="productShortDesc" className="font-medium">
                    Mô tả ngắn gọn
                  </label>
                  <div className="mt-[6px]">
                    <textarea
                      type="text"
                      rows={3}
                      id="productShortDesc"
                      placeholder="Nhập mô tả ngắn gọn về sản phẩm..."
                      className="px-[13px] py-[6px] w-full outline-none border border-solid border-gray-200 rounded resize-none"
                      {...register("productShortDesc")}
                    ></textarea>
                  </div>
                  {errors?.productShortDesc && (
                    <p className="px-2 mt-1 text-red-500">
                      {errors?.productShortDesc?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-white shadow p-6">
              <h3 className="font-medium text-lg mb-5">Giá sản phẩm</h3>
              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-1 text-sm">
                  <label className="font-medium" htmlFor="productOriginalPrice">
                    Giá ban đầu
                  </label>
                  <div className="mt-[6px]">
                    <CurrencyInput
                      id="productOriginalPrice"
                      placeholder="Nhập giá sản phẩm..."
                      decimalsLimit={2}
                      defaultValue={getValues("productOriginalPrice")}
                      onValueChange={(value) =>
                        setValue("productOriginalPrice", value)
                      }
                      className="px-[13px] py-[6px] w-full outline-none border border-solid border-gray-200 rounded"
                      {...register("productOriginalPrice")}
                    />
                  </div>
                  {errors?.productOriginalPrice && (
                    <p className="px-2 mt-1 text-red-500">
                      {errors?.productOriginalPrice?.message}
                    </p>
                  )}
                </div>
                <div className="col-span-1 text-sm">
                  <label className="font-medium" htmlFor="productPrice">
                    Phần trăm khuyến mãi
                  </label>
                  <div className="mt-[6px]">
                    <input
                      type="number"
                      className="px-[13px] py-[6px] w-full outline-none border border-solid border-gray-200 rounded"
                      {...register("productSalePercent")}
                    />
                  </div>
                  {errors?.productPrice && (
                    <p className="px-2 mt-1 text-red-500">
                      {errors?.productSalePercent?.message}
                    </p>
                  )}
                </div>
                {/* <div className="col-span-1 text-sm">
                <label className="font-medium" htmlFor="startSaleTime">
                  Thời gian bắt đầu (khuyến mãi)
                </label>
                <div className="mt-[6px]">
                  <input
                    type="date"
                    id="startSaleTime"
                    className="px-[13px] py-[6px] w-full outline-none border border-solid border-gray-200 rounded"
                  />
                </div>
              </div>
              <div className="col-span-1 text-sm">
                <label className="font-medium" htmlFor="endSaleTime">
                  Thời gian kết thúc (khuyến mãi)
                </label>
                <div className="mt-[6px]">
                  <input
                    type="date"
                    id="endSaleTime"
                    className="px-[13px] py-[6px] w-full outline-none border border-solid border-gray-200 rounded"
                  />
                </div>
              </div> */}
              </div>
            </div>
            <div className="bg-white shadow p-6">
              <h3 className="font-medium text-lg mb-5">Danh sách ảnh</h3>
              <table className="w-full text-sm mb-1 border border-solid border-gray-200">
                <thead>
                  <tr className="text-left">
                    <th className="px-4 py-2 w-20 border-x border-solid border-gray-200">
                      Ảnh
                    </th>

                    <th className="px-4 py-2 border-x border-solid border-gray-200 w-20"></th>
                  </tr>
                </thead>
                <tbody className="border border-solid border-gray-200">
                  {!!getValues("productImageUrl") && (
                    <tr className="border-y border-solid border-gray-200">
                      <td className="px-4 py-2">
                        <div className="flex size-20 items-center justify-center">
                          <img
                            src={getValues("productImageUrl")}
                            className="max-h-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="text-center">
                        <button
                          className="text-red-500 underline"
                          onClick={handleDeleteImage}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr className="border-y border-solid border-gray-200">
                    <td colSpan={3}>
                      <label
                        htmlFor="productImage"
                        className="text-sm text-blue-500 px-4 py-2 hover:underline inline-block cursor-pointer"
                      >
                        Thêm ảnh mới
                      </label>
                      <input
                        hidden
                        type="file"
                        id="productImage"
                        onChange={handleUploadFile}
                      />
                    </td>
                  </tr>
                </tfoot>
              </table>
              {errors?.productImageUrl && (
                <p className="px-2 mt-1 text-red-500 text-sm">
                  {errors?.productImageUrl?.message}
                </p>
              )}
            </div>
          </div>
          <div className="col-span-1 flex flex-col gap-y-[30px]">
            <div className="bg-white shadow p-6">
              <h3 className="font-medium text-lg mb-5">Trạng thái</h3>
              <ul className="text-sm">
                <li className="mb-1">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      {...register("productStatus")}
                      value={status.VISIBLE}
                    />
                    Kinh doanh
                  </label>
                </li>
                <li className="mb-1">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      {...register("productStatus")}
                      value={status.INVISIBLE}
                    />
                    Ngưng kinh doanh
                  </label>
                </li>
              </ul>
            </div>
            <div className="bg-white shadow p-6">
              <h3 className="font-medium text-lg mb-5">Loại sản phẩm</h3>
              <div className="mb-2 text-sm">
                <select
                  id="categories"
                  className="border border-solid border-gray-200 rounded w-full px-[13px] py-[6px] outline-none"
                  {...register("productCategoryId")}
                >
                  {categoryList.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </form>
      {isSubmitting && <LoadingModal />}
    </>
  );
}
