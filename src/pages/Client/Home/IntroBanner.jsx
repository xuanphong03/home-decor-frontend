import Lamps from "@/assets/images/banner/lamps.png";
import Sofa from "@/assets/images/banner/sofa.png";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

export default function IntroBanner() {
  return (
    <motion.section
      initial={{ backgroundColor: "#ffffff" }}
      animate={{ backgroundColor: "#e3e3e3" }}
      transition={{
        duration: 0.25,
        ease: "easeIn",
      }}
      className="h-[900px] overflow-hidden"
    >
      <div className="relative pt-[90px]">
        <div className=" max-w-full lg:max-w-[1300px] mx-auto px-4 h-[610px] flex items-center">
          <div className=" flex flex-col gap-5 text-secondary overflow-hidden">
            <motion.h3
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{
                duration: 1.25,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="text-lg uppercase font-semibold tracking-wider"
            >
              Ưu đãi trong hôm nay
            </motion.h3>
            <motion.h1
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{
                duration: 0.75,
                ease: "easeIn",
                delay: 1.5,
              }}
              className="text-[64px] font-semibold capitalize max-w-[500px] leading-[70px]"
            >
              Bộ sưu tầm mới Giảm giá 30%
            </motion.h1>
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{
                duration: 0.75,
                ease: "easeInOut",
                delay: 2,
              }}
            >
              <Link
                to="/products"
                className="bg-primary text-secondary py-2 block px-9 w-fit text-[15px] font-semibold leading-8 hover:bg-secondary hover:text-white transition-all"
              >
                Mua ngay
              </Link>
            </motion.div>
          </div>
          <motion.div
            initial={{ height: "0%", opacity: 0 }}
            animate={{ height: "100%", opacity: 1 }}
            transition={{
              duration: 0.75,
              ease: "easeInOut",
            }}
            className="absolute top-0 bottom-0 left-1/2 w-[504px] bg-primary"
          ></motion.div>
          <div className="absolute top-0 left-1/2 -translate-x-[40%]">
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: "0%" }}
              transition={{
                duration: 0.75,
                ease: "easeInOut",
                delay: 1.5,
              }}
            >
              <img
                alt="lamps"
                src={Lamps}
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
      <div className="bg-[#d1d1d1] h-[100px]"></div>
      <div className="relative bg-[#ffffff] h-[100px]">
        <motion.div
          initial={{ y: "50%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{
            duration: 0.75,
            ease: "easeInOut",
            delay: 2.5,
          }}
          className="absolute bottom-1/2 left-1/4"
        >
          <img alt="sofa" src={Sofa} width={1000} height={380} />
        </motion.div>
      </div>
    </motion.section>
  );
}
