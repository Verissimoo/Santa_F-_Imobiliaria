import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PropertyCard } from "@/components/property-card"
import { SearchBar } from "@/components/search-bar"
import { prisma } from "@/lib/prisma"
import { Suspense } from "react"
import { ShieldCheck, Map, Sprout, ArrowRight } from "lucide-react"

// Força a página a ser sempre dinâmica, resolvendo o problema de atualização dos destaques
export const dynamic = "force-dynamic"

export default async function HomePage() {
  const featuredProperties = await prisma.property.findMany({
    where: { isFeatured: true },
    orderBy: { createdAt: "desc" },
    take: 4 
  })

  const formatPrice = (price: string) => {
    const value = parseInt(price.replace(/\D/g, "")) || 0
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section Reestruturada */}
      <section className="relative overflow-hidden">
        {/* Container da Imagem e Título */}
        <div className="relative h-[450px] md:h-[750px] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
            style={{
              backgroundImage: "url(/luxury-real-estate-building-facade.jpg)", 
            }}
          >
            <div className="absolute inset-0 bg-black/50" />
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 text-center">
            <h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 leading-tight tracking-tight whitespace-normal md:whitespace-nowrap"
              style={{ 
                textShadow: '0px 4px 20px rgba(0, 0, 0, 0.6)' 
              }}
            >
              Encontre o Imóvel dos Seus Sonhos
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 mb-4 max-w-3xl mx-auto font-light tracking-wide">
              Excelência em consultoria e gestão imobiliária no coração de Goiás.
            </p>
          </div>
        </div>

        {/* Barra de Busca (Filtro) */}
        {/* Mobile: mt-8 (abaixo da imagem) | Desktop: md:-mt-20 (em cima da imagem) */}
        <div className="relative z-20 px-4 mt-8 md:-mt-20 mb-10 md:mb-16">
          <div className="w-full max-w-5xl mx-auto">
            <Suspense fallback={<div className="h-20 w-full bg-gray-100 animate-pulse rounded-2xl" />}>
              <SearchBar />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Seção de Destaques */}
      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-[#1E5933] mb-4">Imóveis em Destaque</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
              Curadoria exclusiva de propriedades selecionadas pela Santa Fé.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProperties.length === 0 ? (
              <div className="col-span-full py-24 text-center border border-dashed rounded-3xl bg-gray-50/50">
                <p className="text-muted-foreground">Novas oportunidades em breve.</p>
              </div>
            ) : (
              featuredProperties.map((property) => (
                <PropertyCard 
                  key={property.id} 
                  id={property.id}
                  title={property.title}
                  location={property.location}
                  bedrooms={property.bedrooms}
                  bathrooms={property.bathrooms}
                  area={property.area}
                  price={formatPrice(property.price)}
                  image={property.images[0] || "/placeholder.svg"} 
  />
              ))
            )}
          </div>

          <div className="text-center mt-16">
            <Button asChild size="lg" className="bg-[#1E5933] hover:bg-[#1E5933]/90 text-white px-10 h-14 rounded-xl text-lg transition-all active:scale-95 shadow-lg shadow-[#1E5933]/20">
              <Link href="/imoveis">Explorar Imóveis <ArrowRight className="ml-2 w-5 h-5" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Por Que Escolher a Santa Fé? */}
      <section className="py-20 md:py-28 px-4 bg-[#F8F9FA] border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-serif text-[#1E5933] mb-4">Por Que Escolher a Santa Fé?</h2>
            <div className="w-24 h-1.5 bg-[#B5893E] mx-auto rounded-full opacity-30" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center group p-8 bg-white rounded-[2rem] shadow-sm border border-gray-100 transition-all hover:shadow-md">
              <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-[#1E5933]/5 flex items-center justify-center">
                <Map className="w-8 h-8 text-[#B5893E]" />
              </div>
              <h3 className="text-xl font-bold text-[#1E5933] mb-4 uppercase tracking-widest text-sm">Atuação Regional</h3>
              <p className="text-gray-500 leading-relaxed text-sm font-light">
                Foco em Pirenópolis e Goiânia, com expansão estratégica para MT, MS, TO, BA e MG.
              </p>
            </div>

            <div className="text-center group p-8 bg-white rounded-[2rem] shadow-sm border border-gray-100 transition-all hover:shadow-md">
              <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-[#1E5933]/5 flex items-center justify-center">
                <Sprout className="w-8 h-8 text-[#B5893E]" />
              </div>
              <h3 className="text-xl font-bold text-[#1E5933] mb-4 uppercase tracking-widest text-sm">Foco no Agronegócio</h3>
              <p className="text-gray-500 leading-relaxed text-sm font-light">
                Especialistas na intermediação de fazendas e áreas produtivas em todo o país.
              </p>
            </div>

            <div className="text-center group p-8 bg-white rounded-[2rem] shadow-sm border border-gray-100 transition-all hover:shadow-md">
              <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-[#1E5933]/5 flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-[#B5893E]" />
              </div>
              <h3 className="text-xl font-bold text-[#1E5933] mb-4 uppercase tracking-widest text-sm">Segurança Jurídica</h3>
              <p className="text-gray-500 leading-relaxed text-sm font-light">
                Transparência e ética garantindo proteção total ao seu investimento patrimonial.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
  