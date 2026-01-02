"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <img src="/images/doc-20251227-wa0072.png" alt="Santa Fé Logo" className="h-28 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-[#1E5933] hover:text-[#B5893E] font-medium transition-colors">
              Início
            </Link>
            <Link href="/imoveis" className="text-[#1E5933] hover:text-[#B5893E] font-medium transition-colors">
              Imóveis
            </Link>
            <Link href="/empresa" className="text-[#1E5933] hover:text-[#B5893E] font-medium transition-colors">
              A Empresa
            </Link>
            <Link
              href="/admin/imoveis/novo"
              className="text-[#1E5933] hover:text-[#B5893E] font-medium transition-colors"
            >
              Admin
            </Link>
            <Button className="bg-[#1E5933] hover:bg-[#1E5933]/90 text-white">Contato</Button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-[#1E5933]">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-[#1E5933] hover:text-[#B5893E] font-medium transition-colors px-2 py-2"
                onClick={() => setIsOpen(false)}
              >
                Início
              </Link>
              <Link
                href="/imoveis"
                className="text-[#1E5933] hover:text-[#B5893E] font-medium transition-colors px-2 py-2"
                onClick={() => setIsOpen(false)}
              >
                Imóveis
              </Link>
              <Link
                href="/empresa"
                className="text-[#1E5933] hover:text-[#B5893E] font-medium transition-colors px-2 py-2"
                onClick={() => setIsOpen(false)}
              >
                A Empresa
              </Link>
              <Link
                href="/admin/imoveis/novo"
                className="text-[#1E5933] hover:text-[#B5893E] font-medium transition-colors px-2 py-2"
                onClick={() => setIsOpen(false)}
              >
                Admin
              </Link>
              <Button className="bg-[#1E5933] hover:bg-[#1E5933]/90 text-white w-full">Contato</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
