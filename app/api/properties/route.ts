import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// Método POST para salvar um novo imóvel
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // O Prisma criará o registro na tabela 'Property'
    const newProperty = await prisma.property.create({
      data: {
        title: body.title,
        description: body.description,
        price: body.price,
        location: body.location,
        finalidade: body.finalidade,
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