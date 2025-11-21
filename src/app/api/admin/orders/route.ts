import { authOptions } from "@/utils/auth";
import { MESSAGE, ROLE } from "@/utils/constant";
import { prisma } from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session?.user?.role !== ROLE.ADMIN) {
      return NextResponse.json({ message: MESSAGE.UNAUTHORIZED }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      include: { items: true, user: true },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json({ data: orders }, { status: 200 });
  } catch (error) {
    console.error("Get Orders Error:", error);
    return NextResponse.json({ message: MESSAGE.SERVER_ERROR }, { status: 500 });
  }
}