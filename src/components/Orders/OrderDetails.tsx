import { formatDateUTC } from "@/utils/constant";
import { getOrderStatusStyle, getOrderStatusTitle } from "@/utils/order";
import React from "react";

const OrderDetails = ({ orderItem }: any) => {
  return (
    <>
      <div className="items-center w-full justify-between py-4.5 px-7.5 hidden md:flex ">
        <div className="min-w-[111px]">
          <p className="text-custom-sm text-dark">Order</p>
        </div>
        <div className="min-w-[175px]">
          <p className="text-custom-sm text-dark">Date</p>
        </div>

        <div className="min-w-[140px]">
          <p className="text-custom-sm text-dark">Status</p>
        </div>

        <div className="min-w-[114px]">
          <p className="text-custom-sm text-dark">Total</p>
        </div>
      </div>

      <div className="items-center justify-between border-t border-gray-3 py-5 px-7.5 hidden md:flex">
        <div className="min-w-[111px]">
          <p className="text-custom-sm text-red">
            #{orderItem.id.toString().padStart(6, "0")}
          </p>
        </div>
        <div className="min-w-[175px]">
          <p className="text-custom-sm text-dark">
            {formatDateUTC(orderItem.createdAt)}
          </p>
        </div>

        <div className="min-w-[140px]">
          <p
            className={`inline-block text-custom-sm  py-0.5 px-2.5 rounded-[30px] capitalize ${getOrderStatusStyle(orderItem.status)}`}
          >
            {getOrderStatusTitle(orderItem.status)}
          </p>
        </div>

        <div className="min-w-[114px]">
          <p className="text-custom-sm text-dark">
            {orderItem.total}
          </p>
        </div>
      </div>
      <div className="px-7.5 w-full">
        <p className="font-bold">Địa chỉ giao hàng:</p>{" "}
        <p>{orderItem.customerAddress}</p>
      </div>
    </>
  );
};

export default OrderDetails;
