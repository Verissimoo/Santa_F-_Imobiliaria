"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, LayoutDashboard, LogIn } from "lucide-react"
import { usePathname } from "next/navigation"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const pathname = usePathname()

  // Verifica se o usuário está logado sempre que a rota muda
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem("auth_token") : null
    setIsLoggedIn(!!token)
  }, [pathname])

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo - MANTIDO EXATAMENTE COMO O SEU */}
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
              href="https://wa.me/5561974036070" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#1E5933] hover:text-[#B5893E] font-medium transition-colors"
            >
              Contato
            </Link>
            
            {/* Lógica Condicional: Painel Admin (se logado) ou Entrar (se deslogado) */}
            {isLoggedIn ? (
              <Link href="/admin" className="text-[#B5893E] hover:text-[#1E5933] font-bold flex items-center gap-2 transition-colors">
                <LayoutDashboard className="w-4 h-4" />
                Painel Admin
              </Link>
            ) : (
              <Link href="/login" className="text-[#1E5933] hover:text-[#B5893E] font-medium flex items-center gap-2 transition-colors">
                <LogIn className="w-4 h-4" />
                Entrar
              </Link>
            )}
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
              <Link href="/" className="px-2 py-2 text-[#1E5933] font-medium" onClick={() => setIsOpen(false)}>Início</Link>
              <Link href="/imoveis" className="px-2 py-2 text-[#1E5933] font-medium" onClick={() => setIsOpen(false)}>Imóveis</Link>
              <Link href="/empresa" className="px-2 py-2 text-[#1E5933] font-medium" onClick={() => setIsOpen(false)}>A Empresa</Link>
              <Link href="https://wa.me/5561974036070" target="_blank" className="px-2 py-2 text-[#1E5933] font-medium" onClick={() => setIsOpen(false)}>Contato</Link>
              
              {/* Condição Mobile */}
              {isLoggedIn ? (
                <Link href="/admin" className="px-2 py-2 text-[#B5893E] font-bold border-t pt-4 flex items-center gap-2" onClick={() => setIsOpen(false)}>
                  <LayoutDashboard className="w-5 h-5" /> Painel Admin
                </Link>
              ) : (
                <Link href="/login" className="px-2 py-2 text-[#1E5933] font-medium border-t pt-4 flex items-center gap-2" onClick={() => setIsOpen(false)}>
                  <LogIn className="w-5 h-5" /> Entrar
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
