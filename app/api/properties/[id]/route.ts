import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await props.params;
    const property = await prisma.property.findUnique({ where: { id } });
    
    if (!property) return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
    return NextResponse.json(property);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar" }, { status: 500 });
  }
}

export async function PATCH(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await props.params;
    const body = await request.json();

    // Remove campos protegidos para evitar erros no Prisma
    const { id: _, createdAt, updatedAt, ...updateData } = body;
    const dataToUpdate: any = { ...updateData };

    // Lógica de Preço: Mantém o formato de milhão inteiro
    if (updateData.price !== undefined) {
      dataToUpdate.price = updateData.price.toString().replace(/\D/g, "");
    }

    // Conversão Numérica Defensiva
    if (updateData.bedrooms !== undefined) dataToUpdate.bedrooms = Number(updateData.bedrooms);
    if (updateData.bathrooms !== undefined) dataToUpdate.bathrooms = Number(updateData.bathrooms);
    
    // ATUALIZADO: Tratando Recursos Hídricos no lugar de Vagas
    if (updateData.waterSources !== undefined) {
      dataToUpdate.waterSources = Number(updateData.waterSources);
    }
    
    if (updateData.area !== undefined) dataToUpdate.area = Number(updateData.area);

    const updated = await prisma.property.update({
      where: { id },
      data: dataToUpdate
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Erro no PATCH:", error);
    return NextResponse.json({ error: "Erro ao atualizar imóvel" }, { status: 500 });
  }
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await props.params;
    await prisma.property.delete({ where: { id } });
    return NextResponse.json({ message: "Excluído com sucesso" });
  } catch (error) {
    console.error("Erro no DELETE:", error);
    return NextResponse.json({ error: "Erro ao excluir" }, { status: 500 });
  }
}