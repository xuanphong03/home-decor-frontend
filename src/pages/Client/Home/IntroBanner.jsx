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
      className="overflow-hidden"
    >
      <div className="relative pt-[90px] h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] xl:h-screen">
        <div className="max-w-full lg:max-w-[1300px] h-full mx-auto flex items-center">
          <div className="w-full flex flex-col gap-5 text-secondary overflow-hidden px-4">
            <motion.h3
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{
                duration: 1.25,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="text-xs md:text-base xl:text-lg uppercase font-semibold tracking-wider"
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
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold capitalize max-w-[50%] md:max-w-[40%] xl:leading-loose"
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
                className="bg-primary text-secondary py-2 block px-4 md:px-6 lg:px-7 xl:px-9 w-fit text-xs md:text-sm xl:text-[15px] font-semibold xl:leading-8 hover:bg-secondary hover:text-white transition-all"
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
            className="absolute top-0 bottom-0 left-1/2 w-[200px] sm:w-[250px] md:w-[300px] lg:w-[400px] xl:w-[500px] bg-primary"
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
      <div className="bg-[#d1d1d1] h-[20px] xl:h-[100px]"></div>
      <div className="relative bg-[#ffffff] h-[20px] xl:h-[100px]">
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
