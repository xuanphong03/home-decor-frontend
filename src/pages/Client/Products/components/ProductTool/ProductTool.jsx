import ProductResult from "./ProductResult";
import ProductShow from "./ProductShow";
import ProductSort from "./ProductSort";

export default function ProductTool({ filters, onChange }) {
  const handleChangeFilters = (newFilter) => {
    onChange(newFilter);
  };
  return (
    <div className="flex items-center justify-between py-[10px] mb-5">
      <ProductResult />
      <div className="flex flex-1 items-center gap-5 justify-end">
        <ProductShow
          quantityShowing={filters?._limit || 6}
          onChange={handleChangeFilters}
        />
        <ProductSort
          sort={filters?._sort ?? null}
          onChange={handleChangeFilters}
        />
      </div>
    </div>
  );
}
