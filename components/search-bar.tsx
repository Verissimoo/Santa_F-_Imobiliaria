"use client"

import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SearchBar() {
  return (
    <div className="w-full max-w-5xl bg-white rounded-xl shadow-2xl p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Finalidade */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-[#1E5933] mb-2">Finalidade</label>
          <select className="h-11 px-4 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#B5893E]">
            <option>Venda</option>
            <option>Locação</option>
          </select>
        </div>

        {/* Tipo */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-[#1E5933] mb-2">Tipo</label>
          <select className="h-11 px-4 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#B5893E]">
            <option>Apartamento</option>
            <option>Casa</option>
            <option>Cobertura</option>
            <option>Comercial</option>
          </select>
        </div>

        {/* Cidade */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-[#1E5933] mb-2">Cidade</label>
          <select className="h-11 px-4 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#B5893E]">
            <option>São Paulo</option>
            <option>Santos</option>
            <option>Campinas</option>
          </select>
        </div>

        {/* Faixa de Preço */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-[#1E5933] mb-2">Preço Máximo</label>
          <select className="h-11 px-4 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#B5893E]">
            <option>R$ 500.000</option>
            <option>R$ 1.000.000</option>
            <option>R$ 2.000.000</option>
            <option>R$ 5.000.000+</option>
          </select>
        </div>
      </div>

      {/* Search Button */}
      <Button className="w-full md:w-auto mt-4 bg-[#1E5933] hover:bg-[#1E5933]/90 text-white px-8" size="lg">
        <Search className="w-4 h-4 mr-2" />
        Buscar Imóveis
      </Button>
    </div>
  )
}
