import { Route } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import Home from "../pages/Client/Home/Home";
import About from "../pages/Client/About/About";
import Products from "../pages/Client/Products/Products";
import ProductDetail from "../pages/Client/Products/ProductDetail";
import Login from "@/pages/Client/Auth/Login";
import Blogs from "@/pages/Client/Blogs/Blogs";
import Contact from "@/pages/Client/Contact/Contact";
import WishList from "@/pages/Client/WishList/WishList";
import Error from "@/pages/Error/Error";
import Cart from "@/pages/Client/Cart/Cart";
import Register from "@/pages/Client/Auth/Register";
import AuthMiddleware from "@/middlewares/AuthMiddleware";
import ForgotPassword from "@/pages/Client/Auth/ForgotPassword";
import Forbidden from "@/pages/Forbidden/Forbidden";

export const publicRoutes = (
  <>
    <Route path="/" element={<DefaultLayout />}>
      <Route index element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route element={<AuthMiddleware />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/wishlist" element={<WishList />} />

      <Route path="/cart" element={<Cart />} />
      <Route path="/products">
        <Route path="" element={<Products />} />
        <Route path=":id" element={<ProductDetail />} />
      </Route>
    </Route>
    <Route path="*" element={<Error />} />
    <Route path="/forbidden" element={<Forbidden />} />
  </>
);
