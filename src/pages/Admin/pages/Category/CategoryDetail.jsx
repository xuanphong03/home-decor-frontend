import { form_types } from "@/constants/form-types";
import { Alert, Breadcrumbs } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import CategoryForm from "./components/CategoryForm";
import { status } from "@/constants/status";
import { useEffect, useState } from "react";
import { categoryService } from "@/services/categoryService";

export default function CategoryDetail() {
  const { id } = useParams();
  const [alert, setAlert] = useState(null);
  const [categoryDetail, setCategoryDetail] = useState(null);
  const navigate = useNavigate();
  const getCategoryDetail = async () => {
    try {
      const response = await categoryService.getDetail(id);
      setCategoryDetail(response.data);
    } catch (error) {
      navigate("/not-found");
    }
  };

  const handleEditCategory = async (data) => {
    try {
      const payload = {
        name: data.categoryName,
        imageUrl: data.categoryImageUrl,
        status: data.categoryVisibility === "visible",
      };
      const response = await categoryService.updateCategory(id, payload);
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

  useEffect(() => {
    getCategoryDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      <div className="h-[45px] px-10 shadow w-full flex items-center">
        <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: "14px" }}>
          <Link to="/admin" className="hover:underline">
            Thống kê - Doanh thu
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
        {categoryDetail && (
          <CategoryForm
            type={form_types.EDIT}
            onSubmit={handleEditCategory}
            categoryName={categoryDetail.name}
            categoryImageUrl={categoryDetail.imageUrl}
            categoryVisibility={
              categoryDetail.status ? status.VISIBLE : status.INVISIBLE
            }
          />
        )}
      </div>
    </div>
  );
}
