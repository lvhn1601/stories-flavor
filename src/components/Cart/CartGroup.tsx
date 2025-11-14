import { useState } from "react";
import SingleItem from "./SingleItem";
import { getProvinceName } from "@/utils/provinces";

const CartGroup = ({ cartItems }) => {
  // nhóm theo province
  const groupedByProvince = cartItems.reduce((groups, item) => {
    const province = item.province || "Khác";
    if (!groups[province]) groups[province] = [];
    groups[province].push(item);
    return groups;
  }, {});

  // lưu trạng thái mở/đóng cho từng province
  const [open, setOpen] = useState({});

  const toggle = (province) => {
    setOpen((prev) => ({ ...prev, [province]: !prev[province] }));
  };

  return Object.keys(groupedByProvince).map((province) => (
    <div key={province}>
      <div className="bg-white rounded-[10px] shadow-lg">
        <div className="w-full overflow-x-auto">
          <div className="min-w-[1170px] flex flex-col">
            <div
              className="flex justify-between items-center cursor-pointer px-5 py-5.5"
              onClick={() => toggle(province)}
            >
              <span className="font-semibold text-xl">{getProvinceName(province)}</span>
            </div>

            {/* DANH SÁCH ITEM */}
            {!open[province] && (
              <div className="flex flex-col gap-4">
                {groupedByProvince[province].map((item, idx) => (
                  <SingleItem item={item} key={idx} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div >
    </div>
  ))
};

export default CartGroup;
