"use client"

import { useEffect, useState } from "react"
import { Pencil, Trash2, Plus, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { toast } from "sonner" // Usando sonner para feedback visual

export default function AdminDashboard() {
  const [properties, setProperties] = useState([])

  // Função para carregar os imóveis
  const fetchProperties = async () => {
    const res = await fetch("/api/properties")
    const data = await res.json()
    setProperties(data)
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  // FUNÇÃO PARA EXCLUIR
  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este imóvel?")) return

    try {
      const res = await fetch(`/api/properties/${id}`, { method: "DELETE" })
      if (res.ok) {
        toast.success("Imóvel excluído com sucesso!")
        fetchProperties() // Recarrega a lista
      } else {
        toast.error("Erro ao excluir imóvel")
      }
    } catch (error) {
      toast.error("Erro na conexão")
    }
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#1E5933]">Painel Administrativo</h1>
        <Button asChild className="bg-[#1E5933]">
          <Link href="/admin/imoveis/novo"><Plus className="mr-2 h-4 w-4" /> Novo Imóvel</Link>
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4">Imóvel</th>
              <th className="p-4">Cidade</th>
              <th className="p-4">Preço</th>
              <th className="p-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((prop: any) => (
              <tr key={prop.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium">{prop.title}</td>
                <td className="p-4 text-gray-600">{prop.location}</td>
                <td className="p-4 font-bold">R$ {prop.price}</td>
                <td className="p-4 text-right space-x-2">
                  {/* LINK DE VISUALIZAÇÃO PÚBLICA (OPCIONAL) */}
                  <Button variant="outline" size="icon" asChild title="Ver no site">
                    <Link href={`/imoveis/${prop.id}`} target="_blank"><ExternalLink className="h-4 w-4" /></Link>
                  </Button>

                  {/* CORREÇÃO: EDITAR ABRE NA MESMA GUIA E NO CAMINHO DE ADMIN */}
                  <Button variant="outline" size="icon" className="text-blue-600" asChild>
                    <Link href={`/admin/imoveis/editar/${prop.id}`}><Pencil className="h-4 w-4" /></Link>
                  </Button>

                  {/* BOTÃO EXCLUIR FUNCIONAL */}
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="text-red-600" 
                    onClick={() => handleDelete(prop.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}