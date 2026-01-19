import Link from "next/link"
import { MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#1E5933] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <img
              src="/images/doc-20251227-wa0072.png"
              alt="Santa Fé Logo"
              className="h-23 w-auto mb-1 "
            />
            <p className="text-white/80 text-sm leading-relaxed max-w-md">
              Excelência em consultoria e gestão imobiliária desde 1998. Conectando pessoas aos imóveis dos seus sonhos.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#B5893E] font-semibold mb-4">Links Rápidos</h3>
            <div className="flex flex-col gap-2">
              <Link href="/" className="text-white/80 hover:text-white transition-colors text-sm">
                Início
              </Link>
              <Link href="/imoveis" className="text-white/80 hover:text-white transition-colors text-sm">
                Imóveis
              </Link>
              <Link href="/empresa" className="text-white/80 hover:text-white transition-colors text-sm">
                A Empresa
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-[#B5893E] font-semibold mb-4">Contato</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#B5893E] mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">Pirenópolis • Goiás</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#B5893E] flex-shrink-0" />
                <span className="text-white/80 text-sm">(62) 8346-9699</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#B5893E] flex-shrink-0" />
                <span className="text-white/80 text-sm">gestaoimobsantafe@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Santa Fé Imobiliária. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
