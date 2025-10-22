import React from "react";
import Hero from "../Home/Hero";
import Stages from "../Home/Stages";
import Collection from "../Colllection";
import Testimonials from "../Home/Testimonials";
import Stories from "../Home/Stories";
import PromoBanner from "../Home/PromoBanner";
import Image from "next/image";
import CoreValue from "./CoreValue";
import Missions from "./Missions";
import Team from "./Team";
import Partners from "./Partners";

const Introduce = () => {
  return (
    <main>
      <div className="max-w-[1170px] w-full flex flex-col gap-10 mx-auto px-4 sm:px-8 xl:px-0 mt-36">
        <h1 className="font-bold text-2xl xl:text-heading-4 text-dark text-center">
          Giới thiệu
        </h1>
        <div className="w-full flex flex-col items-center justify-center">
          <Image
            src="/images/hero/hero2.png"
            alt="Introduce Hero"
            width={1920}
            height={600}
            className="w-full h-auto max-h-[560px] object-cover mt-8 rounded-lg shadow-lg"
          />

          <div className="mt-6 text-start text-dark font-semibold xl:text-lg max-w-4xl">
            <p>
              “Chúng tôi tin rằng mỗi hộp quà không chỉ là món ăn, mà còn là ký
              ức, âm thanh và hương vị quê hương.”
            </p>
            <p>Kể ngắn gọn:</p>
            <ul className="list-disc list-inside mt-2">
              <li>
                Vì sao dự án ra đời (muốn gói trọn văn hóa 3 miền trong một hộp
                quà).
              </li>
              <li>
                Hành trình từ ý tưởng đến sản phẩm (tầng 1 – pop-up 3D, tầng 2 –
                âm thanh, tầng 3 – đặc sản).
              </li>
            </ul>
          </div>
        </div>
        <Missions />
        <CoreValue />
        <Team />
        <Partners />
        {/* <Stories /> */}
        <PromoBanner />
      </div>
    </main>
  );
};

export default Introduce;
