"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function PaymentResultPage() {
  const params = useSearchParams();

  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const status = params.get("status") || "UNKNOWN";
    const orderId = params.get("orderId") || "N/A";
    const orderCode = params.get("orderCode");

    let message = "";
    let type: "success" | "error" | "pending" | "unknown" = "unknown";

    if (status === "PAID") {
      message = "Thanh toán thành công 🎉";
      type = "success";
    } else if (status === "CANCELLED") {
      message = "Thanh toán đã bị huỷ ❌";
      type = "error";
    } else if (status === "PENDING") {
      message = "Đơn hàng đang chờ thanh toán ⏳";
      type = "pending";
    } else {
      message = "Không xác định!";
      type = "unknown";
    }

    setResult({
      status,
      orderId,
      message,
      type,
      orderCode,
    });
  }, [params]);

  if (!result) {
    return (
      <div className="py-20 text-center text-dark text-xl">
        Đang kiểm tra kết quả thanh toán...
      </div>
    );
  }

  return (
    <section className="overflow-hidden py-10">
      <h1 className="font-bold text-2xl xl:text-heading-4 text-dark text-center mb-10">
        Kết quả thanh toán
      </h1>

      <div className="max-w-[600px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="bg-white shadow-lg rounded-[10px] p-6 sm:p-8.5">

          {/* icon status */}
          <div className="flex justify-center mb-6">
            {result.type === "success" && (
              <div className="text-green-light text-6xl">✔</div>
            )}
            {result.type === "error" && (
              <div className="text-red-light text-6xl">✖</div>
            )}
            {result.type === "pending" && (
              <div className="text-yellow-light text-6xl">⏳</div>
            )}
            {result.type === "unknown" && (
              <div className="text-gray-6 text-6xl">?</div>
            )}
          </div>

          {/* message */}
          <h2 className="text-center font-semibold text-xl text-dark mb-3">
            {result.message}
          </h2>

          {/* detail box */}
          <div className="border border-gray-3 rounded-md p-4 bg-gray-1 mb-6">
            <div className="flex justify-between py-2 border-b border-gray-3">
              <p className="text-dark">Mã đơn hàng</p>
              <p className="font-medium text-dark">#{result.orderId.padStart(6, "0")}</p>
            </div>

            <div className="flex justify-between py-2">
              <p className="text-dark">Trạng thái</p>
              <p className="font-medium text-dark">{result.status}</p>
            </div>

            <div className="flex justify-between py-2 border-t border-gray-3">
                <p className="text-dark">Mã thanh toán</p>
                <p className="font-medium text-dark">{result.orderCode}</p>
              </div>
          </div>

          {/* buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="w-full text-center font-medium text-white bg-primary py-3 px-6 rounded-md ease-out duration-200 hover:bg-primary-dark"
            >
              Về trang chủ
            </Link>

            {/* Nếu thanh toán lỗi → cho phép thanh toán lại */}
            {result.type === "error" || result.type === "pending" ? (
              <Link
                href={`/account/payment/${result.orderId}`}
                className="w-full text-center font-medium text-primary border border-primary py-3 px-6 rounded-md ease-out duration-200 hover:bg-primary hover:text-white"
              >
                Thanh toán lại
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
