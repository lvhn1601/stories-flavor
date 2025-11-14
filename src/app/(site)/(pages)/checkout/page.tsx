"use client";
import Billing from "@/components/Checkout/Billing";
import Coupon from "@/components/Checkout/Coupon";
import Login from "@/components/Checkout/Login";
import PaymentMethod from "@/components/Checkout/PaymentMethod";
import Shipping from "@/components/Checkout/Shipping";
import ShippingMethod from "@/components/Checkout/ShippingMethod";
import { selectTotalPrice } from "@/redux/features/cart-slice";
import { useAppSelector } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";

const CheckoutPage = () => {
  const cartItems = useAppSelector((state) => state.cartReducer.items);
  const totalPrice = useSelector(selectTotalPrice);

  return (
    <section className="overflow-hidden py-10">
      <h1 className="font-bold text-2xl xl:text-heading-4 text-dark text-center mb-10">
        Thông tin thanh toán
      </h1>
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <form>
          <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-11">
            {/* <!-- checkout left --> */}
            <div className="lg:max-w-[670px] w-full">

              {/* <!-- billing details --> */}
              <Billing />

              {/* <!-- others note box --> */}
              <div className="bg-white shadow-lg rounded-[10px] p-4 sm:p-8.5 mt-7.5">
                <div>
                  <label htmlFor="notes" className="block mb-2.5">
                    Ghi chú (Tuỳ chọn)
                  </label>

                  <textarea
                    name="notes"
                    id="notes"
                    rows={5}
                    placeholder="Notes about your order, e.g. speacial notes for delivery."
                    className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full p-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-primary/20"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* // <!-- checkout right --> */}
            <div className="max-w-[455px] w-full">
              {/* <!-- order list box --> */}
              <div className="bg-white shadow-lg rounded-[10px]">
                <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
                  <h3 className="font-medium text-xl text-dark">
                    Đơn hàng của bạn
                  </h3>
                </div>

                <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
                  {/* <!-- product items --> */}
                  {cartItems.map((item, key) => (
                    <div key={key} className="flex items-center justify-between gap-2 py-5 border-b border-gray-3">
                      <div>
                        <p className="text-dark line-clamp-1">{item.name}</p>
                      </div>
                      <div>
                        <p className="text-dark text-right">{(item.price * item.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
                      </div>
                    </div>
                  ))}

                  <div className="flex items-center justify-between gap-2 py-5 border-b border-gray-3">
                    <div>
                      <p className="text-dark line-clamp-1">Phí giao hàng</p>
                    </div>
                    <div>
                      <p className="text-dark text-right">0</p>
                    </div>
                  </div>

                  {/* <!-- total --> */}
                  <div className="flex items-center justify-between pt-5">
                    <div>
                      <p className="font-medium text-lg text-dark">Tổng</p>
                    </div>
                    <div>
                      <p className="font-medium text-lg text-dark text-right">
                        {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- payment box --> */}
              <PaymentMethod />

              {/* <!-- checkout button --> */}
              <button
                type="submit"
                className="w-full flex justify-center font-medium text-white bg-primary py-3 px-6 rounded-md ease-out duration-200 hover:bg-primary-dark mt-7.5"
              >
                Xác nhận thông tin
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutPage;
