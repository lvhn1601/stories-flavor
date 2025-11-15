import { useState } from "react";
import SingleItem from "./SingleItem";
import { getGroupByProvince, getProvinceName } from "@/utils/provinces";

const CartGroup = ({ cartItems }) => {
  // nhóm theo province
  const groupedByProvince = getGroupByProvince(cartItems);

  // lưu trạng thái mở/đóng cho từng province
  const [open, setOpen] = useState({});

  const toggle = (province) => {
    setOpen((prev) => ({ ...prev, [province]: !prev[province] }));
  };

  return Object.keys(groupedByProvince).map((province) => {
    const totalPrice = groupedByProvince[province].reduce((acc, item) => acc + item.price * item.quantity, 0);
    const count = groupedByProvince[province].map((item) => item.quantity).reduce((a, b) => a + b, 0);

    return (
      <div key={province}>
        <div className="w-full overflow-x-auto">
          <div className="min-w-[1170px] flex flex-col">
            <div className="flex items-center border-t gap-2 border-gray-3 cursor-pointer py-5 px-7.5" onClick={() => toggle(province)}>
              <div className="min-w-[400px]">
                <div className="flex items-center justify-between gap-5">
                  <div className="w-full">
                    <h3 className="text-dark ease-out duration-200">
                      {open[province] ? "▴" : "▾"} Hộp quà mix {getProvinceName(province)} {open[province] || `(${count} sản phẩm)`}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="min-w-[180px]"></div>

              <div className="min-w-[275px]"></div>

              <div className="min-w-[250px]">
                <p className="text-dark">{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ</p>
              </div>
            </div>

            {/* DANH SÁCH ITEM */}
            {open[province] && (
              <div className="flex flex-col gap-4">
                {groupedByProvince[province].map((item, idx) => (
                  <SingleItem item={item} key={idx} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  })
};

export default CartGroup;
