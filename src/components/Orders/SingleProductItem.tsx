import React from "react";

import Image from "next/image";

const SingleProductItem = ({ item }) => {
  return (
    <div className="flex items-center border-t border-gray-3 py-5 px-7.5">
      <div className="min-w-[55%]">
        <div className="flex items-center justify-between gap-5">
          <div className="w-full flex items-center gap-5.5">
            <div className="flex items-center justify-center rounded-[5px] bg-gray-2 max-w-[80px] w-full h-17.5">
              <Image width={200} height={200} src={item.images[0]} alt="product" className="aspect-square object-cover" />
            </div>

            <div>
              <h3 className="text-dark ease-out duration-200 hover:text-primary line-clamp-1">
                <a href="#"> {item.name} </a>
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="min-w-[20%]">
        <p className="text-dark text-center">{item.quantity}</p>
      </div>

      <div className="min-w-[25%]">
        <p className="text-dark">{(item.price * item.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ</p>
      </div>
    </div>
  );
};

export default SingleProductItem;
