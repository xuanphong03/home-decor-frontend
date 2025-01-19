import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IoMdInformationCircleOutline } from "react-icons/io";
import LoadingModal from "@/components/Loading/LoadingModal";
import { useEffect } from "react";
import TextField from "./form-controls/TextField";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlinePhone } from "react-icons/ai";
import { regex } from "@/constants/regex";

export default function BasicInfoForm({ profile, onSubmit }) {
  const schema = yup.object({
    name: yup.string().required("Vui lòng nhập họ và tên"),
    email: yup
      .string()
      .email("Email không hợp lệ")
      .required("Vui lòng nhập email"),
    phoneNumber: yup
      .string()
      .nullable()
      .test("invalid-phone-number", "Số điện thoại không hợp lệ", (value) => {
        if (!value) return true;
        return regex.phoneNumber.test(value);
      }),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: profile?.name,
      email: profile?.email,
      phoneNumber: profile?.phoneNumber,
    },
  });

  const handleChangeInformation = async (data) => {
    if (onSubmit) {
      await onSubmit(data);
    }
  };

  useEffect(() => {
    if (profile) {
      const { name, email, phoneNumber } = profile;
      setValue("name", name);
      setValue("email", email);
      setValue("phoneNumber", phoneNumber);
    }
  }, [profile, setValue]);

  return (
    <>
      {isSubmitting && <LoadingModal />}
      <h3 className="font-medium text-lg mb-5 flex items-center gap-2">
        <IoMdInformationCircleOutline className="text-2xl" />
        Thông tin cơ bản
      </h3>
      <form onSubmit={handleSubmit(handleChangeInformation)}>
        <div className="mb-4 text-sm">
          <TextField
            id="email"
            label="Email"
            placeholder="Nhập địa chỉ email..."
            register={{ ...register("email") }}
            errorMessage={errors?.email?.message}
            startIcon={<HiOutlineMail />}
            disabled
          />
        </div>
        <div className="mb-4 text-sm">
          <TextField
            id="name"
            label="Họ và tên"
            placeholder="Nhập họ và tên..."
            register={{ ...register("name") }}
            errorMessage={errors?.name?.message}
            startIcon={<FaRegUser />}
          />
        </div>
        <div className="mb-4 text-sm">
          <TextField
            id="phoneNumber"
            label="Số điện thoại"
            placeholder="Nhập số điện thoại..."
            register={{ ...register("phoneNumber") }}
            errorMessage={errors?.phoneNumber?.message}
            startIcon={<AiOutlinePhone />}
          />
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="px-5 py-2 rounded text-white bg-primary text-sm hover:bg-opacity-80 transition-all"
          >
            Thay đổi thông tin
          </button>
        </div>
      </form>
    </>
  );
}
