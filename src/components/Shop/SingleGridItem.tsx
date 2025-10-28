"use client";
import React from "react";
import { Product } from "@/types/product";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { updateQuickView } from "@/redux/features/quickView-slice";
import { addItemToCart } from "@/redux/features/cart-slice";
import { addItemToWishlist } from "@/redux/features/wishlist-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import Link from "next/link";
import Image from "next/image";

const SingleGridItem = ({ item }: { item: Product }) => {
  const { openModal } = useModalContext();

  const dispatch = useDispatch<AppDispatch>();

  // update the QuickView state
  // const handleQuickViewUpdate = () => {
  //   dispatch(updateQuickView({ ...item }));
  // };

  // add to cart
  // const handleAddToCart = () => {
  //   dispatch(
  //     addItemToCart({
  //       ...item,
  //       quantity: 1,
  //     })
  //   );
  // };

  // const handleItemToWishList = () => {
  //   dispatch(
  //     addItemToWishlist({
  //       ...item,
  //       status: "available",
  //       quantity: 1,
  //     })
  //   );
  // };

  return (
    <div className="group">
      <div className="relative overflow-hidden flex items-center justify-center rounded-lg bg-white shadow-1 min-h-[270px] mb-4">
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

      <h3 className="font-medium text-dark ease-out duration-200 hover:text-primary mb-1.5">
        <Link href="/shop-details"> {item.name} </Link>
      </h3>

      <span className="flex items-center gap-2 font-medium text-lg">
        <span className="text-primary text-base">{item.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ</span>
        {/* <span className="text-dark-4 line-through">${item.price}</span> */}
      </span>
    </div>
  );
};

export default SingleGridItem;
