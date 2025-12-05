"use client";
import React from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { updateQuickView } from "@/redux/features/quickView-slice";
import { updateproductDetails } from "@/redux/features/product-details";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import Link from "next/link";

const ProductItem = ({
  item,
  isPreview = false,
}: {
  item: Product;
  isPreview: boolean;
}) => {
  const { openModal } = useModalContext();

  const dispatch = useDispatch<AppDispatch>();

  // update the QuickView state
  const handleQuickViewUpdate = () => {
    dispatch(updateQuickView({ ...item }));
  };

  const handleProductDetails = () => {
    dispatch(updateproductDetails({ ...item }));
  };

  return (
    <Link href={`/product/${item.id}`} className="group">
      <div className="overflow-hidden flex items-center justify-center rounded-lg shadow-lg min-h-[270px] mb-4">
        <Image src={item.images[0]} alt="" width={250} height={250} className="w-full max-w-[90%] aspect-square object-cover" />
      </div>

      <h3
        className="w-full flex items-center justify-center font-medium text-dark ease-out duration-200 hover:text-primary mb-1.5"
        onClick={() => handleProductDetails()}
      >
        {item.name}
      </h3>
    </Link>
  );
};

export default ProductItem;
