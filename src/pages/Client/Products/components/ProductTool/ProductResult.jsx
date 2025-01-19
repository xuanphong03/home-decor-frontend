import { useContext } from "react";
import { ProductContext } from "../../Products";

export default function ProductResult() {
  const { totalCount, productList, currentPage, limit } =
    useContext(ProductContext);
  const startIndex = (currentPage - 1) * limit + 1;
  const endIndex = (currentPage - 1) * limit + productList.length;

  return (
    <>
      <p className="text-[#777777] text-[15px]">
        {endIndex <= totalCount
          ? `Hiển thị ${startIndex} - ${endIndex} trên ${totalCount} kết quả`
          : `Hiển thị tất cả ${endIndex} kết quả`}
      </p>
    </>
  );
}
