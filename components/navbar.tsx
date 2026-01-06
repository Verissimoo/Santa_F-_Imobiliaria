"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

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
            
            {/* Link de Contato via WhatsApp */}
            <Link 
              href="https://wa.me/5561974036070" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#1E5933] hover:text-[#B5893E] font-medium transition-colors"
            >
              Contato
            </Link>
            
            {/* Link para o Painel Administrativo */}
            <Link href="/admin" className="text-[#1E5933] hover:text-[#B5893E] font-medium transition-colors">
              Painel Admin
            </Link>
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
                className="px-2 py-2 text-[#1E5933] font-medium" 
                onClick={() => setIsOpen(false)}
              >
                Início
              </Link>
              <Link 
                href="/imoveis" 
                className="px-2 py-2 text-[#1E5933] font-medium" 
                onClick={() => setIsOpen(false)}
              >
                Imóveis
              </Link>
              <Link 
                href="/empresa" 
                className="px-2 py-2 text-[#1E5933] font-medium" 
                onClick={() => setIsOpen(false)}
              >
                A Empresa
              </Link>
              <Link 
                href="https://wa.me/5561974036070" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-2 text-[#1E5933] font-medium" 
                onClick={() => setIsOpen(false)}
              >
                Contato
              </Link>
              <Link 
                href="/admin" 
                className="px-2 py-2 text-[#1E5933] font-medium border-t pt-4" 
                onClick={() => setIsOpen(false)}
              >
                Painel Admin
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
