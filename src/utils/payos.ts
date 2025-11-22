import PayOS from "@payos/node";
import { NextRequest } from "next/server";
import { prisma } from "./prisma";

export const PAYOS = new PayOS(
    process.env.PAYOS_CLIENT_ID!,
    process.env.PAYOS_API_KEY!,
    process.env.PAYOS_CHECKSUM_KEY!
);

export async function createPaymentLink(request: NextRequest, orderId: number, amount: number, description: string) {
    const url = `${request.headers.get('x-forwarded-proto') || 'http'}://${request.headers.get('x-forwarded-host') || request.headers.get('host')}`;
    await PAYOS.confirmWebhook(`${url}/api/webhooks/payos`)

    const orderCode = orderId * 100000 + Math.floor(Math.random() * 99999);

    await prisma.order.update({
        where: { id: orderId },
        data: { orderCode: orderCode },
    });

    return PAYOS.createPaymentLink({
        orderCode: orderCode,
        amount: amount,
        description: description,
        returnUrl: `${url}/account/payment/result?orderId=${orderId}`,
        cancelUrl: `${url}/account/payment/result?orderId=${orderId}`,
    });
}