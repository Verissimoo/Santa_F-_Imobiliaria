import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET: Busca um único imóvel
export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;
    const property = await prisma.property.findUnique({ where: { id } });
    
    if (!property) return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
    return NextResponse.json(property);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar" }, { status: 500 });
  }
}

// PATCH: Atualiza o imóvel
export async function PATCH(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;
    const body = await request.json();

    // IMPORTANTE: Removemos id e datas do body para o Prisma não dar erro
    const { id: _, createdAt, updatedAt, ...updateData } = body;

    const updated = await prisma.property.update({
      where: { id },
      data: {
        ...updateData,
        // Garantindo que valores numéricos sejam salvos corretamente
        bedrooms: Number(updateData.bedrooms),
        bathrooms: Number(updateData.bathrooms),
        parking: Number(updateData.parking),
        area: Number(updateData.area),
      }
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Erro no PATCH:", error);
    return NextResponse.json({ error: "Erro ao atualizar" }, { status: 500 });
  }
}

// DELETE: Exclui o imóvel
export async function DELETE(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;
    await prisma.property.delete({ where: { id } });
    return NextResponse.json({ message: "Excluído com sucesso" });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao excluir" }, { status: 500 });
  }
}