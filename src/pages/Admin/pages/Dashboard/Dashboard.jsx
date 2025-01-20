import LoadingModal from "@/components/Loading/LoadingModal";
import { Breadcrumbs } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  return (
    <div>
      {loading && <LoadingModal />}
      <div className="h-[45px] px-10 shadow w-full flex items-center">
        <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: "14px" }}>
          <Link to="/admin" className="text-secondary">
            Thống kê
          </Link>
        </Breadcrumbs>
      </div>
      <div className="px-10 py-5">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[28px] font-medium">Thống kê</h2>
        </div>
      </div>
    </div>
  );
}
