"use client";
import React from "react";
import { Product } from "@/types/product";
import Link from "next/link";
import Image from "next/image";

const SingleBannerItem = ({ item, alignLeft }: { item: Product, alignLeft: boolean }) => {
  return (
    <Link
      href={`/product/${item.id}`}
      className="flex items-center justify-between z-1 overflow-hidden rounded-lg shadow-lg px-14 bg-white py-12.5 group"
    >
      {alignLeft && (
        <Image
          src={item.images[0]}
          alt={item.name}
          width={274}
          height={350}
        />
      )}
      <div className="flex flex-col gap-5 max-w-[50%] min-h-[120px] w-full">
        <h2 className="font-bold text-xl lg:text-heading-4 xl:text-heading-3 text-dark">
          {item.name}
        </h2>

        <span className="flex items-center gap-2 font-medium text-lg text-primary">
          {item.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ
        </span>

        <div
          className="prose prose-sm max-w-none text-gray-700 overflow-hidden max-h-[80px] transition-all duration-300 group-hover:max-h-[120px]"
          dangerouslySetInnerHTML={{ __html: item.description || "" }}
        />
      </div>

      {alignLeft || (
        <Image
          src={item.images[0]}
          alt={item.name}
          width={274}
          height={350}
        />
      )}
    </Link>
  );
};

export default SingleBannerItem;
