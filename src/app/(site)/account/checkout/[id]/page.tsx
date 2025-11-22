"use client";
import Billing from "@/components/Checkout/Billing";
import { useAPI } from "@/hooks/useAPI";
import { getOrderItemsList } from "@/utils/order";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const CheckoutPage = () => {
  const { id } = useParams();

  const { API } = useAPI();
  const { data: session, status } = useSession();

  const [addressData, setAddressData] = useState({
    name: "",
    province: "",
    address: "",
    phone: "",
    note: "",
  });
  const [addresses, setAddresses] = useState([]);

  const [selectedAddress, setSelectedAddress] = useState<any>(null);

  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const canSubmit = selectedAddress !== null || (addressData.name && addressData.province && addressData.address && addressData.phone && orderItems.length > 0);
  
  console.log(canSubmit);

  useEffect(() => {
    if (!id) return;

    fetchOrderDetail();
    fetchAddresses();
  }, [id]);

  useEffect(() => {
    if (status === "loading")
      return;

    if (!addressData.name && !addressData.phone) {
      setAddressData({
        ...addressData,
        name: session.user?.name || "",
        phone: session.user?.phone || ""
      })
    }
  }, [session, status]);

  const fetchOrderDetail = async () => {
    const res = await API.get(`/order/${id}`, false, true);
    if (res.success) {
      const { data } = res;

      setTotalPrice(data.total);

      const items = data.items.map((item) => {
        const { product } = item;
        return {
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          province: product.province,
          quantity: item.quantity,
        }
      });

      setOrderItems(getOrderItemsList(items));
    }
  }

  const fetchAddresses = async () => {
    const res = await API.get('/address', false, true);

    if (res.success) {
      setAddresses(res.data);
    }
  }

  const handleSubmit = async () => {
    if (!canSubmit) return;

    const res = await API.put(`/order/${id}`, selectedAddress === null ? ({
      name: addressData.name,
      phone: addressData.phone,
      province: addressData.province,
      address: addressData.address,
      note: addressData.note
    }) : ({
      addressId: selectedAddress,
      note: addressData.note
    }), true, true);

    if (res.success) {
      console.log("Order updated:", res.data);
    }
  }

  return (
    <section className="overflow-hidden py-10">
      <h1 className="font-bold text-2xl xl:text-heading-4 text-dark text-center mb-10">
        Thông tin thanh toán
      </h1>
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div>
          <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-11">
            {/* <!-- checkout left --> */}
            <div className="lg:max-w-[670px] w-full">

              {/* <!-- billing details --> */}
              <Billing data={addressData} setData={setAddressData} addresses={addresses} onSelect={(id) => {setSelectedAddress(id)}} />

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
                    value={addressData.note}
                    onChange={(e) => setAddressData({ ...addressData, note: e.target.value })}
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
                  {orderItems.map((item, key) => (
                    <div key={key} className="flex items-center justify-between gap-2 py-5 border-b border-gray-3">
                      <div>
                        <p className="text-dark line-clamp-1">{item.name}</p>
                      </div>
                      <div>
                        <p className="text-dark text-right">{item.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
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

              {/* <!-- checkout button --> */}
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="w-full flex justify-center font-medium text-white bg-primary py-3 px-6 rounded-md ease-out duration-200 hover:bg-primary-dark mt-7.5 disabled:cursor-not-allowed"
              >
                Xác nhận thông tin
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
