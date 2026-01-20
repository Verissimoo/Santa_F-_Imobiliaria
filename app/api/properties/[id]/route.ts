import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache" // Importação necessária para o cache

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

    const { id: _, createdAt, updatedAt, ...updateData } = body;
    const dataToUpdate: any = { ...updateData };

    if (updateData.price !== undefined) {
      dataToUpdate.price = updateData.price.toString().replace(/\D/g, "");
    }

    if (updateData.bedrooms !== undefined) dataToUpdate.bedrooms = Number(updateData.bedrooms);
    if (updateData.bathrooms !== undefined) dataToUpdate.bathrooms = Number(updateData.bathrooms);
    if (updateData.area !== undefined) dataToUpdate.area = Number(updateData.area);

    const updated = await prisma.property.update({
      where: { id },
      data: dataToUpdate
    });

    // LIMPA O CACHE DA HOME PARA O DESTAQUE APARECER IMEDIATAMENTE
    revalidatePath("/");
    revalidatePath("/imoveis");

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Erro no PATCH:", error);
    return NextResponse.json({ error: "Erro ao atualizar" }, { status: 500 });
  }
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await props.params;
    await prisma.property.delete({ where: { id } });
    
    revalidatePath("/");
    
    return NextResponse.json({ message: "Excluído com sucesso" });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao excluir" }, { status: 500 });
  }
}