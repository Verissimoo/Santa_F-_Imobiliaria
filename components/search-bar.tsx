"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"

export function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Inicializamos os estados com o que já estiver na URL ou vazio
  const [category, setCategory] = useState(searchParams.get("category") || "")
  const [type, setType] = useState(searchParams.get("type") || "")
  const [state, setState] = useState(searchParams.get("state") || "")

  const propertyTypes = {
    Urbano: ["Casa", "Apartamento", "Lote", "Terreno", "Comercial"],
    Rural: ["Fazenda", "Chácara", "Sítio", "Terreno Rural"]
  }

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (category) params.set("category", category)
    if (type) params.set("type", type)
    if (state) params.set("state", state)

    // Faz a busca recarregando a página com os filtros na URL
    router.push(`/imoveis?${params.toString()}`)
  }

  return (
    <div className="w-full max-w-5xl bg-white rounded-xl shadow-2xl p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Zona / Categoria */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-[#1E5933] mb-2">Zona</label>
          <select 
            value={category}
            onChange={(e) => { setCategory(e.target.value); setType(""); }}
            className="h-11 px-4 rounded-lg border border-input bg-background text-black focus:outline-none focus:ring-2 focus:ring-[#B5893E]"
          >
            <option value="">Todas</option>
            <option value="Urbano">Urbana</option>
            <option value="Rural">Rural</option>
          </select>
        </div>

        {/* Tipo Dinâmico */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-[#1E5933] mb-2">Tipo</label>
          <select 
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="h-11 px-4 rounded-lg border border-input bg-background text-black focus:outline-none focus:ring-2 focus:ring-[#B5893E]"
          >
            <option value="">Todos os tipos</option>
            {category && propertyTypes[category as keyof typeof propertyTypes].map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
            {!category && [...propertyTypes.Urbano, ...propertyTypes.Rural].map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Estado (Antiga Cidade) */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-[#1E5933] mb-2">Estado</label>
          <select 
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="h-11 px-4 rounded-lg border border-input bg-background text-black focus:outline-none focus:ring-2 focus:ring-[#B5893E]"
          >
            <option value="">Todos os estados</option>
            <option value="GO">Goiás (GO)</option>
            <option value="DF">Distrito Federal (DF)</option>
            <option value="MT">Mato Grosso (MT)</option>
            <option value="MS">Mato Grosso do Sul (MS)</option>
            <option value="TO">Tocantins (TO)</option>
            <option value="BA">Bahia (BA)</option>
            <option value="MG">Minas Gerais (MG)</option>
          </select>
        </div>
      </div>

      <Button 
        onClick={handleSearch} 
        className="w-full md:w-auto mt-4 bg-[#1E5933] hover:bg-[#1E5933]/90 text-white px-8" 
        size="lg"
      >
        <Search className="w-4 h-4 mr-2" />
        Buscar Imóveis
      </Button>
    </div>
  )
}
