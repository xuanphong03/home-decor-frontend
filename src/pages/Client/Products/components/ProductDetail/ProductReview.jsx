import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import RatingField from "./components/form-controls/RatingField";
import TextareaField from "./components/form-controls/TextareaField";
import LoadingModal from "@/components/Loading/LoadingModal";
import { Avatar } from "@mui/material";
import { getFirstCharacterOfName } from "@/utils/clientUtils";
import moment from "moment";
import { IoIosStar } from "react-icons/io";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const schema = yup.object({
  rating: yup.number(),
  review: yup.string().required("Vui lòng đánh giá sản phẩm"),
});

export default function ProductReview({ onSubmit, reviews = [] }) {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      rating: 0,
      review: "",
    },
  });
  const { accessToken } = useSelector((state) => state.auth);
  const isAuthenticated = Boolean(accessToken);

  const handleReviewProduct = async (data) => {
    if (!isAuthenticated) return toast.info("Vui lòng đăng nhập tài khoản");
    if (onSubmit) {
      await onSubmit(data);
      reset();
    }
  };
  return (
    <>
      <div className="text-sm grid grid-cols-2 gap-[30px] text-secondary">
        <div className="col-span-1">
          <h3 className="uppercase font-medium mb-[15px]">Đánh giá</h3>
          {reviews.length === 0 && (
            <p className="text-[15px] text-[#777777] mb-[15px]">
              Chưa có đánh giá nào
            </p>
          )}
          {reviews.length > 0 && (
            <ul className="max-h-[500px] overflow-y-auto custom-scrollbar pr-5 py-2">
              {reviews.map((review) => (
                <li key={review.id} className="mb-5">
                  <article className="p-1">
                    <div className="flex gap-2 mb-2">
                      <Avatar>
                        {getFirstCharacterOfName(review?.user?.name)}
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{review?.user?.name}</h3>
                        <p className="text-gray-500 flex items-center gap-2">
                          <span className="flex items-center">
                            Đánh giá: {review?.rating}
                            <IoIosStar className="text-yellow-500" />
                          </span>
                          ({moment(review?.createdAt).fromNow()})
                        </p>
                      </div>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-sm">
                      {review?.content}
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="col-span-1">
          <h3 className="uppercase font-medium mb-[15px]">
            Hãy là người đầu tiên đánh giá sản phẩm này
          </h3>
          <p className="text-[15px] text-[#777777] mb-[15px]">
            Địa chỉ email của bạn sẽ không được công bố. Các trường bắt buộc
            được đánh dấu *
          </p>
          <form className="w-full" onSubmit={handleSubmit(handleReviewProduct)}>
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
      {isSubmitting && <LoadingModal />}
    </>
  );
}
