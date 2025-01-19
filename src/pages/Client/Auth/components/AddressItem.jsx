import { useContext, useState } from "react";
import AddressForm from "./AddressForm";
import { form_types } from "@/constants/form-types";
import { profileService } from "@/services/profileService";
import { AppContext } from "@/App";
import { ProfileContext } from "../Profile";

export default function AddressItem(props) {
  const { id, streetName, provinceName, districtName, provinceId, districtId } =
    props;
  const [openForm, setOpenForm] = useState(false);
  const { setProfile } = useContext(AppContext);
  const { setMessage } = useContext(ProfileContext);
  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleEditAddress = async (data) => {
    try {
      const response = await profileService.updateProfile({
        address: { id, ...data },
      });
      if (response.success) {
        setProfile(response.data);
        setMessage({
          status: "success",
          text: "Cập nhật địa chỉ thành công",
        });
      }
    } catch (error) {
      setMessage({
        status: "error",
        text: "Cập nhật địa chỉ thất bại",
      });
      throw new Error("Update address to failed");
    } finally {
      setOpenForm(false);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  const handleDeleteAddress = async () => {
    if (!confirm("Bạn chắc chắn muốn xóa địa chỉ này chứ?")) return;
    try {
      const response = await profileService.deleteAddress({ id });
      if (response.success) {
        setProfile(response.data);
        setMessage({
          status: "success",
          text: "Xóa địa chỉ thành công",
        });
      }
    } catch (error) {
      setMessage({
        status: "error",
        text: "Xóa địa chỉ thất bại",
      });
      throw new Error("Delete address to failed");
    } finally {
      setOpenForm(false);
      window.scrollTo({
        top: 0,
        left: 0,
      });
    }
  };

  return (
    <>
      {openForm && (
        <AddressForm
          type={form_types.EDIT}
          open={openForm}
          onClose={handleCloseForm}
          onSubmit={handleEditAddress}
          defaultData={{ streetName, provinceId, districtId }}
        />
      )}
      <li className="px-5 py-3 [&:not(last-child)]:border-b border-solid border-gray-200 flex justify-between">
        <p className="flex-1 text-sm">
          {streetName}, {districtName}, {provinceName}
        </p>
        <div className="">
          <button
            type="button"
            onClick={handleOpenForm}
            className="text-blue-500 text-sm px-2 py-1 hover:underline"
          >
            Sửa
          </button>
          <button
            type="button"
            onClick={handleDeleteAddress}
            className="text-red-500 text-sm px-2 py-1 ml-2 hover:underline"
          >
            Xóa
          </button>
        </div>
      </li>
    </>
  );
}
