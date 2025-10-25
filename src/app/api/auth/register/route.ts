import { ROLE } from "@/utils/constant";
import { prisma } from "@/utils/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();

    const existingEmail = await prisma.user.findUnique({
        where: { email: body.email },
    });

    if (existingEmail) {
        return NextResponse.json({ message: "Email đã được sử dụng, vui lòng thử lại với email khác!" }, { status: 400 });
    }

    const existingPhone = await prisma.user.findUnique({
        where: { phone: body.phone },
    });

    if (existingPhone) {
        return NextResponse.json({ message: "Số điện thoại đã được sử dụng, vui lòng thử lại với số điện thoại khác!" }, { status: 400 });
    }

    const hashedPassword = await hash(body.password, 10)

    const res = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            phone: body.phone,
            password: hashedPassword,
            role: ROLE.USER,
            isActivated: true,
        },
    });

    if (!res) {
        return NextResponse.json({ message: "Đăng ký thất bại, vui lòng thử lại sau!" }, { status: 500 });
    }

    return NextResponse.json({ data: true }, { status: 200 });
}