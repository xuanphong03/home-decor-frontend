import LoadingModal from "@/components/Loading/LoadingModal";
import { regex } from "@/constants/regex";
import { userService } from "@/services/userService";
import { yupResolver } from "@hookform/resolvers/yup";
import HomeIcon from "@mui/icons-material/Home";
import { Breadcrumbs, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { FaHeadphonesAlt, FaSnapchat } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import {
  IoAlarmOutline,
  IoInformationCircleOutline,
  IoMail,
} from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

export default function Contact() {
  const schema = yup.object({
    name: yup
      .string()
      .required("Vui lòng nhập họ và tên")
      .test("invalid name", "Tên không hợp lệ", (name) => {
        const fullNamePattern = /\d/;
        return !fullNamePattern.test(name);
      }),
    email: yup
      .string()
      .email("Email không hợp lệ")
      .required("Vui lòng nhập email"),
    phoneNumber: yup
      .string()
      .matches(regex.phoneNumber, "Số điện thoại không hợp lệ")
      .required("Vui lòng số điện thoại"),
    subject: yup.string().required("Vui lòng nhập chủ đề"),
    message: yup.string().required("Vui lòng nhập nội dung tin nhắn"),
  });
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handleSendMessage = async (data) => {
    try {
      const response = await userService.contactAdmin(data);
      return toast.success(response.message);
    } catch (error) {
      return toast.error(error.response.data.message);
    } finally {
      reset();
    }
  };
  return (
    <>
      {isSubmitting && <LoadingModal />}
      <section className="py-10 lg:py-20 mt-[90px] xl:mt-0 xl:h-[450px] xl:pt-[90px] bg-no-repeat bg-cover bg-bottom bg-[url('https://ciyashop.potenzaglobalsolutions.com/decor/wp-content/uploads/sites/84/2020/08/page-header-1.jpg')]">
        <div className="max-w-full lg:max-w-[1300px] mx-auto px-4 py-2 h-full flex flex-col justify-center gap-y-5">
          <h1 className="text-[22px] text-center lg:text-left lg:text-4xl font-semibold text-[#323232]">
            Liên hệ
          </h1>
          <Breadcrumbs
            aria-label="breadcrumb"
            className="flex items-center justify-center lg:justify-start"
          >
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
              Liên hệ
            </Typography>
          </Breadcrumbs>
        </div>
      </section>
      <section className="grid grid-cols-2 gap-0 xl:gap-4 mx-auto max-w-[1300px] px-[15px]">
        <div className="col-span-full xl:col-span-1">
          <div className="bg-primary text-white px-[25px] py-[30px] xl:p-[50px] h-full">
            <h2 className="mb-[10px] text-[26px] xl:text-4xl font-bold">
              Thông tin liên hệ
            </h2>
            <p className="mb-[15px] text-[15px]">
              Sẽ thật tuyệt nếu được nghe ý kiến từ bạn! Nếu bạn có bất kỳ câu
              hỏi nào, vui lòng gửi tin nhắn cho chúng tôi. Chúng tôi rất mong
              nhận được phản hồi từ bạn! Chúng tôi trả lời trong vòng 24 giờ!
            </p>
            <ul className="text-[15px]">
              <li className="flex items-center gap-2 mb-4">
                <MdLocationOn className="text-2xl" />
                <p className="leading-none">
                  Số 1 Ngõ 41 Trần Duy Hưng, Trung Hoà, Cầu Giấy, Hà Nội
                </p>
              </li>
              <li className="flex items-center gap-2 mb-4">
                <FaPhone className="text-2xl" />
                <p className="leading-none">0865 783 359</p>
              </li>
              <li className="flex items-center gap-2 mb-4">
                <IoMail className="text-2xl" />
                <p className="leading-none">xphong.fullstack03@gmail.com</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-span-full xl:col-span-1">
          <div className="py-[60px] xl:py-[100px] xl:pl-[50px]">
            <h2 className="text-[26px] xl:text-4xl font-bold text-secondary mb-[10px]">
              Gửi tin nhắn cho chúng tôi
            </h2>
            <p className="text-[15px] mb-[15px] text-[#777]">
              Có một kế hoạch hoặc một câu hỏi? Chúng tôi rất muốn nghe ý kiến
              từ bạn.
            </p>
            <form
              onSubmit={handleSubmit(handleSendMessage)}
              className="grid grid-cols-2 gap-x-[30px] gap-y-[15px] font-normal"
            >
              <div className="col-span-full xl:col-span-1">
                <input
                  type="text"
                  placeholder="Họ và tên..."
                  className="text-sm h-11 px-4 w-full border border-solid border-gray-200 rounded outline-none focus:border-primary"
                  {...register("name")}
                />
                {errors?.name && (
                  <p className="px-1 text-sm text-red-500">
                    {errors?.name?.message}
                  </p>
                )}
              </div>
              <div className="col-span-full xl:col-span-1">
                <input
                  type="email"
                  placeholder="Địa chỉ email"
                  className="text-sm h-11 px-4 w-full border border-solid border-gray-200 rounded outline-none focus:border-primary"
                  {...register("email")}
                />
                {errors?.email && (
                  <p className="px-1 text-sm text-red-500">
                    {errors?.email?.message}
                  </p>
                )}
              </div>
              <div className="col-span-full xl:col-span-1">
                <input
                  type="text"
                  placeholder="Số điện thoại..."
                  className="text-sm h-11 px-4 w-full border border-solid border-gray-200 rounded outline-none focus:border-primary"
                  {...register("phoneNumber")}
                />
                {errors?.phoneNumber && (
                  <p className="px-1 text-sm text-red-500">
                    {errors?.phoneNumber?.message}
                  </p>
                )}
              </div>
              <div className="col-span-full xl:col-span-1">
                <input
                  type="text"
                  placeholder="Chủ đề..."
                  className="text-sm h-11 px-4 w-full border border-solid border-gray-200 rounded outline-none focus:border-primary"
                  {...register("subject")}
                />
                {errors?.subject && (
                  <p className="px-1 text-sm text-red-500">
                    {errors?.subject?.message}
                  </p>
                )}
              </div>
              <div className="col-span-full">
                <textarea
                  rows={4}
                  placeholder="Tin nhắn..."
                  className="text-sm p-3 w-full border border-solid border-gray-200 rounded outline-none focus:border-primary"
                  {...register("message")}
                ></textarea>
                {errors?.message && (
                  <p className="px-1 text-sm text-red-500">
                    {errors?.message?.message}
                  </p>
                )}
              </div>
              <div className="col-span-2">
                <button
                  type="submit"
                  className="bg-primary text-sm text-white uppercase px-4 h-11 leading-[44px] rounded hover:bg-secondary transition-colors duration-300"
                >
                  Gửi tin nhắn
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <section className="pt-[50px] pb-[20px] xl:pt-[70px] xl:pb-[40px] bg-[#f5f5f5]">
        <div className="mx-auto max-w-[1300px]">
          <div className="grid grid-cols-4 gap-5">
            <article className="col-span-full md:col-span-2 xl:col-span-1 flex gap-4 px-[15px] xl:px-0">
              <div className="flex flex-shrink-0 items-center justify-center size-[60px]">
                <IoAlarmOutline className="text-[40px] text-primary" />
              </div>
              <div>
                <h3 className="text-lg text-secondary font-bold">
                  Giờ làm việc
                </h3>
                <div className="text-[#777] text-[15px]">
                  <p className="leading-tight">Thứ 2-6 : 10h – 19h</p>
                  <p className="leading-tight">Thứ 7 : 9h – 13h</p>
                  <p className="leading-tight">Chủ nhật : nghỉ</p>
                </div>
              </div>
            </article>
            <article className="col-span-full md:col-span-2 xl:col-span-1 flex gap-4 px-[15px] xl:px-0">
              <div className="flex flex-shrink-0 items-center justify-center size-[60px]">
                <FaHeadphonesAlt className="text-[40px] text-primary" />
              </div>
              <div>
                <h3 className="text-lg text-secondary font-bold">
                  Trung tâm hỗ trợ
                </h3>
                <div className="text-[#777] text-[15px]">
                  <p className="leading-tight">
                    Được hỗ trợ bởi các chuyên gia có trình độ chuyên môn cao
                  </p>
                </div>
              </div>
            </article>
            <article className="col-span-full md:col-span-2 xl:col-span-1 flex gap-4 px-[15px] xl:px-0">
              <div className="flex flex-shrink-0 items-center justify-center size-[60px]">
                <IoInformationCircleOutline className="text-[40px] text-primary" />
              </div>
              <div>
                <h3 className="text-lg text-secondary font-bold">
                  Đọc bài viết của chúng tôi
                </h3>
                <div className="text-[#777] text-[15px]">
                  <p className="leading-tight">
                    Kiểm tra các bài đăng blog, tin tức và bài viết mới nhất của
                    chúng tôi. Chúng tôi có các bài viết về một loạt các chủ đề.
                  </p>
                </div>
              </div>
            </article>
            <article className="col-span-full md:col-span-2 xl:col-span-1 flex gap-4 px-[15px] xl:px-0">
              <div className="flex flex-shrink-0 items-center justify-center size-[60px]">
                <FaSnapchat className="text-[40px] text-primary" />
              </div>
              <div>
                <h3 className="text-lg text-secondary font-bold">
                  Trò chuyện trực tuyến
                </h3>
                <div className="text-[#777] text-[15px]">
                  <p className="leading-tight">
                    Nếu bạn có câu hỏi về bất kỳ câu hỏi nào của mình, hãy Trò
                    chuyện trực tuyến với chúng tôi và nhận hỗ trợ từ các nhóm
                    bên ngoài.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
