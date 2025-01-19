import FilterByCategory from "./FilterByCategory";
import FilterByName from "./FilterByName";
import FilterByPrice from "./FilterByPrice";

export default function ProductFilter({ params, onChange }) {
  const handleFilterChange = (newFilters) => {
    onChange(newFilters);
  };

  return (
    <>
      <FilterByName
        defaultSearchTerm={params?.q || ""}
        onChange={handleFilterChange}
      />
      <FilterByPrice
        defaultGtePrice={+params?.gtePrice || 0}
        defaultLtePrice={+params?.ltePrice || 5000000}
        onChange={handleFilterChange}
      />
      <FilterByCategory />
    </>
  );
}
