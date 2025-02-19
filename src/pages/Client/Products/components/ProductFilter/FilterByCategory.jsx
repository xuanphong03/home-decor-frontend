import { categoryService } from "@/services/categoryService";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function FilterByCategory() {
  const location = useLocation();
  const [categoryList, setCategoryList] = useState([]);
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

  return (
    <>
      {categoryList.length > 0 && (
        <div className="mb-[25px] pb-[25px] border-b border-solid border-[#f1f1f1]">
          <h4 className="uppercase text-secondary font-semibold mb-[15px]">
            Lọc theo loại sản phẩm
          </h4>
          <ul>
            {categoryList?.map((cat) => (
              <li key={cat.id}>
                <Link
                  to={location.pathname + `?category=${cat.name}`}
                  className="inline-block py-2 text-sm text-[#777777] hover:text-primary transition-colors"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
