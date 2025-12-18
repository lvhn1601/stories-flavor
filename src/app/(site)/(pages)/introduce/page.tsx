"use client";

import PromoBanner from "@/components/Home/PromoBanner";
import Introduce from "@/components/Introduce";
import CoreValue from "@/components/Introduce/CoreValue";
import Missions from "@/components/Introduce/Missions";
import Partners from "@/components/Introduce/Partners";
import Teams from "@/components/Introduce/Team";
import Image from "next/image";

export default function IntroducePage() {
  return (
    <main>
      <div className="max-w-[1170px] w-full flex flex-col gap-10 mx-auto px-4 sm:px-8 xl:px-0 pt-10">
        <h1 className="font-bold text-2xl xl:text-heading-4 text-dark text-center">
          Giới thiệu
        </h1>
        <div className="w-full flex flex-col items-center justify-center">
          <Image
            src="/images/introduce.png"
            alt="Introduce Hero"
            width={1920}
            height={600}
            className="w-full h-auto max-h-[560px] object-cover mt-8 rounded-lg shadow-lg"
          />

          <div className="mt-10 flex flex-col gap-2 text-start text-dark xl:text-lg max-w-4xl">
            <p className="font-semibold">
              “Chúng tôi tin rằng mỗi hộp quà không chỉ là món ăn, mà còn là ký
              ức, âm thanh và hương vị quê hương.”
            </p>
            <p>Stories Flavor ra đời từ mong muốn gói trọn văn hóa Việt Nam trong một hộp quà. Giữa nhịp sống hiện đại, khi con người ngày càng quen với mua sắm online nhưng lại dần xa rời những giá trị truyền thống, chúng tôi muốn tạo nên một trải nghiệm mới – nơi đặc sản vùng miền không chỉ để thưởng thức, mà còn để cảm nhận, lắng nghe và ghi nhớ.</p>
            <p>Thay vì bán lẻ từng món đặc sản rời rạc, Stories Flavor lựa chọn cách kể chuyện. Mỗi sản phẩm là một hành trình được thiết kế theo nhiều tầng trải nghiệm, giúp người nhận khám phá Việt Nam một cách trọn vẹn hơn.</p>
            <p>Hành trình ấy bắt đầu từ Tầng 1 – Nhìn, khi mở hộp và chiêm ngưỡng không gian di sản Việt Nam được tái hiện qua pop-up 3D tinh xảo. Tiếp đến là Tầng 2 – Nếm, nơi những đặc sản hảo hạng được tuyển chọn từ khắp các vùng miền mang đến hương vị mộc mạc, chân thật và đậm đà bản sắc. Tất cả hòa quyện để tạo nên một trải nghiệm không chỉ dừng lại ở ăn ngon, mà còn là sự kết nối với con người, văn hóa và ký ức quê hương.</p>
            <p>Stories Flavor không chỉ là một hộp quà, mà là một câu chuyện Việt Nam được kể bằng hình ảnh và hương vị.</p>
          </div>
        </div>
        <Missions />
        <CoreValue />
        <Teams />
        <Partners />
        {/* <Stories /> */}
        <PromoBanner />
      </div>
    </main>
  );
}
