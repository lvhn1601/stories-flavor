"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css/pagination";
import "swiper/css";

import Image from "next/image";

const HeroCarousal = () => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="hero-carousel max-h-[650px]"
    >
      <SwiperSlide>
        <div className="flex items-center pt-6 sm:pt-0 flex-col-reverse sm:flex-row">
          <Image
            src="/images/hero/hero.jpg"
            alt="headphone"
            className="w-full object-cover"
            width={1080}
            height={358}
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex items-center pt-6 sm:pt-0 flex-col-reverse sm:flex-row">
          <Image
            src="/images/hero/hero2.png"
            alt="headphone"
            className="w-full object-cover"
            width={1080}
            height={358}
          />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroCarousal;
