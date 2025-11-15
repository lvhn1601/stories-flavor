import { useState } from "react";
import SingleItem from "./SingleItem";
import { getGroupByProvince, getProvinceName } from "@/utils/provinces";

const CartGrouped = ({ cartItems, removeItemFromCart }) => {
  // nhóm theo province
  const groupedByProvince = getGroupByProvince(cartItems);

  // lưu trạng thái mở/đóng cho từng province
  const [open, setOpen] = useState({});

  const toggle = (province) => {
    setOpen((prev) => ({ ...prev, [province]: !prev[province] }));
  };

  return (
    <div className="overflow-y-auto no-scrollbar">
      <div className="flex flex-col gap-6">
        {Object.keys(groupedByProvince).map((province) => (
          <div key={province} className="py-3">

            {/* HEADER TỈNH THÀNH */}
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggle(province)}
            >
              <span className="font-semibold text-lg">{!open[province] ? "▴" : "▾"} {getProvinceName(province)}</span>
            </div>

            {/* DANH SÁCH ITEM */}
            {!open[province] && (
              <div className="mt-3 flex flex-col gap-4">
                {groupedByProvince[province].map((item, idx) => (
                  <SingleItem
                    key={idx}
                    item={item}
                    removeItemFromCart={removeItemFromCart}
                  />
                ))}
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
};

export default CartGrouped;
