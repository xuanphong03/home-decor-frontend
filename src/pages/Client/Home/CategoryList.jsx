import { categoryService } from "@/services/categoryService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CategoryList() {
  const [isLoading, setIsLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);
  const getCategories = async () => {
    try {
      setCategoryList(true);
      const response = await categoryService.getAll();
      const { categories } = response.data;
      setCategoryList(categories);
    } catch (error) {
      throw new Error("Fetch category list to failed");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <section className="my-[100px] max-w-[1300px] mx-auto px-[15px]">
      <div className="grid grid-cols-12 gap-x-[30px] text-secondary">
        <div className="col-span-2">
          <h2 className="capitalize font-bold text-[32px] leading-[36px] mb-[10px]">
            Danh mục trong tuần
          </h2>
          <p className="text-[15px] text-[#777777] leading-[26px] mb-[15px]">
            Tin tưởng vào bản thân và những người xung quanh bạn
          </p>
          <button className="uppercase text-sm py-3 px-[26px] bg-primary hover:bg-secondary hover:text-white transition-all duration-300">
            Tất cả danh mục
          </button>
        </div>
        <div className="col-span-10 flex items-center gap-[15px] ">
          <div className="w-full grid grid-cols-5 gap-[15px]">
            {!isLoading &&
              categoryList.map((category) => (
                <Link
                  to="#"
                  key={category.id}
                  className="col-span-1 border border-solid border-gray-200 rounded-sm"
                >
                  <article className="flex flex-col items-center justify-center px-[25px] py-10">
                    <img
                      src={category?.imageUrl}
                      alt=""
                      className="h-[90px] w-auto object-cover"
                    />
                    <h4 className="mt-5 font-medium text-secondary hover:text-primary transition-all">
                      {category?.name}
                    </h4>
                  </article>
                </Link>
              ))}

            {isLoading &&
              [...Array(5)].map((_, index) => (
                <Link
                  to="#"
                  key={index}
                  className="col-span-1 border border-solid border-gray-200 rounded-sm"
                >
                  <article className="flex flex-col items-center justify-center px-[25px] py-10">
                    <img alt="" className="h-[90px] w-auto object-cover" />
                    <h4 className="mt-5 font-medium text-secondary hover:text-primary transition-all"></h4>
                  </article>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
