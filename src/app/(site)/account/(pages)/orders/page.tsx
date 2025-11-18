"use client";

import SingleOrder from "@/components/Orders/SingleOrder";
import { useAPI } from "@/hooks/useAPI";
import React, { useEffect, useState } from "react";

const OrdersPage = () => {
  const [orders, setOrders] = useState<any>([]);

  const { API } = useAPI();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await API.get('/order', false, true);

    if (res.success) {
      setOrders(res.data);
    }
  }

  return (
    <div className='min-h-screen flex w-full'>
      <div className="w-full bg-white shadow-lg rounded-xl">
        <div className="flex items-center justify-between py-5 px-4 sm:pl-7.5 sm:pr-6 border-b border-gray-3">
          <p className="font-medium text-xl text-dark">
            Đơn hàng của bạn
          </p>
        </div>

        <div className="w-full">
          <div className="min-w-[840px]">
            {orders.length > 0 && (
              <div className="items-center justify-between py-4.5 px-7.5 hidden md:flex ">
                <div className="min-w-[111px]">
                  <p className="text-custom-sm text-dark">Mã đơn</p>
                </div>
                <div className="min-w-[175px]">
                  <p className="text-custom-sm text-dark">Ngày tạo</p>
                </div>

                <div className="min-w-[128px]">
                  <p className="text-custom-sm text-dark">Trạng thái</p>
                </div>

                <div className="min-w-[113px]">
                  <p className="text-custom-sm text-dark">Giá</p>
                </div>

                <div className="min-w-[113px]">
                  <p className="text-custom-sm text-dark"></p>
                </div>
              </div>
            )}
            {orders.length > 0 ? (
              orders.map((orderItem, key) => (
                <SingleOrder key={key} orderItem={orderItem} smallView={false} />
              ))
            ) : (
              <p className="py-9.5 px-4 sm:px-7.5 xl:px-10">
                Bạn chưa có đơn hàng nào
              </p>
            )}
          </div>

          <div className="flex flex-col gap-4 p-2">
            {orders.length > 0 &&
              orders.map((orderItem, key) => (
                <SingleOrder key={key} orderItem={orderItem} smallView={true} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;