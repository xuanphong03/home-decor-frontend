import { useContext, useMemo } from "react";
import { ProductContext } from "../../Products";

export default function ProductResult() {
  const { totalCount, productList, currentPage, limit } =
    useContext(ProductContext);
  const startIndex = (currentPage - 1) * limit + 1;
  const endIndex = (currentPage - 1) * limit + productList.length;
  const result = useMemo(() => {
    if (!totalCount) return "";
    let content = "";
    if (totalCount <= limit) {
      content = `Hiển thị tất cả ${endIndex - startIndex + 1} sản phẩm`;
    } else {
      content = `Hiển thị ${startIndex}-${endIndex} trên ${totalCount} sản phẩm`;
    }
    return content;
  }, [startIndex, endIndex, limit, totalCount]);
  return <p className="text-[#777777] text-[15px]">{result}</p>;
}
