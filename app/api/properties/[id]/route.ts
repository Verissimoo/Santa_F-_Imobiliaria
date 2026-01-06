import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// DELETE: Apagar um imóvel
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    await prisma.property.delete({
      where: { id },
    })
    return NextResponse.json({ message: "Imóvel excluído com sucesso" })
  } catch (error) {
    console.error("Erro ao excluir:", error)
    return NextResponse.json({ error: "Erro ao excluir o imóvel" }, { status: 500 })
  }
}

// GET: Buscar um único imóvel (útil para a página de edição futura)
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const property = await prisma.property.findUnique({
      where: { id: params.id },
    })
    if (!property) return NextResponse.json({ error: "Não encontrado" }, { status: 404 })
    return NextResponse.json(property)
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar" }, { status: 500 })
  }
}