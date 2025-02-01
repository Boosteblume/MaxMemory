import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const memory = await prisma.memory.create({
      data: {
        title: data.title,
        description: data.description,
        imagePath: data.imagePath,
        latitude: data.latitude,
        longitude: data.longitude,
        locationName: data.locationName,
      },
    });
    return NextResponse.json(memory, { status: 201 });
  } catch (error) {
    console.error("Failed to create memory:", error);
    return NextResponse.json(
      { error: "Failed to create memory" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log(params.id)
    await prisma.memory.delete({
      where: {
        id: parseInt(params.id),
      },
    });
    return NextResponse.json(
      { message: "Memory deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete memory:", error);
    return NextResponse.json(
      { error: "Failed to delete memory" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const memories = await prisma.memory.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(memories);
  } catch (error) {
    console.error("Failed to fetch memories:", error);
    return NextResponse.json(
      { error: "Failed to fetch memories" },
      { status: 500 }
    );
  }
}
