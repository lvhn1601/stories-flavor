import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const products = await prisma.product.findMany({
      where: {
        isFeatured: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json({
      data: products.slice(0, 4)
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}