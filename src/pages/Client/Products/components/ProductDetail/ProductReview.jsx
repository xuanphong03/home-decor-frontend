import { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import InputField from "./components/form-controls/InputField";
import RatingField from "./components/form-controls/RatingField";
import TextareaField from "./components/form-controls/TextareaField";

const schema = yup.object({
  fullName: yup.string().required("Vui lòng nhập họ và tên"),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  rating: yup.number(),
  review: yup.string().required("Vui lòng đánh giá sản phẩm"),
});

export default function ProductReview() {
  const [reviewList, setReviewList] = useState([]);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      rating: 0,
      review: "",
    },
  });

  const getReviews = async () => {
    setReviewList([]);
  };

  const handleReviewProduct = (data) => {};

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <div className="text-sm grid grid-cols-2 gap-[30px] text-secondary">
      <div className="col-span-1">
        <h3 className="uppercase font-medium mb-[15px]">Đánh giá</h3>
        {reviewList.length === 0 && (
          <p className="text-[15px] text-[#777777] mb-[15px]">
            Chưa có đánh giá nào
          </p>
        )}
      </div>
      <div className="col-span-1">
        <h3 className="uppercase font-medium mb-[15px]">
          Hãy là người đầu tiên đánh giá sản phẩm này
        </h3>
        <p className="text-[15px] text-[#777777] mb-[15px]">
          Địa chỉ email của bạn sẽ không được công bố. Các trường bắt buộc được
          đánh dấu *
        </p>
        <form className="w-full" onSubmit={handleSubmit(handleReviewProduct)}>
          <div className="text-[15px] mb-4">
            <InputField
              required
              id="fullName"
              name="fullName"
              label="Họ và tên"
              placeholder=""
              control={control}
              errors={errors}
            />
          </div>
          <div className="text-[15px] mb-4">
            <InputField
              required
              id="email"
              name="email"
              label="Email"
              placeholder=""
              control={control}
              errors={errors}
            />
          </div>
          <div className="text-[15px] mb-4">
            <RatingField
              required
              id="rating"
              name="rating"
              label="Đánh giá của bạn"
              placeholder=""
              control={control}
              errors={errors}
            />
          </div>
          <div className="text-[15px] mb-4">
            <TextareaField
              required
              id="review"
              name="review"
              label="Nội dung đánh giá"
              placeholder=""
              control={control}
              errors={errors}
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="bg-primary text-white uppercase px-[18px] py-2 rounded hover:bg-secondary transition-all"
            >
              Đánh giá
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
