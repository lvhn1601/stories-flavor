import React from "react";
import ProductItem from "@/components/Common/ProductItem";
import shopData from "@/components/Shop/shopData";
import Image from "next/image";

const stages = [
  {
    id: 1,
    title: "Tầng 1 – Nhìn: Pop-up 3D di sản.",
    image: "/images/stage.jpg",
  },
  {
    id: 2,
    title: "Tầng 2 – Nếm: Đặc sản hảo hạng.",
    image: "/images/stage.jpg",
  },
];

const Stages = () => {
  return (
    <section className="overflow-hidden my-10">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        {/* <!-- section title --> */}
        <div className="mb-14 flex items-center justify-center">
          <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
            Nhìn – Nghe – Nếm: Trải nghiệm Việt Nam qua 3 tầng bất ngờ
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-x-7.5 gap-y-9">
          {/* <!-- New Arrivals item --> */}
          {stages.map((item, index) => {
            if (index / 2 === 0)
              return (
                <>
                  <div className="relative overflow-hidden flex items-center justify-center rounded-lg max-h-[60vh] shadow-lg">
                    <Image
                      src={item.image}
                      alt=""
                      className="w-full"
                      width={1080}
                      height={1080}
                    />
                  </div>
                  <div className="w-full flex justify-center">
                    <h3 className="font-medium text-lg text-dark mt-4">
                      {item.title}
                    </h3>
                  </div>
                </>
              );
            else {
              return (
                <>
                  <div className="w-full hidden sm:flex justify-center">
                    <h3 className="font-medium text-lg text-dark mt-4">
                      {item.title}
                    </h3>
                  </div>
                  <div className="relative overflow-hidden flex items-center justify-center rounded-lg max-h-[60vh] shadow-lg">
                    <Image
                      src={item.image}
                      alt=""
                      className="w-full"
                      width={1080}
                      height={1080}
                    />
                  </div>
                  <div className="w-full flex sm:hidden justify-center">
                    <h3 className="font-medium text-lg text-dark mt-4">
                      {item.title}
                    </h3>
                  </div>
                </>
              );
            }
          })}
        </div>
      </div>
    </section>
  );
};

export default Stages;
