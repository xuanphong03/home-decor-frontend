import { useState } from "react";

import { form_types } from "@/constants/form-types";
import { status } from "@/constants/status";
import { productService } from "@/services/productService";
import { Alert, Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import ProductForm from "./components/ProductForm";

export default function ProductCreate() {
  const [alert, setAlert] = useState(null);
  const handleCreateProduct = async (payload) => {
    try {
      const dataCreate = {
        name: payload.productName,
        description: payload.productDesc,
        shortDescription: payload.productShortDesc,
        imageUrl: payload.productImageUrl,
        quantity: payload.productQuantity,
        originalPrice: payload.productOriginalPrice,
        salePercent: payload.productSalePercent,
        status: payload.productStatus === "visible",
        categoryId: payload.productCategoryId,
      };
      const response = await productService.create(dataCreate);
      setAlert({
        type: "success",
        message: response.message,
      });
    } catch (error) {
      const response = error.response.data;
      setAlert({
        type: "error",
        message: response.message,
      });
    }
  };
  return (
    <div>
      <div className="h-[45px] px-10 shadow w-full flex items-center">
        <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: "14px" }}>
          <Link to="/admin" className="hover:underline">
            Thống kê - Doanh thu
          </Link>
          <Link to="/admin/products" className="hover:underline">
            Sản phẩm
          </Link>
          <Link to="#" className="text-secondary">
            Tạo sản phẩm
          </Link>
        </Breadcrumbs>
      </div>
      {alert && (
        <div className="px-10 pt-5">
          <Alert severity={alert.type}>{alert.message}</Alert>
        </div>
      )}
      <div className="px-10 py-5">
        <ProductForm
          type={form_types.CREATE}
          productName={""}
          productQuantity={0}
          productDesc={""}
          productShortDesc={""}
          productSalePercent={0}
          productOriginalPrice={0}
          productCategoryId={null}
          productStatus={status.VISIBLE}
          productImageUrl={""}
          onSubmit={handleCreateProduct}
        />
      </div>
    </div>
  );
}
