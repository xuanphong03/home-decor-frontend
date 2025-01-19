import { AppContext } from "@/App";
import { useContext } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import "./DefaultLayout.scss";

export default function DefaultLayout() {
  const { scrolledDown } = useContext(AppContext);
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="font-cabin relative">
        <Header />
        <main className="">
          <Outlet />
        </main>
        <Footer />
        <button
          onClick={handleScrollToTop}
          className={`${
            scrolledDown ? "visible opacity-100" : "invisible opacity-0"
          } fixed bottom-10 left-5 size-10 flex items-center justify-center rounded bg-primary text-white hover:bg-secondary transition-all`}
        >
          <IoIosArrowUp className="text-3xl" />
        </button>
      </div>
    </>
  );
}
