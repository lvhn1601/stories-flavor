"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import Image from "next/image";
import { useRef } from "react";

import { usePreviewSlider } from "@/app/context/PreviewSliderContext";
import { useAppSelector } from "@/redux/store";

const PreviewSliderModal = () => {
  const { closePreviewModal, isModalPreviewOpen } = usePreviewSlider();
  const data = useAppSelector((state) => state.productDetailsReducer.value);

  const sliderRef = useRef(null);

  return (
    <div
      className={`preview-slider w-full h-screen fixed inset-0 z-[999999] bg-[#000000F2] bg-opacity-50 flex justify-center items-center ${isModalPreviewOpen ? "" : "hidden"
        }`}
    >
      {/* Close Button */}
      <button
        onClick={closePreviewModal}
        aria-label="close"
        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-white z-50"
      >
        ✕
      </button>

      {/* Prev Button */}
      <button
        className="absolute left-4 p-4 z-50 text-white"
        onClick={() => sliderRef.current?.swiper.slidePrev()}
      >
        <svg width="32" height="32" viewBox="0 0 26 26" fill="none">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.4082 20.0745C11.0909 20.3918 10.5764 20.3918 10.2591 20.0745L3.75914 13.5745C3.44184 13.2572 3.44184 12.7428 3.75914 12.4255L10.2591 5.92548C10.5764 5.60817 11.0909 5.60817 11.4082 5.92548C11.7255 6.24278 11.7255 6.75722 11.4082 7.07452L6.29523 12.1875H21.667C22.1157 12.1875 22.4795 12.5513 22.4795 13C22.4795 13.4487 22.1157 13.8125 21.667 13.8125H6.29523L11.4082 18.9255C11.7255 19.2428 11.7255 19.7572 11.4082 20.0745Z"
            fill="#fff"
          />
        </svg>
      </button>

      {/* Next Button */}
      <button
        className="absolute right-4 p-4 z-50 text-white"
        onClick={() => sliderRef.current?.swiper.slideNext()}
      >
        <svg width="32" height="32" viewBox="0 0 26 26" fill="none">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.5918 5.92548C14.9091 5.60817 15.4236 5.60817 15.7409 5.92548L22.2409 12.4255C22.5582 12.7428 22.5582 13.2572 22.2409 13.5745L15.7409 20.0745C15.4236 20.3918 14.9091 20.3918 14.5918 20.0745C14.2745 19.7572 14.2745 19.2428 14.5918 18.9255L19.7048 13.8125H4.33301C3.88428 13.8125 3.52051 13.4487 3.52051 13C3.52051 12.5513 3.88428 12.1875 4.33301 12.1875H19.7048L14.5918 7.07452C14.2745 6.75722 14.2745 6.24278 14.5918 5.92548Z"
            fill="#fff"
          />
        </svg>
      </button>

      {/* SWIPER */}
      <div className="w-full max-w-3xl px-10">
        <Swiper
          ref={sliderRef}
          slidesPerView={1}
          spaceBetween={20}
          modules={[Navigation]}
        >
          {data?.images?.map((img: string, index: number) => (
            <SwiperSlide key={index}>
              <div className="flex justify-center items-center">
                <Image
                  src={img}
                  alt={`image-${index}`}
                  width={600}
                  height={600}
                  className="rounded-lg object-contain max-h-[80vh]"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PreviewSliderModal;
