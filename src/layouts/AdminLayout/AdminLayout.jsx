import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./AdminLayout.scss";

export default function AdminLayout() {
  return (
    <div className="flex font-roboto">
      <aside className="w-[240px] fixed top-0 left-0 bottom-0 bg-gray-600">
        <Sidebar />
      </aside>
      <div className="ml-[240px] w-full min-h-screen flex flex-col bg-[#F5F7FA]">
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
