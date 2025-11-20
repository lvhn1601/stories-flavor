import { useState } from "react";
import { getGroupByProvince, getProvinceName } from "@/utils/provinces";
import SingleProductItem from "./SingleProductItem";

const ProductGroup = ({ cartItems }) => {
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
          <div className="flex flex-col w-full">
            <div className="flex items-center border-t border-gray-3 cursor-pointer py-5 px-7.5" onClick={() => toggle(province)}>
              <div className="min-w-[75%]">
                <div className="flex items-center justify-between gap-5">
                  <div className="w-full">
                    <h3 className="text-dark ease-out duration-200">
                      {open[province] ? "▾" : "▸"} Hộp quà mix {getProvinceName(province)} {open[province] || `(${count} sản phẩm)`}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="min-w-[25%]">
                <p className="text-dark">{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ</p>
              </div>
            </div>

            {/* DANH SÁCH ITEM */}
            {open[province] && (
              <div className="flex flex-col gap-4">
                {groupedByProvince[province].map((item, idx) => (
                  <SingleProductItem item={item} key={idx} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  })
};

export default ProductGroup;
