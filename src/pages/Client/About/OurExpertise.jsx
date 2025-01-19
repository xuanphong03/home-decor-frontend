import { motion } from "motion/react";

export default function OurExpertise() {
  const OUR_EXPERTISE = [
    { id: 1, name: "Thiết kế nội thất", percent: 85 },
    { id: 2, name: "Auto CAD", percent: 74 },
    { id: 3, name: "Chiếu sáng", percent: 94 },
    { id: 4, name: "Kỹ năng 3D", percent: 83 },
  ];
  return (
    <section className="py-[60px] xl:py-[100px] bg-[#f5f5f5]">
      <div className="px-[15px] max-w-[1300px] mx-auto">
        <div className="flex items-center flex-wrap -mx-[15px] gap-10 xl:gap-0">
          <div className="xl:basis-1/2 xl:max-w-[50%] xl:flex-shrink-0 px-[15px] xl:pl-[15px] xl:pr-[60px]">
            <img
              alt=""
              src={`https://ciyashop.potenzaglobalsolutions.com/decor/wp-content/uploads/sites/84/2020/08/about-img1.png`}
              className="max-w-full object-cover mx-auto"
            />
          </div>
          <div className="xl:basis-1/2 xl:max-w-[50%] px-[15px]">
            <div className="mb-[50px]">
              <h2 className="text-secondary text-[26px] xl:text-4xl font-bold mb-[10px]">
                Về sự hoàn hảo của chúng tôi
              </h2>
              <div className="text-[#777777] text-[15px]">
                <p className="mb-[15px]">
                  Thành công thực sự không quá khó khăn. Có một phần đáng kể dân
                  số ở Bắc Mỹ Tại sao?
                </p>
                <p>
                  Chúng ta cũng biết những câu chuyện hoành tráng đó, những
                  truyền thuyết thời hiện đại xoay quanh những thất bại ban đầu
                  của những người cực kỳ thành công như Michael Jordan và Bill
                  Gates. Chúng ta có thể nhìn ngược thời gian xa hơn một chút về
                  Albert Einstein hoặc thậm chí xa hơn về thời Abraham Lincoln.
                  Điều gì đã khiến mỗi người trong số họ thành công đến vậy?
                  Động lực.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-secondary text-[26px] xl:text-4xl font-bold mb-[10px]">
                Chuyên môn của chúng tôi
              </h2>
              <ul>
                {OUR_EXPERTISE.map((expertise) => (
                  <li key={expertise.id} className="mb-5">
                    <div className="relative flex items-center justify-between mb-1">
                      <h5 className="text-[15px]">{expertise.name}</h5>
                      <motion.span
                        initial="hidden"
                        whileInView="visible"
                        variants={{
                          visible: {
                            left: `${expertise.percent}%`,
                            transition: { duration: 1.5, ease: "easeInOut" },
                          },
                          hidden: {
                            left: `0%`,
                          },
                        }}
                        className={`absolute top-0 bottom-0 -translate-x-full font-semibold`}
                      >
                        {expertise.percent}%
                      </motion.span>
                    </div>
                    <div className="bg-slate-300 rounded relative h-[5px]">
                      <motion.span
                        initial="hidden"
                        whileInView="visible"
                        variants={{
                          visible: {
                            width: `${expertise.percent}%`,
                            transition: { duration: 1.5, ease: "easeInOut" },
                          },
                          hidden: {
                            width: `0%`,
                          },
                        }}
                        className={`absolute top-0 bottom-0 left-0 bg-primary rounded`}
                      ></motion.span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
