import React from "react";
import ProductItem from "@/components/Common/ProductItem";
import shopData from "@/components/Shop/shopData";
import Image from "next/image";

const values = [
  {
    id: 1,
    title: "Văn hóa: Mỗi hộp quà kể một câu chuyện về vùng miền.",
    image: "/images/stage.jpg",
  },
  {
    id: 2,
    title: "Chất lượng: Đặc sản tuyển chọn kỹ lưỡng, bao bì độc đáo.",
    image: "/images/stage.jpg",
  },
  {
    id: 3,
    title: "Sáng tạo: Đưa công nghệ & thiết kế 3D, âm thanh vào quà tặng.",
    image: "/images/stage.jpg",
  },
  {
    id: 4,
    title: "Kết nối: Là cầu nối giữa con người – văn hóa – kỷ niệm.",
    image: "/images/stage.jpg",
  },
];

const CoreValue = () => {
  return (
    <div className="w-full">
      {/* <!-- section title --> */}
      <div className="mb-14">
        <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
          Giá trị cốt lõi
        </h2>
      </div>

      <div className="flex flex-col gap-6">
        {/* <!-- New Arrivals item --> */}
        {values.map((item, index) => {
          if (index % 2 === 0)
            return (
              <div id={`${item.id}`} className="flex justify-start items-center w-full bg-gray-4">
                <Image
                  src={item.image}
                  alt="image"
                  className="w-1/4 aspect-video object-cover"
                  width={1080}
                  height={1080}
                />
                <h3 className="px-10 w-3/4 font-medium text-base lg:text-lg text-dark">
                  {item.title}
                </h3>
              </div>
            );
          else {
            return (
              <div id={`${item.id}`} className="flex justify-start items-center w-full bg-gray-4">
                <h3 className="px-10 w-3/4 font-medium text-base lg:text-lg text-dark">
                  {item.title}
                </h3>
                <Image
                  src={item.image}
                  alt="image"
                  className="w-1/4 aspect-video object-cover"
                  width={1080}
                  height={1080}
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default CoreValue;
