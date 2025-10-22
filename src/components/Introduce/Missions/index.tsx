import React from "react";
import Image from "next/image";

const Missions = () => {
  return (
    <div className="flex items-center justify-between z-1 overflow-hidden rounded-lg bg-[#F5F5F7] py-12.5">
      <div className="max-w-[50%] min-h-[280px] w-full">
        <h2 className="font-bold text-xl lg:text-heading-4 xl:text-heading-3 text-dark mb-5">
          Sứ mệnh và tầm nhìn của chúng tôi
        </h2>

        <p>
          Mang tinh hoa ẩm thực và văn hóa Việt đến gần hơn với người Việt trẻ, doanh nghiệp và bạn bè quốc tế.
        </p>
      </div>

      <Image
        src="/images/promo/promo-01.png"
        alt="promo img"
        width={274}
        height={350}
      />
    </div>
  );
};

export default Missions;