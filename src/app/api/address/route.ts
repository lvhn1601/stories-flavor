import { authOptions } from '@/utils/auth';
import { prisma } from '@/utils/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const addresses = await prisma.userAddress.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        id: 'desc',
      }
    });

    return NextResponse.json({ data: addresses, status: 200 });
  } catch (error) {
    console.error("Create Address Error:", error);
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
      name,
      phone,
      province,
      address,
    } = body;

    if (!name || !phone || !province || !address)
      return NextResponse.json({ message: "Missing field" }, { status: 400 });
    
    const newAddress = await prisma.userAddress.create({
      data: {
        name: name,
        phone: phone,
        province: province,
        address: address,
        userId: session.user.id,
      }
    });

    return NextResponse.json({ data: newAddress, status: 201 });

  } catch (error) {
    console.error("Create Address Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, name, phone, province, address } = body;

    if (!id) {
      return NextResponse.json({ message: "Missing id" }, { status: 400 });
    }

    const existing = await prisma.userAddress.findUnique({
      where: { id },
    });

    if (!existing || existing.userId !== session.user.id) {
      return NextResponse.json({ message: "Address not found" }, { status: 404 });
    }

    const updated = await prisma.userAddress.update({
      where: { id },
      data: {
        name: name,
        phone: phone,
        province: province,
        address: address,
      },
    });

    return NextResponse.json({ data: updated, status: 200 });
  } catch (error) {
    console.error("Update Address Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}