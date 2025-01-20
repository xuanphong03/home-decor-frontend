import { Alert, Breadcrumbs } from "@mui/material";
import CategoryForm from "./components/CategoryForm";
import { form_types } from "@/constants/form-types";
import { status } from "@/constants/status";
import { Link } from "react-router-dom";
import { useState } from "react";
import { categoryService } from "@/services/categoryService";

export default function CategoryCreate() {
  const [alert, setAlert] = useState(null);
  const handleCreateCategory = async (data) => {
    try {
      const payload = {
        name: data.categoryName,
        imageUrl: data.categoryImageUrl,
        status: data.categoryVisibility === "visible",
      };
      const response = await categoryService.createCategory(payload);
      setAlert({
        type: "success",
        message: response.message,
      });
    } catch (error) {
      setAlert({
        type: "error",
        message: error.response.data.message,
      });
    }
  };
  return (
    <div>
      <div className="h-[45px] px-10 shadow w-full flex items-center">
        <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: "14px" }}>
          <Link to="/admin" className="hover:underline">
            Thống kê
          </Link>
          <Link to="/admin/categories" className="hover:underline">
            Danh mục
          </Link>
          <Link to="/admin/categories" className="text-secondary">
            Tạo danh mục
          </Link>
        </Breadcrumbs>
      </div>

      <div className="px-10 py-5">
        {alert && (
          <Alert severity={alert.type} className="mb-5">
            {alert.message}
          </Alert>
        )}
        <CategoryForm
          type={form_types.CREATE}
          onSubmit={handleCreateCategory}
          categoryName=""
          categoryImageUrl=""
          categoryVisibility={status.VISIBLE}
        />
      </div>
    </div>
  );
}
