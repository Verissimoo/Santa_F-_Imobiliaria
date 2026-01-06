import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CheckCircle, Target, Eye, Shield, MapPin, Globe } from "lucide-react"

export default function EmpresaPage() {
  return (
    <div className="min-h-screen bg-white">
      
      
      {/* Hero Section */}
      <section className="relative py-20 bg-[#1E5933] text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Santa Fé Imobiliária</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Tradição, confiança e excelência realizando sonhos em Pirenópolis e região.
          </p>
        </div>
      </section>

      {/* História */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-[#1E5933] mb-6 border-b-2 border-[#B5893E] inline-block">História</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Somos resultado de uma parceria construída ao longo de anos de convivência profissional e comercial, pautada pela confiança, transparência e crescimento mútuo. Nosso propósito é ser referência no mercado imobiliário, realizando sonhos e grandes negócios com segurança e excelência. Conectamos pessoas a lares, oportunidades e investimentos, criando valor duradouro para todos.
            </p>
          </div>
        </div>
      </section>

      {/* Missão e Visão */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-sm border-l-4 border-[#1E5933]">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-8 h-8 text-[#B5893E]" />
                <h3 className="text-2xl font-serif font-bold text-[#1E5933]">Missão</h3>
              </div>
              <p className="text-muted-foreground">
                Auxiliar e facilitar a realização de sonhos imobiliários com ética, segurança e excelência, oferecendo soluções completas em compra, venda, locação e intermediação. Atuar com foco na satisfação do cliente, qualificação contínua da equipe e credibilidade, proporcionando experiências tranquilas, claras e eficientes.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border-l-4 border-[#1E5933]">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-8 h-8 text-[#B5893E]" />
                <h3 className="text-2xl font-serif font-bold text-[#1E5933]">Visão</h3>
              </div>
              <p className="text-muted-foreground">
                Ser referência e liderança no mercado imobiliário, reconhecida pela qualidade no atendimento, inovação, eficiência e resultados concretos. Tornar-se a melhor e mais completa prestadora de serviços do segmento, criando oportunidades que transformam paisagens urbanas e fortalecem investimentos com solidez e valor duradouro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Atuação e Segmentos */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-serif font-bold text-[#1E5933] mb-6 flex items-center gap-2">
                <Globe className="w-6 h-6 text-[#B5893E]" /> Nossa Atuação
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Temos como foco principal a cidade de <strong>Pirenópolis (GO)</strong>, expandindo nossa presença para todo o estado de Goiás, incluindo Goiânia e região metropolitana, além de outras regiões do país (MT, MS, TO, BA, MG).
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-serif font-bold text-[#1E5933] mb-6 flex items-center gap-2">
                <Shield className="w-6 h-6 text-[#B5893E]" /> Nosso Compromisso
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Atuamos com responsabilidade, seriedade e foco em resultados, garantindo negócios seguros, atendimento humanizado e relações duradouras baseadas na confiança e profissionalismo.
              </p>
            </div>
          </div>
          
          <div className="mt-16 bg-[#1E5933] text-white p-10 rounded-3xl">
            <h3 className="text-2xl font-serif font-bold mb-8 text-center text-[#B5893E]">Segmentos de Operação</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                <h4 className="font-bold text-xl mb-3">Mercado Urbano</h4>
                <p className="text-white/80 text-sm">Compra, venda e locação de imóveis residenciais, comerciais, loteamentos, condomínios e áreas para desenvolvimento urbano.</p>
              </div>
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                <h4 className="font-bold text-xl mb-3">Mercado Rural</h4>
                <p className="text-white/80 text-sm">Intermediação de fazendas e áreas rurais, pecuária, lavoura, áreas de reserva e propriedades para expansão territorial.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold text-[#1E5933] mb-12">Nossos Valores</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              "Ética e Honestidade", "Transparência", "Foco no Cliente", 
              "Profissionalismo", "Credibilidade", "Inovação"
            ].map((valor, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="p-4 bg-white rounded-full shadow-sm text-[#B5893E]">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <span className="font-medium text-[#1E5933] text-sm">{valor}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}