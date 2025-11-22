import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
import { createPaymentLink, PAYOS } from "@/utils/payos";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const orderId = Number(body.id);
    const order = await prisma.order.findUnique({ where: { id: orderId } });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const payment = await createPaymentLink(req, order.id, order.total, `Thanh toán ${order.id.toString().padStart(6, "0")}`);

    return NextResponse.json({ checkoutUrl: payment.checkoutUrl });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
