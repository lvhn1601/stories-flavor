"use client";
import React from "react";

import { Product } from "@/types/product";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import Link from "next/link";
import Image from "next/image";

const SingleListItem = ({ item }: { item: Product }) => {
  const { openModal } = useModalContext();

  // add to cart
  // const handleAddToCart = () => {
  //   dispatch(
  //     addItemToCart({
  //       ...item,
  //       quantity: 1,
  //     })
  //   );
  // };

  return (
    <div className="group rounded-lg bg-white shadow-1">
      <div className="flex">
        <div className="shadow-list relative overflow-hidden flex items-center justify-center max-w-[270px] w-full sm:min-h-[270px] p-4">
          <Image src={item.images[0]} alt="" width={250} height={250} />

          <div className="absolute left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-200 group-hover:translate-y-0">
            <button
              // onClick={() => handleAddToCart()}
              className="inline-flex font-medium text-custom-sm py-[7px] px-5 rounded-[5px] bg-primary text-white ease-out duration-200 hover:bg-primary-dark"
            >
              Add to cart
            </button>
          </div>
        </div>

        <div className="w-full flex flex-col gap-5 sm:flex-row sm:items-center justify-center sm:justify-between py-5 px-4 sm:px-7.5 lg:pl-11 lg:pr-12">
          <div>
            <h3 className="font-medium text-2xl text-dark ease-out duration-200 hover:text-primary mb-1.5">
              <Link href="/shop-details"> {item.name} </Link>
            </h3>

            <span className="flex items-center gap-2 font-medium text-lg">
              <span className="text-primary">{item.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleListItem;
