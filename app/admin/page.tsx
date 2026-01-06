"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Plus, Trash2, Edit, Home, ExternalLink, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"

export default function AdminDashboard() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  // Busca os imóveis do banco
  const fetchProperties = async () => {
    try {
      const res = await fetch("/api/properties")
      const data = await res.json()
      setProperties(data)
    } catch (error) {
      console.error("Erro ao carregar:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  // Função para deletar
  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este imóvel?")) return

    try {
      const res = await fetch(`/api/properties/${id}`, { method: "DELETE" })
      if (res.ok) {
        toast({ title: "Sucesso", description: "Imóvel removido." })
        fetchProperties() // Recarrega a lista
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Erro ao excluir" })
    }
  }

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#1E5933]">Painel Santa Fé</h1>
          <p className="text-muted-foreground">Gerencie seus imóveis cadastrados</p>
        </div>
        <Link href="/admin/imoveis/novo">
          <Button className="bg-[#1E5933] hover:bg-[#1E5933]/90">
            <Plus className="w-4 h-4 mr-2" /> Novo Imóvel
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imóvel</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.map((property: any) => (
              <TableRow key={property.id}>
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    {property.title}
                    <span className="text-xs text-muted-foreground">{property.location}</span>
                  </div>
                </TableCell>
                <TableCell>{property.category}</TableCell>
                <TableCell>{property.tipo}</TableCell>
                <TableCell>R$ {property.price}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Link href={`/imoveis/${property.id}`} target="_blank">
                    <Button variant="outline" size="icon"><ExternalLink className="w-4 h-4 text-blue-600" /></Button>
                  </Link>
                  <Button variant="outline" size="icon" onClick={() => handleDelete(property.id)}>
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {properties.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                  Nenhum imóvel cadastrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}