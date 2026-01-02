import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function EmpresaPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-[#1E5933]">
        <div className="absolute inset-0">
          <img
            src="/real-estate-team-office.png"
            alt="Santa Fé Equipe"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl md:text-5xl font-serif text-white text-center mb-4">A Empresa</h1>
          <p className="text-lg text-white/90 text-center max-w-2xl">
            Excelência e confiança no mercado imobiliário há mais de 25 anos
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-[#1E5933] mb-6">Sobre Nós</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                A <strong className="text-[#1E5933]">Santa Fé Imobiliária</strong> foi fundada em 1998 com o compromisso
                de oferecer serviços de excelência em consultoria e gestão imobiliária. Ao longo de mais de duas
                décadas, construímos uma sólida reputação baseada em profissionalismo, ética e dedicação aos nossos
                clientes.
              </p>
              <p>
                Nossa equipe de consultores especializados está preparada para atender todas as suas necessidades no
                mercado imobiliário, seja na compra, venda ou locação de imóveis residenciais e comerciais. Trabalhamos
                com um portfólio exclusivo de propriedades nas melhores localizações de São Paulo.
              </p>
              <p>
                Acreditamos que cada cliente é único e merece um atendimento personalizado. Por isso, dedicamos tempo
                para entender suas necessidades e encontrar a solução perfeita. Nossa missão é transformar sonhos em
                realidade, conectando pessoas aos imóveis ideais.
              </p>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-[#1E5933] mb-6">Nossa Missão</h2>
            <div className="bg-[#F8F9FA] p-8 rounded-xl border">
              <p className="text-muted-foreground leading-relaxed">
                Proporcionar experiências excepcionais no mercado imobiliário, conectando pessoas aos imóveis dos seus
                sonhos com profissionalismo, transparência e dedicação. Buscamos constantemente a excelência em nossos
                serviços, mantendo valores sólidos de ética, confiança e compromisso com a satisfação dos nossos
                clientes.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-[#1E5933] mb-6">Nossos Valores</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-[#F8F9FA] rounded-xl">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#B5893E]/20 flex items-center justify-center">
                  <div className="w-6 h-6 bg-[#B5893E] rounded-full" />
                </div>
                <h3 className="text-lg font-semibold text-[#1E5933] mb-2">Integridade</h3>
                <p className="text-sm text-muted-foreground">Transparência e ética em todas as nossas relações</p>
              </div>

              <div className="text-center p-6 bg-[#F8F9FA] rounded-xl">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#B5893E]/20 flex items-center justify-center">
                  <div className="w-6 h-6 bg-[#B5893E] rounded-full" />
                </div>
                <h3 className="text-lg font-semibold text-[#1E5933] mb-2">Excelência</h3>
                <p className="text-sm text-muted-foreground">Comprometimento com a qualidade em cada detalhe</p>
              </div>

              <div className="text-center p-6 bg-[#F8F9FA] rounded-xl">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#B5893E]/20 flex items-center justify-center">
                  <div className="w-6 h-6 bg-[#B5893E] rounded-full" />
                </div>
                <h3 className="text-lg font-semibold text-[#1E5933] mb-2">Dedicação</h3>
                <p className="text-sm text-muted-foreground">Foco total na satisfação dos nossos clientes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-[#F8F9FA]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-[#1E5933] mb-8 text-center">Entre em Contato</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#B5893E]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[#B5893E]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1E5933] mb-2">Endereço</h3>
                  <p className="text-sm text-muted-foreground">
                    Av. Paulista, 1000 - Sala 1501
                    <br />
                    Bela Vista, São Paulo - SP
                    <br />
                    CEP: 01310-100
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#B5893E]/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-[#B5893E]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1E5933] mb-2">Telefone</h3>
                  <p className="text-sm text-muted-foreground">
                    (11) 3456-7890
                    <br />
                    (11) 98765-4321
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#B5893E]/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-[#B5893E]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1E5933] mb-2">E-mail</h3>
                  <p className="text-sm text-muted-foreground">
                    contato@santafe.com.br
                    <br />
                    vendas@santafe.com.br
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#B5893E]/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-[#B5893E]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1E5933] mb-2">Horário</h3>
                  <p className="text-sm text-muted-foreground">
                    Seg à Sex: 9h às 18h
                    <br />
                    Sábado: 9h às 13h
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
