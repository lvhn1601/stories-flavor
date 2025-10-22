import React from "react";
import Image from "next/image";

const PromoBanner = () => {
  return (
    <section className="overflow-hidden">
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
        <div className="bg-primary relative z-1 overflow-hidden rounded-xl">
          {/* <!-- bg shapes --> */}
          <div className="absolute -z-1 max-w-[523px] max-h-[243px] w-full h-full right-0 top-0 bg-gradient-1"></div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-evenly gap-8 px-4 sm:px-7.5 xl:pl-12.5 xl:pr-14 py-11">
            <div className="flex flex-col items-center max-w-[491px]">
              <Image
                src="/images/annoucement-man.png"
                alt="annoucement-man"
                // className="absolute -z-1 w-full h-full left-0 top-0 rounded-xl"
                width={150}
                height={150}
              />
              <p className="text-white font-bold">
                “Mang Việt Nam đến trong từng món quà.”
              </p>
            </div>

            <div className="max-w-[477px]">
              <button className="inline-flex justify-center py-3 px-7 text-2xl text-white border-2 font-medium rounded-2xl ease-out duration-200">
                Đặt hàng ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
