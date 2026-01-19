import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Limpeza do preço para garantir que salve apenas números (milhões)
    const cleanPrice = body.price.toString().replace(/\D/g, "")

    const newProperty = await prisma.property.create({
      data: {
        title: body.title,
        description: body.description,
        price: cleanPrice,
        location: body.location,
        category: body.category,
        tipo: body.tipo,
        bedrooms: Number(body.bedrooms) || 0,
        bathrooms: Number(body.bathrooms) || 0,
        // ATUALIZADO: Gravando Recursos Hídricos no lugar de Vagas
        waterSources: Number(body.waterSources) || 0,
        area: Number(body.area) || 0,
        images: body.images || [],
        isFeatured: body.isFeatured || false,
        consultantName: body.consultantName,
        consultantPhone: body.consultantPhone,
      },
    })

    return NextResponse.json(newProperty, { status: 201 })
  } catch (error) {
    console.error("Erro na API (POST):", error)
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