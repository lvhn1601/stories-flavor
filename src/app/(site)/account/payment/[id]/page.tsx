"use client";

import { useAPI } from "@/hooks/useAPI"
import { useParams } from "next/navigation";
import { useEffect } from "react";

const PaymentPage = () => {
  const { id } = useParams();

  const { API } = useAPI();

  useEffect(() => {
    if (id)
      fetchPaymentLink(id);
  }, [id]);

  const fetchPaymentLink = async (orderId) => {
    const res = await API.post("/order/payment", { id: orderId }, false, true);

    if (res.success) {
      window.location.href = res.checkoutUrl;
    }
  }

  return (
    <div>Thanh toán đơn hàng #{id.toString().padStart(6, "0")}</div>
  )
}

export default PaymentPage