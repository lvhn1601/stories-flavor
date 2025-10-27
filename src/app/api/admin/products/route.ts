import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(
      { data: products },
      { status: 200 }
    );
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
    const body = await req.json();
    const { name, category, description, price, images, status = true } = body;

    if (!name || !category || !price || !Array.isArray(images)) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const validCategories = ["OPTIONAL", "SUGGEST", "HIGHEND"];
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { message: "Invalid category" },
        { status: 400 }
      );
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        category,
        description,
        price,
        status,
        images,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: any) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, name, category, description, price, images, status } = body;

    if (!id) {
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 }
      );
    }

    const validCategories = ["OPTIONAL", "SUGGEST", "HIGHEND"];
    if (category && !validCategories.includes(category)) {
      return NextResponse.json(
        { message: "Invalid category" },
        { status: 400 }
      );
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        category,
        description,
        price,
        images,
        status,
      },
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error: any) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
