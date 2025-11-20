import { NextResponse } from 'next/server';
import { prisma } from '@/utils/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = Number(session.user.id);

    const orders = await prisma.order.findMany({
      where: { userId },
      include: { items: true },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json({ data: orders }, { status: 200 });
  } catch (error) {
    console.error("Get Orders Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      items
    } = body;

    if (!items || !Array.isArray(items) || items.length === 0)
      return NextResponse.json({ message: "Items required" }, { status: 400 });

    // 1. Fetch product prices from DB to prevent client manipulation
    const productIds = items.map((i: any) => i.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } }
    });

    if (products.length !== items.length)
      return NextResponse.json({ message: "Invalid product(s)" }, { status: 400 });

    // 2. Build item list with DB prices
    const orderItemsData = items.map((item: any) => {
      const product = products.find((p) => p.id === item.productId)!;
      return {
        productId: product.id,
        quantity: item.quantity,
        unitPrice: product.price
      };
    });

    // 3. Calculate total
    const total = orderItemsData.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    );

    // 4. Create order
    const order = await prisma.order.create({
      data: {
        userId: Number(session.user.id),
        total,
        items: {
          create: orderItemsData
        }
      },
      include: { items: true }
    });

    return NextResponse.json({ data: order, status: 201 });

  } catch (error) {
    console.error("Create Order Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
