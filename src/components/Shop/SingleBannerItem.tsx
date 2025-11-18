"use client";
import React from "react";
import { Product } from "@/types/product";
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addItemToCart } from "@/redux/features/cart-slice";

const SingleBannerItem = ({ item, alignLeft }: { item: Product, alignLeft: boolean }) => {
  const dispatch = useDispatch<AppDispatch>();

  // add to cart
  const handleAddToCart = () => {
    dispatch(
      addItemToCart({
        ...item,
        quantity: 1,
      })
    );
  };

  return (
    <Link
      href={`/product/${item.id}`}
      className="flex items-center justify-between z-1 overflow-hidden rounded-lg shadow-lg px-14 bg-white py-12.5 group"
    >
      {alignLeft && (
        <div className="relative overflow-hidden flex items-center justify-center">
          <Image
            src={item.images[0]}
            alt={item.name}
            width={274}
            height={350}
            className="aspect-square object-cover"
          />
          <div className="absolute left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-200 group-hover:translate-y-0">
            <button
              onClick={(e) => { e.preventDefault(); handleAddToCart(); }}
              className="inline-flex font-medium text-custom-sm py-[7px] px-5 rounded-[5px] bg-primary text-white ease-out duration-200 hover:bg-primary-dark"
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
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
        <div className="relative overflow-hidden flex items-center justify-center">
          <Image
            src={item.images[0]}
            alt={item.name}
            width={274}
            height={350}
            className="aspect-square object-cover"
          />
          <div className="absolute left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-200 group-hover:translate-y-0">
            <button
              onClick={(e) => { e.preventDefault(); handleAddToCart(); }}
              className="inline-flex font-medium text-custom-sm py-[7px] px-5 rounded-[5px] bg-primary text-white ease-out duration-200 hover:bg-primary-dark"
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      )}
    </Link>
  );
};

export default SingleBannerItem;
