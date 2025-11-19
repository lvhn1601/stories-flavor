import React, { useState } from "react";
import OrderModal from "./OrderModal";
import { formatDateUTC } from "@/utils/constant";
import { getOrderStatusNextStep, getOrderStatusStyle, getOrderStatusTitle } from "@/utils/order";
import { useRouter } from "next/navigation";

const SingleOrder = ({ orderItem, smallView }: any) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const router = useRouter();

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const toggleEdit = () => {
    setShowEdit(!showEdit);
  };

  const toggleModal = (status: boolean) => {
    setShowDetails(status);
    setShowEdit(status);
  };

  const handleNextStep = (e) => {
    e.stopPropagation();
    if (orderItem.status === "PENDING") {
      router.push(`/account/checkout/${orderItem.id}`);
    }
  }

  return (
    <>
      {!smallView && (
        <div
          onClick={e => {
            e.preventDefault();
            toggleDetails();
          }}
          className="items-center justify-between border-t border-gray-3 py-5 px-7.5 hidden md:flex hover:bg-gray-2 cursor-pointer"
        >
          <div className="min-w-[111px]">
            <p className="text-custom-sm text-red">
              #{orderItem.id.toString().padStart(6, "0")}
            </p>
          </div>
          <div className="min-w-[175px]">
            <p className="text-custom-sm text-dark">{formatDateUTC(orderItem.createdAt)}</p>
          </div>

          <div className="min-w-[128px]">
            <p
              className={`inline-block text-custom-sm  py-0.5 px-2.5 rounded-[30px] capitalize ${getOrderStatusStyle(orderItem.status)}`}
            >
              {getOrderStatusTitle(orderItem.status)}
            </p>
          </div>

          <div className="min-w-[113px]">
            <p className="text-custom-sm text-dark">{orderItem.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ</p>
          </div>

          <div className="flex gap-5 items-center min-w-[113px]">
            {getOrderStatusNextStep(orderItem.status) && (
              <button
                onClick={handleNextStep}
                className="bg-primary text-white px-2 py-1 rounded-full hover:bg-primary-dark"
              >
                {getOrderStatusNextStep(orderItem.status)}
              </button>
            )}
          </div>
        </div>
      )}

      {smallView && (
        <div
          className="block md:hidden rounded-xl shadow-lg cursor-pointer hover:bg-gray-2"
          onClick={e => {
            e.preventDefault();
            toggleDetails();
          }}
        >
          <div className="py-4.5 px-7.5">
            <div className="">
              <p className="text-custom-sm text-dark">
                <span className="font-bold pr-2"> Mã đơn:</span> #
                {orderItem.id.toString().padStart(6, "0")}
              </p>
            </div>
            <div className="">
              <p className="text-custom-sm text-dark">
                <span className="font-bold pr-2">Ngày tạo:</span>{" "}
                {formatDateUTC(orderItem.createdAt)}
              </p>
            </div>

            <div className="">
              <p className="text-custom-sm text-dark">
                <span className="font-bold pr-2">Trạng thái:</span>{" "}
                <span className={`inline-block text-custom-sm  py-0.5 px-2.5 rounded-[30px] capitalize ${getOrderStatusStyle(orderItem.status)}`}>
                  {getOrderStatusTitle(orderItem.status)}
                </span>
              </p>
            </div>

            <div className="">
              <p className="text-custom-sm text-dark">
                <span className="font-bold pr-2">Giá:</span> $
                {orderItem.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ
              </p>
            </div>
          </div>
        </div>
      )}

      <OrderModal
        showDetails={showDetails}
        showEdit={showEdit}
        toggleModal={toggleModal}
        order={orderItem}
      />
    </>
  );
};

export default SingleOrder;
