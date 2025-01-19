export default function TypesOfLights() {
  const leftColumn = [
    {
      id: 1,
      name: "Bóng đèn sợi đốt",
      desc: "Hãy tìm một bức tranh về những gì tượng trưng cho thành công của bạn và sau đó lấy nó ra khi bạn cần động lực.",
      imageUrl:
        "https://ciyashop.potenzaglobalsolutions.com/decor/wp-content/uploads/sites/84/2020/08/type-icon1.png",
    },
    {
      id: 2,
      name: "Natri áp suất thấp",
      desc: "Một số người sẽ nói với bạn rằng có bốn trong khi những người khác có thể nói với bạn rằng có tám.",
      imageUrl:
        "https://ciyashop.potenzaglobalsolutions.com/decor/wp-content/uploads/sites/84/2020/08/type-icon2.png",
    },
    {
      id: 3,
      name: "Bóng đèn halogen",
      desc: "Hãy kiểm tra nó thường xuyên và đảm bảo rằng mỗi bước sẽ đưa bạn đến gần hơn với Tầm nhìn và Mục tiêu của mình.",
      imageUrl:
        "https://ciyashop.potenzaglobalsolutions.com/decor/wp-content/uploads/sites/84/2020/08/type-icon3.png",
    },
  ];
  const rightColumn = [
    {
      id: 4,
      name: "Natri áp suất cao",
      desc: "Hãy kiểm tra nó thường xuyên và đảm bảo rằng mỗi bước sẽ đưa bạn đến gần hơn với Tầm nhìn và Mục tiêu của mình.",
      imageUrl:
        "https://ciyashop.potenzaglobalsolutions.com/decor/wp-content/uploads/sites/84/2020/08/type-icon4.png",
    },
    {
      id: 5,
      name: "Điốt phát sáng",
      desc: "Một số người sẽ nói với bạn rằng có bốn trong khi những người khác có thể nói với bạn rằng có tám.",
      imageUrl:
        "https://ciyashop.potenzaglobalsolutions.com/decor/wp-content/uploads/sites/84/2020/08/type-icon5.png",
    },
    {
      id: 6,
      name: "Đèn đường LED",
      desc: "Hãy kiểm tra nó thường xuyên và đảm bảo rằng mỗi bước sẽ đưa bạn đến gần hơn với Tầm nhìn và Mục tiêu của mình.",
      imageUrl:
        "https://ciyashop.potenzaglobalsolutions.com/decor/wp-content/uploads/sites/84/2020/08/type-icon6.png",
    },
  ];

  return (
    <section className="py-[60px] lg:py-[100px] px-[15px] max-w-[1300px] mx-auto">
      <div className="text-center">
        <h2 className="mb-[10px] font-bold text-[26px] lg:text-4xl">
          Các loại đèn
        </h2>
        <p className="mb-[15px] text-[#777777] text-[15px]">
          Hãy nhắc nhở bản thân rằng bạn không còn nơi nào để đi ngoại trừ việc
          đi lên vì bạn đã ở dưới đáy rồi.
        </p>
      </div>
      <div className="flex flex-wrap items-center mt-10">
        <div className="basis-full max-w-full xl:basis-1/3 xl:max-w-[33.333333%]">
          <ul>
            {leftColumn.map(({ id, name, desc, imageUrl }) => (
              <li key={id} className="mb-4">
                <div className="mb-[15px] flex items-center">
                  <div className="size-[55px]">
                    <img
                      alt="icon"
                      src={imageUrl}
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                  <h4 className="pl-[15px] text-secondary font-semibold text-lg text-[22px]">
                    {name}
                  </h4>
                </div>
                <p className="text-[15px] text-[#777777]">{desc}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden xl:block xl:basis-1/3 xl:max-w-[33.333333%]">
          <img
            alt=""
            src={`https://ciyashop.potenzaglobalsolutions.com/decor/wp-content/uploads/sites/84/2020/08/light-type2.png`}
            className="max-w-full h-auto mx-auto"
          />
        </div>
        <div className="basis-full max-w-full xl:basis-1/3 xl:max-w-[33.333333%]">
          <ul>
            {rightColumn.map(({ id, name, desc, imageUrl }) => (
              <li key={id} className="mb-4">
                <div className="mb-[15px] flex items-center">
                  <div className="size-[55px]">
                    <img
                      alt="icon"
                      src={imageUrl}
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                  <h4 className="pl-[15px] text-secondary font-semibold text-lg lg:text-[22px]">
                    {name}
                  </h4>
                </div>
                <p className="text-[15px] text-[#777777]">{desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
