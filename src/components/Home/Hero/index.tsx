import React from "react";
import HeroCarousel from "./HeroCarousel";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="overflow-hidden pt-10">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="flex flex-wrap gap-5">
          <div className="w-full">
            <div className="relative z-1 rounded-[10px] bg-white overflow-hidden">
              {/* <!-- bg shapes --> */}
              <Image
                src="/images/hero/hero-bg.png"
                alt="hero bg shapes"
                className="absolute right-0 bottom-0 -z-1"
                width={534}
                height={520}
              />

              <HeroCarousel />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
