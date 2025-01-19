import { Routes, useLocation } from "react-router-dom";
import { publicRoutes } from "../routes/publicRoutes";
import { privateRoutes } from "../routes/privateRoutes";
import { useEffect } from "react";

export default function RenderLayout() {
  const location = useLocation();
  useEffect(() => {
    scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location.search, location.pathname]);
  return (
    <Routes>
      {publicRoutes}
      {privateRoutes}
    </Routes>
  );
}
