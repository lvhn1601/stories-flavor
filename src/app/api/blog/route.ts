import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
      const blogs = await prisma.blog.findMany({
      include: {
        author: {
          select: {
            name: true, image: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      data: blogs.map((b) => ({
        id: b.id,
        title: b.title,
        content: b.content,
        image: b.image,
        createdAt: b.createdAt,
        author: {
          name: b.author.name,
          image: b.author.image
        }
      }))
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}