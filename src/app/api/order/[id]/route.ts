import { authOptions } from "@/utils/auth";
import { MESSAGE, ROLE } from "@/utils/constant";
import { prisma } from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: any) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: MESSAGE.UNAUTHORIZED }, { status: 401 });
    }

    const { id } = await params;

    const orderId = Number(id);

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: true
          }
        },
        address: true
      }
    });

    if (!order)
      return NextResponse.json({ message: "Order not found" }, { status: 404 });

    // Optional: Only allow owner to access
    if (session.user.role !== ROLE.ADMIN && order.userId !== Number(session.user.id)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({ data: order, status: 200 });
  } catch (error) {
    console.error("Get Order Detail Error:", error);
    return NextResponse.json({ message: MESSAGE.SERVER_ERROR }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: any) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: MESSAGE.UNAUTHORIZED }, { status: 401 });
    }

    const { id } = await params;

    const orderId = Number(id);
    const body = await req.json();

    // Các field được phép update:
    const {
      addressId,
      name,
      phone,
      province,
      address,
      note
    } = body;

    let selectedAddress = addressId;

    if (!addressId) {
      const newAddress = await prisma.userAddress.create({
        data: {
          name: name,
          phone: phone,
          province: province,
          address: address,
          userId: session.user.id,
        }
      });

      selectedAddress = newAddress.id;
    }

    const updated = await prisma.order.update({
      where: { id: orderId },
      data: {
        addressId: selectedAddress,
        note,
        status: "AUTHORIZED"
      }
    });

    return NextResponse.json({ data: updated, status: 200 });
  } catch (error) {
    console.error("PUT /orders/[id] error:", error);
    return NextResponse.json({ message: MESSAGE.SERVER_ERROR }, { status: 500 });
  }
}