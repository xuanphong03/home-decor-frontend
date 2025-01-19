import { useState } from "react";

const SORT_MODES = [
  {
    value: "default",
    label: "Sắp xếp mặc định",
  },
  {
    value: "latest",
    label: "Sắp xếp theo ngày ra mắt",
  },
  {
    value: "price",
    label: "Sắp xếp theo giá: thấp đến cao",
  },
  {
    value: "price-desc",
    label: "Sắp xếp theo giá: cao đến thấp",
  },
];

export default function ProductSort({ sort, onChange }) {
  const [sortProductMode, setSortProductMode] = useState(
    sort || SORT_MODES[0].value
  );
  const handleChange = (e) => {
    const sortMode = e.target.value;
    setSortProductMode(sortMode);
    onChange({ _sort: sortMode });
  };

  return (
    <div className="text-[#777777]">
      <select
        value={sortProductMode}
        onChange={handleChange}
        className="text-sm outline-none w-60 border border-solid border-gray-200 px-4 py-2"
      >
        {SORT_MODES.map((sort) => (
          <option key={sort.value} value={sort.value}>
            {sort.label}
          </option>
        ))}
      </select>
    </div>
  );
}
