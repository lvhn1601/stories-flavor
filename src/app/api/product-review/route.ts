import { authOptions } from "@/utils/auth";
import { MESSAGE } from "@/utils/constant";
import { prisma } from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const pid = searchParams.get('pid');

    const reviews = await prisma.review.findMany({
      where: {
        productId: Number(pid)
      },
      include: {
        user: {
          select: { id: true, name: true, image: true }
        }
      }
    })

    if (!reviews) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: reviews.map((r) => ({
        id: r.id,
        comment: r.comment,
        user: {
          id: r.user.id,
          name: r.user.name,
          image: r.user.image
        }
      }))
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ message: MESSAGE.UNAUTHORIZED }, { status: 401 });
    }

    const body = await req.json();
    const { productId, comment } = body;

    if (!productId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create review
    const review = await prisma.review.create({
      data: {
      comment,
      productId: parseInt(productId),
      userId: session.user?.id,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}