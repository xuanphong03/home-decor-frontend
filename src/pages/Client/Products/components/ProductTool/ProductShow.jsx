import { useState } from "react";

export default function ProductShow({ quantityShowing, onChange }) {
  const [quantityProductShowing, setQuantityProductShowing] =
    useState(quantityShowing);
  const handleChange = (e) => {
    const quantity = e.target.value;
    setQuantityProductShowing(+quantity);
    onChange({ _limit: +quantity });
  };

  return (
    <div className="hidden lg:flex items-center text-[#777777] text-[15px]">
      <h3 className="font-semibold pr-[6px]">Hiển thị</h3>
      <div className="flex items-center gap-[6px]">
        <label
          className={`cursor-pointer ${
            quantityProductShowing === 6 ? "font-bold text-secondary" : ""
          }`}
        >
          <input
            hidden
            type="radio"
            name="limit_products"
            value={6}
            onChange={handleChange}
          />
          6
        </label>
        <span>/</span>
        <label
          className={`cursor-pointer ${
            quantityProductShowing === 9 ? "font-bold text-secondary" : ""
          }`}
        >
          <input
            hidden
            type="radio"
            name="limit_products"
            value={9}
            onChange={handleChange}
          />
          9
        </label>
        <span>/</span>
        <label
          className={`cursor-pointer ${
            quantityProductShowing === 12 ? "font-bold text-secondary" : ""
          }`}
        >
          <input
            hidden
            type="radio"
            name="limit_products"
            value={12}
            onChange={handleChange}
          />
          12
        </label>
      </div>
    </div>
  );
}
