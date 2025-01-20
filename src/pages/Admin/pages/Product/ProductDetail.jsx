import { useContext, useEffect, useState } from "react";
import ProductForm from "./components/ProductForm";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Alert, Breadcrumbs } from "@mui/material";
import { productService } from "@/services/productService";
import { status } from "@/constants/status";
import { AppContext } from "@/App";

export default function ProductDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const { permissions } = useContext(AppContext);
  const [productDetail, setProductDetail] = useState(null);
  const [alert, setAlert] = useState(null);

  const getProductDetail = async (id) => {
    try {
      const response = await productService.getDetail(id);
      setProductDetail(response.data);
    } catch (error) {
      throw new Error("Get product detail to failed");
    }
  };

  const handleUpdateProduct = async (payload) => {
    try {
      const dataUpdate = {
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
      const response = await productService.update(params?.id, dataUpdate);
      setProductDetail(response.data);
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

  useEffect(() => {
    getProductDetail(params?.id);
  }, [params?.id]);

  if (Array.isArray(permissions) && !permissions.includes("products.update")) {
    navigate("/forbidden");
  }

  return (
    <div>
      <div className="h-[45px] px-10 shadow w-full flex items-center">
        <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: "14px" }}>
          <Link to="/admin" className="hover:underline">
            Thống kê
          </Link>
          <Link to="/admin/products" className="hover:underline">
            Sản phẩm
          </Link>
          <Link to="#" className="text-secondary">
            Chỉnh sửa sản phẩm
          </Link>
        </Breadcrumbs>
      </div>
      {alert && (
        <div className="px-10 pt-5">
          <Alert severity={alert.type}>{alert.message}</Alert>
        </div>
      )}
      <div className="px-10 py-5">
        {productDetail && (
          <ProductForm
            type="edit"
            productName={productDetail?.name}
            productQuantity={productDetail?.quantity}
            productDesc={productDetail?.description}
            productShortDesc={productDetail?.shortDescription}
            productOriginalPrice={productDetail?.originalPrice}
            productSalePercent={productDetail?.salePercent}
            productCategoryId={productDetail?.categoryId}
            productStatus={
              productDetail?.status ? status.VISIBLE : status.INVISIBLE
            }
            productImageUrl={productDetail?.imageUrl}
            onSubmit={handleUpdateProduct}
          />
        )}
      </div>
    </div>
  );
}
