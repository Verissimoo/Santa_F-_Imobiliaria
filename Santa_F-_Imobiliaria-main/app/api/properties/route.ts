import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const newProperty = await prisma.property.create({
      data: {
        title: body.title,
        description: body.description,
        price: body.price,
        location: body.location,
        category: body.category, // Alinhado com o novo Schema
        tipo: body.tipo,
        bedrooms: Number(body.bedrooms),
        bathrooms: Number(body.bathrooms),
        parking: Number(body.parking),
        area: Number(body.area),
        images: body.images || [],
        isFeatured: body.isFeatured || false,
      },
    })

    return NextResponse.json(newProperty, { status: 201 })
  } catch (error) {
    console.error("Erro na API:", error)
    return NextResponse.json({ error: "Erro ao salvar o imóvel" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const properties = await prisma.property.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(properties)
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar imóveis" }, { status: 500 })
  }
}