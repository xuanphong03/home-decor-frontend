import { FaFilter } from "react-icons/fa";
import { useState } from "react";
import { Slider } from "@mui/material";

export default function FilterByPrice({
  defaultGtePrice,
  defaultLtePrice,
  onChange,
}) {
  const [priceRange, setPriceRange] = useState({
    gtePrice: defaultGtePrice,
    ltePrice: defaultLtePrice,
  });

  const handleChange = (_, value) => {
    const [gtePrice, ltePrice] = value;
    setPriceRange({ gtePrice, ltePrice });
  };

  const handleFilter = () => {
    onChange({ ...priceRange });
  };

  return (
    <div className="mb-[25px] pb-[25px] border-b border-solid border-[#f1f1f1]">
      <h4 className="uppercase mb-4 text-[#323232] font-semibold">
        Lọc theo giá
      </h4>
      <div>
        <Slider
          min={0}
          max={10000000}
          onChange={handleChange}
          sx={{ color: "#FFA800" }}
          value={[priceRange.gtePrice, priceRange.ltePrice]}
          size="small"
          valueLabelDisplay="auto"
        />
        <div className="flex justify-between items-center">
          <p className="text-sm text-[#777777]">
            Khoảng giá:{" "}
            {priceRange.gtePrice.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}{" "}
            -{" "}
            {priceRange.ltePrice.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </p>
          <button
            onClick={handleFilter}
            className="my-2 flex items-center gap-2 ml-auto hover:text-primary transition-colors uppercase font-semibold text-sm"
          >
            <FaFilter /> Lọc
          </button>
        </div>
      </div>
    </div>
  );
}
