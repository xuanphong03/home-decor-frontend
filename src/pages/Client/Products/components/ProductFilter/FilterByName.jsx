import { useState } from "react";

export default function FilterByName({ defaultSearchTerm, onChange }) {
  const [searchTerm, setSearchTerm] = useState(defaultSearchTerm);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = () => {
    if (searchTerm) {
      onChange({ q: searchTerm });
    }
  };

  return (
    <div className="mb-[25px] pb-[25px] border-b border-solid border-[#f1f1f1]">
      <h4 className="uppercase mb-4 text-[#323232] font-semibold">
        Tìm kiếm sản phẩm
      </h4>
      <div>
        <input
          value={searchTerm}
          onChange={handleChange}
          type="text"
          name="product_search"
          placeholder="Nhập tên sản phẩm..."
          className="w-full h-[46px] px-4 outline-none border border-solid border-gray-200 focus:border-primary transition-all rounded text-sm"
        />
        <button
          onClick={handleSubmit}
          type="button"
          className="mt-[10px] px-2 py-1 uppercase bg-primary text-white rounded text-[15px] h-10 w-full hover:bg-secondary transition-colors"
        >
          Tìm kiếm
        </button>
      </div>
    </div>
  );
}
