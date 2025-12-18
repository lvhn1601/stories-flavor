import React from "react";
import Image from "next/image";

const stages = [
  {
    id: 1,
    title: "Tầng 1 – Nhìn: Pop-up 3D di sản.",
    description:
      "Ngay khi mở hộp, không gian di sản hiện lên qua thiết kế pop-up 3D tinh xảo, tái hiện hình ảnh kiến trúc và cảnh sắc vùng miền Việt Nam. Mỗi chi tiết được chăm chút như một lời chào đầu tiên, dẫn dắt người nhận bước vào câu chuyện văn hóa ẩn sau từng món đặc sản.",
    image: "/images/stages/stage-1.png",
  },
  {
    id: 2,
    title: "Tầng 2 – Nếm: Đặc sản hảo hạng.",
    description:
      "Sau khi chạm đến cảm xúc bằng ánh nhìn, hành trình tiếp tục bằng hương vị. Mỗi món đặc sản trong hộp đều được tuyển chọn kỹ lưỡng từ các vùng miền, đảm bảo nguồn gốc rõ ràng, chất lượng và giữ trọn hương vị truyền thống. Từ vị ngọt thanh, béo bùi đến dư vị mộc mạc quen thuộc, từng lần nếm là một lần cảm nhận câu chuyện văn hóa, đời sống và tinh hoa ẩm thực địa phương được chắt lọc qua thời gian.",
    image: "/images/stages/stage-2.png",
  },
];

const Stages = () => {
  return (
    <section className="overflow-hidden py-10">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        {/* <!-- section title --> */}
        <div className="mb-14 gap-4 flex flex-col items-center justify-center">
          <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
            Nhìn – Nếm:
          </h2>
          <p className="max-w-[80%] text-dark-2">
            Một hành trình khám phá Việt Nam được mở ra từ ánh nhìn đầu tiên đến
            dư vị còn đọng lại, nơi mỗi combo Stories Flavor không chỉ mang đến
            đặc sản vùng miền mà còn kể câu chuyện về con người, văn hóa và tinh
            hoa ẩm thực được gìn giữ qua nhiều thế hệ.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-x-7.5 gap-y-9">
          {/* <!-- New Arrivals item --> */}
          {stages.map((item, index) => {
            if (index % 2 === 0)
              return (
                <React.Fragment key={item.id || index}>
                  <div
                    id={`image-${item.id}`}
                    className="relative overflow-hidden flex items-center justify-center rounded-lg max-h-[60vh] shadow-lg"
                  >
                    <Image
                      src={item.image}
                      alt=""
                      className="w-full"
                      width={1080}
                      height={1080}
                    />
                  </div>
                  <div
                    id={`title-${item.id}`}
                    className="w-full flex flex-col gap-2 justify-center"
                  >
                    <h3 className="font-medium text-lg text-dark mt-4">
                      {item.title}
                    </h3>
                    <p>{item.description}</p>
                  </div>
                </React.Fragment>
              );
            else {
              return (
                <React.Fragment key={item.id || index}>
                  <div
                    id={`tile-${item.id}-top`}
                    className="w-full hidden sm:flex flex-col gap-2 justify-center"
                  >
                    <h3 className="font-medium text-lg text-dark mt-4">
                      {item.title}
                    </h3>
                    <p>{item.description}</p>
                  </div>
                  <div
                    id={`image-${item.id}`}
                    className="relative overflow-hidden flex items-center justify-center rounded-lg max-h-[60vh] shadow-lg"
                  >
                    <Image
                      src={item.image}
                      alt=""
                      className="w-full"
                      width={1080}
                      height={1080}
                    />
                  </div>
                  <div
                    id={`tile-${item.id}-bot`}
                    className="w-full flex sm:hidden flex-col gap-2 justify-center"
                  >
                    <h3 className="font-medium text-lg text-dark mt-4">
                      {item.title}
                    </h3>
                    <p>{item.description}</p>
                  </div>
                </React.Fragment>
              );
            }
          })}
        </div>
      </div>
    </section>
  );
};

export default Stages;
