import { Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import OurExpertise from "./OurExpertise";
import TypesOfLights from "./TypesOfLights";
import LatestPost from "./LatestPost";

export default function About() {
  return (
    <>
      <section className="py-10 lg:py-20 mt-[90px] xl:mt-0 xl:h-[450px] xl:pt-[90px] bg-no-repeat bg-cover bg-bottom bg-[url('https://ciyashop.potenzaglobalsolutions.com/decor/wp-content/uploads/sites/84/2020/08/page-header-1.jpg')]">
        <div className="max-w-full lg:max-w-[1300px] mx-auto px-4 py-2 h-full flex flex-col justify-center gap-y-5">
          <h1 className="text-[22px] text-center lg:text-left lg:text-4xl font-semibold text-[#323232]">
            Giới thiệu
          </h1>
          <Breadcrumbs
            aria-label="breadcrumb"
            className="flex items-center justify-center lg:justify-start"
          >
            <Link to={"/"} className="flex items-center">
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              <span className="text-sm">Trang chủ</span>
            </Link>
            <Typography
              sx={{
                color: "text.primary",
                display: "flex",
                alignItems: "center",
                fontSize: "14px",
              }}
            >
              Giới thiệu
            </Typography>
          </Breadcrumbs>
        </div>
      </section>
      <TypesOfLights />
      <OurExpertise />
      <LatestPost />
    </>
  );
}
