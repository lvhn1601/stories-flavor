import { authOptions } from "@/utils/auth";
import { MESSAGE } from "@/utils/constant";
import { prisma } from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ message: MESSAGE.UNAUTHORIZED }, { status: 401 });
    }

    const blogs = await prisma.blog.findMany({
      where: {
        authorId: session.user.id
      },
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

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ message: MESSAGE.UNAUTHORIZED }, { status: 401 });
    }

    const body = await req.json();
    const { title, content, image } = body;

    if (!title || !content || !image) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newBlog = await prisma.blog.create({
      data: {
        title,
        content,
        image,
        authorId: session.user.id
      },
    });

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error: any) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ message: MESSAGE.UNAUTHORIZED }, { status: 401 });
    }


    const body = await req.json();
    const { id, title, content, image } = body;

    if (!id) {
      return NextResponse.json(
        { message: "Blog ID is required" },
        { status: 400 }
      );
    }

    const updatingBlog = await prisma.blog.findUnique({
      where: { id }
    });

    if (updatingBlog.authorId != session.user.id) {
      return NextResponse.json({ message: MESSAGE.UNAUTHORIZED }, { status: 401 });
    }

    const updatedBlog = await prisma.blog.update({
      where: { id },
      data: {
        title,
        content,
        image,
      },
    });

    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (error: any) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}