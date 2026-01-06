"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SearchBar() {
  const [category, setCategory] = useState("")

  const propertyTypes = {
    Urbano: ["Casa", "Apartamento", "Lote", "Terreno", "Comercial"],
    Rural: ["Fazenda", "Chácara", "Sítio", "Terreno Rural"]
  }

  return (
    <div className="w-full max-w-5xl bg-white rounded-xl shadow-2xl p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Zona / Categoria */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-[#1E5933] mb-2">Zona</label>
          <select 
            onChange={(e) => setCategory(e.target.value)}
            className="h-11 px-4 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#B5893E]"
          >
            <option value="">Todas</option>
            <option value="Urbano">Urbana</option>
            <option value="Rural">Rural</option>
          </select>
        </div>

        {/* Tipo Dinâmico */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-[#1E5933] mb-2">Tipo</label>
          <select className="h-11 px-4 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#B5893E]">
            <option value="">Todos os tipos</option>
            {category && propertyTypes[category as keyof typeof propertyTypes].map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
            {!category && [...propertyTypes.Urbano, ...propertyTypes.Rural].map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Cidade (Foco na Região) */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-[#1E5933] mb-2">Cidade</label>
          <select className="h-11 px-4 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#B5893E]">
            <option value="Pirenópolis">Pirenópolis</option>
            <option value="Corumbá de Goiás">Corumbá de Goiás</option>
            <option value="Cocalzinho">Cocalzinho</option>
            <option value="Abadiânia">Abadiânia</option>
          </select>
        </div>

        {/* Preço Máximo */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-[#1E5933] mb-2">Preço Máximo</label>
          <select className="h-11 px-4 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#B5893E]">
            <option value="">Sem limite</option>
            <option value="500000">Até R$ 500.000</option>
            <option value="1000000">Até R$ 1.000.000</option>
            <option value="5000000">Até R$ 5.000.000</option>
          </select>
        </div>
      </div>

      <Button className="w-full md:w-auto mt-4 bg-[#1E5933] hover:bg-[#1E5933]/90 text-white px-8" size="lg">
        <Search className="w-4 h-4 mr-2" />
        Buscar Imóveis
      </Button>
    </div>
  )
}
