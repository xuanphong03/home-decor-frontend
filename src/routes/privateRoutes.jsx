import { Route } from "react-router-dom";

// Layouts
import DefaultLayout from "@/layouts/DefaultLayout/DefaultLayout";
import AdminLayout from "@/layouts/AdminLayout/AdminLayout";

// Middleware
import AuthMiddleware from "@/middlewares/AuthMiddleware";
import GuestMiddleware from "@/middlewares/GuestMiddleware";

// Client Page
import Profile from "@/pages/Client/Auth/Profile";
import Orders from "@/pages/Client/Orders/Orders";

// Admin Pages
import Dashboard from "@/pages/Admin/pages/Dashboard/Dashboard";
import ProductList from "@/pages/Admin/pages/Product/ProductList";
import ProductDetail from "@/pages/Admin/pages/Product/ProductDetail";
import ProductCreate from "@/pages/Admin/pages/Product/ProductCreate";
import CategoryList from "@/pages/Admin/pages/Category/CategoryList";
import CategoryCreate from "@/pages/Admin/pages/Category/CategoryCreate";
import CategoryDetail from "@/pages/Admin/pages/Category/CategoryDetail";
import Error from "@/pages/Error/Error";
import Checkout from "@/pages/Client/Checkout/Checkout";
import CheckoutResult from "@/pages/Client/Checkout/CheckoutResult";
import UserList from "@/pages/Admin/pages/User/UserList";
import UserDetail from "@/pages/Admin/pages/User/UserDetail";
import OrderList from "@/pages/Admin/pages/Order/OrderList";
import OrderDetail from "@/pages/Admin/pages/Order/OrderDetail";
import SettingPage from "@/pages/Admin/pages/Setting/SettingPage";

export const privateRoutes = (
  <>
    <Route element={<DefaultLayout />}>
      <Route element={<AuthMiddleware />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/checkout">
          <Route path="" element={<Checkout />} />
          <Route path="order-received/:id" element={<CheckoutResult />} />
        </Route>
      </Route>
    </Route>
    <Route path="/" element={<AdminLayout />}>
      <Route path="/admin/*" element={<GuestMiddleware />}>
        <Route path="" element={<Dashboard />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/create" element={<ProductCreate />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="categories" element={<CategoryList />} />
        <Route path="categories/create" element={<CategoryCreate />} />
        <Route path="categories/:id" element={<CategoryDetail />} />
        <Route path="users" element={<UserList />} />
        <Route path="users/:id" element={<UserDetail />} />
        <Route path="orders" element={<OrderList />} />
        <Route path="orders/:id" element={<OrderDetail />} />
        <Route path="settings" element={<SettingPage />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Route>
  </>
);
