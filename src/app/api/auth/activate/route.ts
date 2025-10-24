import { authOptions } from "@/utils/auth";
import { ROLE } from "@/utils/constant";
import { prisma } from "@/utils/prisma";
import { hash } from "bcryptjs";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || session.user.role != ROLE.USER) {
        return NextResponse.json({ data: false }, { status: 403 });
    }

    const body = await request.json();

    const hashedPassword = await hash(body.password, 10)

    await prisma.user.update({
        where: { id: session.user.id, email: session.user.email! },
        data: {
            name: body.name,
            phone: body.phone,
            password: hashedPassword,
            isActivated: true,
        },
    });

    return NextResponse.json({ data: true }, { status: 200 });
}