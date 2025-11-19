import { authOptions } from "@/utils/auth";
import { ROLE } from "@/utils/constant";
import { prisma } from "@/utils/prisma";
import { compare, hash } from "bcryptjs";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || session.user.role != ROLE.USER) {
      return NextResponse.json({ data: false }, { status: 403 });
    }

    const body = await request.json();

    const {
      oldPassword,
      newPassword
    } = body;

    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id, email: session.user.email! },
    });

    const isValid = await compare(oldPassword, currentUser.password)

    if (!isValid) {
      return NextResponse.json({ message: "Mật khẩu cũ không đúng, vui lòng thử lại!" }, { status: 400 });
    }

    const hashedPassword = await hash(newPassword, 10)

    const res = await prisma.user.update({
      where: { id: session.user.id, email: session.user.email! },
      data: {
        password: hashedPassword,
      },
    });

    return NextResponse.json({ data: true }, { status: 200 });
  } catch (error) {
    console.error("Change password error: " + error);
    return NextResponse.json({ message: "Đổi mật khẩu thất bại, vui lòng thử lại sau!" }, { status: 500 });
  }
}