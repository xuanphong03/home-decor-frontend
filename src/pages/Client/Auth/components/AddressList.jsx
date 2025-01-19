import { useState } from "react";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import AddressForm from "./AddressForm";
import AddressItem from "./AddressItem";

export default function AddressList({ address, onAddNewAddress }) {
  const [openAddressAdd, setOpenAddressAdd] = useState(false);

  const handleOpenAddressAdd = () => {
    setOpenAddressAdd(true);
  };

  const handleCloseAddressAdd = () => {
    setOpenAddressAdd(false);
  };

  const handleAddNewAddress = async (data) => {
    if (onAddNewAddress) {
      await onAddNewAddress(data);
      setOpenAddressAdd(false);
    }
  };

  return (
    <>
      {openAddressAdd && (
        <AddressForm
          open={openAddressAdd}
          onClose={handleCloseAddressAdd}
          onSubmit={handleAddNewAddress}
        />
      )}
      <div className="px-5 py-3 flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-medium text-lg">
          <MdOutlineAddLocationAlt className="text-2xl" /> Địa chỉ
        </h3>
        <button
          onClick={handleOpenAddressAdd}
          className="text-blue-500 text-sm hover:underline"
        >
          Thêm địa chỉ
        </button>
      </div>
      <ul className="border-y border-solid border-gray-200">
        {address?.map(
          ({
            id,
            streetName,
            provinceName,
            provinceId,
            districtName,
            districtId,
          }) => (
            <AddressItem
              key={id}
              id={id}
              streetName={streetName}
              provinceName={provinceName}
              provinceId={provinceId}
              districtName={districtName}
              districtId={districtId}
            />
          )
        )}
      </ul>
    </>
  );
}
