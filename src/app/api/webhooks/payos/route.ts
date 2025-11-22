import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
import { PAYOS } from "@/utils/payos";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const data = PAYOS.verifyPaymentWebhookData(body);

    if (data.desc === "success") {
      const order = await prisma.order.findFirst({
        where: { orderCode: Number(data.orderCode) },
      });

      await prisma.order.update({
        where: { id: order.id },
        data: { status: "PROCESSING" },
      });

      console.log("Đơn hàng", order.id, "đã thanh toán thành công!");
    }

    return NextResponse.json({ message: "Webhook received" });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
