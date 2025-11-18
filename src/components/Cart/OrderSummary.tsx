import { useAPI } from "@/hooks/useAPI";
import { selectTotalPrice } from "@/redux/features/cart-slice";
import { useAppSelector } from "@/redux/store";
import { getOrderItemsList } from "@/utils/order";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const OrderSummary = () => {
  const cartItems = useAppSelector((state) => state.cartReducer.items);
  const totalPrice = useSelector(selectTotalPrice);

  const orderItems = getOrderItemsList(cartItems);

  const router = useRouter();

  const { API } = useAPI();

  const handleSubmit = async () => {
    const res = await API.post('/order', {
      items: cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity
      }))
    }, true, true);

    if (res.success) {
      const id = res.data.id;
      router.push(`/account/checkout/${id}`);
    }
  }

  return (
    <div className="lg:max-w-[455px] w-full">
      {/* <!-- order list box --> */}
      <div className="bg-white shadow-lg rounded-[10px]">
        <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
          <h3 className="font-medium text-xl text-dark">Hoá đơn</h3>
        </div>

        <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
          {/* <!-- product item --> */}
          {orderItems.map((item, key) => (
            <div key={key} className="flex items-center gap-3 justify-between py-5 border-b border-gray-3">
              <div>
                <p className="text-dark">{item.name}</p>
              </div>
              <div>
                <p className="text-dark text-right line-clamp-1">
                  {item.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </p>
              </div>
            </div>
          ))}

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

          {/* <!-- checkout button --> */}
          <button
            onClick={handleSubmit}
            className="w-full flex justify-center font-medium text-white bg-primary py-3 px-6 rounded-md ease-out duration-200 hover:bg-primary-dark mt-7.5"
          >
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
