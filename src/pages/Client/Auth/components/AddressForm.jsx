import { Box, Dialog, DialogTitle, LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { provinceService } from "@/services/provinceService";
import { form_types } from "@/constants/form-types";
import TextField from "./form-controls/TextField";
import { MdOutlineLocationOn } from "react-icons/md";

export default function AddressForm({
  type = form_types.CREATE,
  open,
  onClose,
  onSubmit,
  defaultData = null,
}) {
  const schema = yup.object({
    streetName: yup.string().required("Vui lòng nhập địa chỉ nhận hàng"),
    provinceId: yup
      .number()
      .required("Vui lòng chọn tỉnh - thành phố")
      .notOneOf([0], "Vui lòng chọn tỉnh - thành phố cụ thể"),
    districtId: yup
      .number()
      .required("Vui lòng chọn quận - huyện")
      .notOneOf([0], "Vui lòng chọn quận - huyện phố cụ thể"),
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      streetName: defaultData?.streetName || "",
      provinceId: 0,
      districtId: 0,
    },
  });
  const provinceId = watch("provinceId");
  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);

  const getProvinces = async () => {
    const data = await provinceService.getAll();
    if (data) {
      setProvinceList(data);
    }
  };

  const handleAddNewAddress = async (data) => {
    if (onSubmit) {
      const districtId = getValues("districtId");
      const provinceId = getValues("provinceId");
      const province = provinceList?.find((p) => p.code === +provinceId);
      const district = province?.districts?.find((d) => d.code === +districtId);
      const provinceName = province?.name;
      const districtName = district?.name;
      const payload = {
        ...data,
        provinceName,
        districtName,
      };
      await onSubmit(payload);
      //   onClose();
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    getProvinces();
  }, []);

  // Xử lý sự kiện thay đổi thành phố -> thay đổi cả quận huyện
  useEffect(() => {
    if (+provinceId !== 0) {
      const selectedProvince = provinceList.find(
        (province) => province.code === +provinceId
      );
      setDistrictList(selectedProvince?.districts || []);
      setValue("districtId", 0);
    }
  }, [provinceId, provinceList, setValue]);

  useEffect(() => {
    if (defaultData) {
      // Đặt giá trị mặc định cho provinceId và districtId
      setValue("provinceId", defaultData.provinceId || 0);
      setValue("districtId", defaultData.districtId || 0);

      // Cập nhật danh sách quận/huyện dựa trên provinceId mặc định
      if (defaultData.provinceId) {
        const selectedProvince = provinceList.find(
          (province) => province.code === +defaultData.provinceId
        );
        setDistrictList(selectedProvince?.districts || []);
      }
    }
  }, [defaultData, provinceList, setValue]);

  return (
    <Dialog onClose={handleClose} open={open} className="relative">
      <DialogTitle>Địa chỉ giao hàng</DialogTitle>
      {isSubmitting && (
        <Box sx={{ width: "100%" }} className="absolute top-0 left-0 right-0">
          <LinearProgress color="primary" />
        </Box>
      )}
      <form
        onSubmit={handleSubmit(handleAddNewAddress)}
        className="w-[600px] px-6 pb-4 grid grid-cols-2 gap-y-3 gap-x-4"
      >
        <div className="text-sm col-span-2">
          <TextField
            id="streetName"
            label={`Địa chỉ cụ thể`}
            placeholder="Nhập địa chỉ cụ thể..."
            register={{ ...register("streetName") }}
            errorMessage={errors?.streetName?.message}
            startIcon={<MdOutlineLocationOn />}
          />
        </div>
        <div className="text-sm col-span-1">
          <label htmlFor="provinces" className="inline-block mb-2">
            Tỉnh - Thành phố
          </label>
          <select
            id="provinces"
            className="w-full outline-none border border-solid border-gray-200 px-4 py-2 rounded"
            {...register("provinceId")}
          >
            <option value={0} disabled>
              Chọn Tỉnh - Thành phố
            </option>
            {provinceList.length > 0 &&
              provinceList.map(({ name, code }) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
          </select>
          {errors?.provinceId && (
            <p className="px-2 mt-1 text-red-500">
              {errors?.provinceId?.message}
            </p>
          )}
        </div>
        <div className="text-sm col-span-1">
          <label htmlFor="districts" className="inline-block mb-2">
            Quận - Huyện
          </label>
          <select
            id="districts"
            className="w-full outline-none border border-solid border-gray-200 px-4 py-2 rounded"
            {...register("districtId")}
          >
            <option value={0} disabled>
              Chọn Quận - Huyện
            </option>
            {districtList.map(({ name, code }) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
          {errors?.districtId && (
            <p className="px-2 mt-1 text-red-500">
              {errors?.districtId?.message}
            </p>
          )}
        </div>
        <div className="text-sm col-span-2 text-right">
          <button
            type="button"
            onClick={handleClose}
            className="text-white bg-red-500 px-4 py-2 rounded hover:bg-opacity-80"
          >
            Trở lại
          </button>
          <button
            type="submit"
            className="text-white bg-green-500 px-4 py-2 rounded hover:bg-opacity-80 ml-2"
          >
            {type === form_types.CREATE && "Thêm địa chỉ"}
            {type === form_types.EDIT && "Lưu địa chỉ"}
          </button>
        </div>
      </form>
    </Dialog>
  );
}
