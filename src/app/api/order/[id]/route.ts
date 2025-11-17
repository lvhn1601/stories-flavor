import { authOptions } from "@/utils/auth";
import { prisma } from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: any) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const id = await params.id;

    const orderId = Number(id);

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    if (!order)
      return NextResponse.json({ message: "Order not found" }, { status: 404 });

    // Optional: Only allow owner to access
    if (order.userId !== Number(session.user.id)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({ data: order, status: 200 });
  } catch (error) {
    console.error("Get Order Detail Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: any) {
  try {
    const id = await params.id;

    const orderId = Number(id);
    const body = await req.json();

    // Các field được phép update:
    const {
      customerName,
      customerPhone,
      customerProvince,
      customerAddress,
      note
    } = body;

    const updated = await prisma.order.update({
      where: { id: orderId },
      data: {
        customerName,
        customerPhone,
        customerProvince,
        customerAddress,
        note,
        status: "PROCESSING"
      }
    });

    return NextResponse.json({ data: updated, status: 200 });
  } catch (error) {
    console.error("PUT /orders/[id] error:", error);
    return new NextResponse("Failed to update order", { status: 500 });
  }
}