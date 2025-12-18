import React from "react";
import Image from "next/image";

const Missions = () => {
  return (
    <div className="flex items-center justify-between z-1 overflow-hidden rounded-2xl">
      <div className="max-w-[50%] w-full">
        <h2 className="font-bold text-xl lg:text-heading-4 xl:text-heading-3 text-dark mb-5">
          Sứ mệnh và tầm nhìn của chúng tôi
        </h2>

        <p>
          Trở thành nền tảng bán combo đặc sản vùng miền hàng đầu Việt Nam, mang
          tinh hoa ẩm thực và văn hóa địa phương đến với khách hàng trong và
          ngoài nước. Stories Flavor hướng tới việc góp phần xây dựng thương
          hiệu Việt trên bản đồ thương mại điện tử khu vực và quốc tế.
        </p>
      </div>

      <Image
        src="/images/mission.png"
        alt="promo img"
        width={274}
        height={350}
      />
    </div>
  );
};

export default Missions;
