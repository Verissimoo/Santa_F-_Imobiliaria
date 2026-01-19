"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Plus, Trash2, Pencil, ExternalLink, Loader2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"

export default function AdminDashboard() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const fetchProperties = async () => {
    try {
      const res = await fetch("/api/properties")
      const data = await res.json()
      setProperties(data)
    } catch (error) {
      console.error("Erro:", error)
    } finally {
      setLoading(false)
    }
  }

  // NOVA FUNÇÃO: Alterna o destaque (Estrela)
  const toggleFeatured = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/properties/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured: !currentStatus }),
      })

      if (res.ok) {
        toast({ title: "Status atualizado", description: "Destaque alterado com sucesso." })
        fetchProperties()
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Erro ao atualizar destaque" })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir este imóvel?")) return
    try {
      const res = await fetch(`/api/properties/${id}`, { method: "DELETE" })
      if (res.ok) {
        toast({ title: "Removido", description: "Imóvel excluído." })
        fetchProperties()
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Erro ao excluir" })
    }
  }

  useEffect(() => { fetchProperties() }, [])

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-[#1E5933]" /></div>

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#1E5933]">Painel Santa Fé</h1>
          <p className="text-muted-foreground">Gerencie seus imóveis</p>
        </div>
        <Link href="/admin/imoveis/novo">
          <Button className="bg-[#1E5933] hover:bg-[#1E5933]/90"><Plus className="mr-2 h-4" /> Novo</Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">★</TableHead>
              <TableHead>Imóvel</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.map((property: any) => (
              <TableRow key={property.id}>
                <TableCell>
                  <button 
                    onClick={() => toggleFeatured(property.id, property.isFeatured)}
                    className="focus:outline-none transition-transform active:scale-125"
                  >
                    <Star 
                      className={`w-5 h-5 ${property.isFeatured ? "fill-[#B5893E] text-[#B5893E]" : "text-gray-300 hover:text-gray-400"}`} 
                    />
                  </button>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-bold">{property.title}</span>
                    <span className="text-xs text-gray-400">{property.location}</span>
                  </div>
                </TableCell>
                <TableCell>R$ {property.price}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Link href={`/imoveis/${property.id}`} target="_blank">
                    <Button variant="outline" size="icon"><ExternalLink className="w-4 h-4 text-blue-600" /></Button>
                  </Link>
                  <Link href={`/admin/imoveis/editar/${property.id}`}>
                    <Button variant="outline" size="icon"><Pencil className="w-4 h-4 text-amber-600" /></Button>
                  </Link>
                  <Button variant="outline" size="icon" onClick={() => handleDelete(property.id)}><Trash2 className="w-4 h-4 text-red-600" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}