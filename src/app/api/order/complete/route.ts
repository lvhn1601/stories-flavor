import { authOptions } from "@/utils/auth";
import { MESSAGE } from "@/utils/constant";
import { prisma } from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: MESSAGE.UNAUTHORIZED }, { status: 401 });
    }
    const body = await req.json();

    const { id } = body;

    const updated = await prisma.order.update({
      where: { id: Number(id) },
      data: {
        status: "COMPLETED"
      }
    });

    return NextResponse.json({ data: updated, status: 200 });
  } catch (error) {
    console.error("POST /order/complete error:", error);
    return NextResponse.json({ message: MESSAGE.SERVER_ERROR }, { status: 500 });
  }
}