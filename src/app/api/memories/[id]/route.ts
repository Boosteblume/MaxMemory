import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const memory = await prisma.memory.findUnique({
      where: {
        id: parseInt(params.id)
      }
    })

    if (!memory) {
      return NextResponse.json(
        { error: 'Memory not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(memory)
  } catch (error) {
    console.error('Failed to fetch memory:', error)
    return NextResponse.json(
      { error: 'Failed to fetch memory' },
      { status: 500 }
    )
  }
}

export async function UPDATE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    const memory = await prisma.memory.update({
      where: {
        id: parseInt(params.id)
      },
      data: {
        title: data.title,
        description: data.description,
        imagePath: data.imagePath,
        latitude: data.latitude,
        longitude: data.longitude,
        locationName: data.locationName,
      }
    })

    return NextResponse.json(memory)
  } catch (error) {
    console.error('Failed to update memory:', error)
    return NextResponse.json(
      { error: 'Failed to update memory' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.memory.delete({
      where: {
        id: parseInt(params.id)
      }
    })

    return NextResponse.json(
      { message: 'Memory deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Failed to delete memory:', error)
    return NextResponse.json(
      { error: 'Failed to delete memory' },
      { status: 500 }
    )
  }
}
