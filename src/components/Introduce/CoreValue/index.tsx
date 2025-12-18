import React from "react";
import Image from "next/image";

const values = [
  {
    id: 1,
    title: "Văn hóa",
    description:
      "Mỗi hộp quà của Stories Flavor không chỉ chứa đựng đặc sản, mà còn kể một <strong>câu chuyện về vùng miền, con người và bản sắc văn hóa địa phương.</strong> Chúng tôi trân trọng và lan tỏa những giá trị truyền thống Việt Nam thông qua trải nghiệm ẩm thực hiện đại.",
    image: "/images/values/value-1.png",
  },
  {
    id: 2,
    title: "Chất lượng",
    description:
      "Stories Flavor cam kết <strong>tuyển chọn kỹ lưỡng đặc sản từ các nông dân, làng nghề và hợp tác xã uy tín</strong>, đảm bảo nguồn gốc rõ ràng và hương vị nguyên bản. Mỗi sản phẩm được đóng gói chỉn chu, kết hợp bao bì sáng tạo nhằm mang đến trải nghiệm trọn vẹn cho người dùng.",
    image: "/images/values/value-2.png",
  },
  {
    id: 3,
    title: "Sáng tạo",
    description: "Chúng tôi không ngừng đổi mới bằng cách <strong>kết hợp công nghệ, thiết kế pop-up 3D và trải nghiệm âm thanh</strong> vào quà tặng, tạo nên sự khác biệt so với các mô hình bán đặc sản truyền thống, đồng thời nâng cao giá trị cảm xúc của sản phẩm.",
    image: "/images/values/value-3.png",
  },
  {
    id: 4,
    title: "Kết nối",
    description: "Stories Flavor đóng vai trò là <strong>cầu nối giữa con người – văn hóa – ký ức</strong>, giúp người thưởng thức không chỉ cảm nhận hương vị quê hương mà còn gắn kết với những giá trị tinh thần, cảm xúc và câu chuyện phía sau mỗi món quà.",
    image: "/images/values/value-4.png",
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
        {values.map((item, index) => (
          <div
            key={`${item.id}`}
            className="flex justify-start items-centerw-full bg-primary-light"
          >
            {index % 2 === 0 ? (
              <>
                <Image
                  src={item.image}
                  alt="image"
                  className="w-1/4 aspect-video object-cover"
                  width={1080}
                  height={1080}
                />
                <div className="flex flex-col gap-2 px-10 py-15 w-3/4">
                  <h3 className="font-medium text-base lg:text-lg text-dark">
                    {item.title}
                  </h3>
                  <div
                    className="text-sm lg:text-base"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-2 px-10 py-15 w-3/4">
                  <h3 className="font-medium text-base lg:text-lg text-dark">
                    {item.title}
                  </h3>
                  <div
                    className="text-sm lg:text-base"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </div>
                <Image
                  src={item.image}
                  alt="image"
                  className="w-1/4 aspect-video object-cover"
                  width={1080}
                  height={1080}
                />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoreValue;
