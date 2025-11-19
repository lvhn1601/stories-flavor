import { authOptions } from "@/utils/auth";
import { prisma } from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ data: false }, { status: 403 });
    }

    const body = await request.json();
    const {
      name,
      phone,
      image
    } = body;

    if (phone !== session.user.phone) {
      const existingPhone = await prisma.user.findUnique({
        where: { phone: phone.trim() },
      });

      if (existingPhone) {
        return NextResponse.json({ message: "Số điện thoại đã được sử dụng, vui lòng thử lại với số điện thoại khác!" }, { status: 400 });
      }
    }

    const res = await prisma.user.update({
      where: { id: session.user.id, email: session.user.email! },
      data: {
        name: name.trim(),
        phone: phone.trim(),
        image: image,
        isActivated: true,
      },
    });

    return NextResponse.json({ data: res }, { status: 200 });
  } catch (error) {
    console.error("Update profile error: " + error);
    return NextResponse.json({ message: "Cập nhật tài khoản thất bại, vui lòng thử lại sau!" }, { status: 500 });
  }
}