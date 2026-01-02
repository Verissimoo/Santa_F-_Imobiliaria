import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PropertyCard } from "@/components/property-card"
import { SearchBar } from "@/components/search-bar"

const featuredProperties = [
  {
    id: "1",
    image: "/luxury-modern-apartment-exterior.jpg",
    price: "R$ 850.000",
    title: "Apartamento Moderno",
    location: "Jardins, São Paulo",
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    area: 120,
  },
  {
    id: "2",
    image: "/elegant-penthouse-with-city-view.jpg",
    price: "R$ 1.200.000",
    title: "Cobertura de Luxo",
    location: "Moema, São Paulo",
    bedrooms: 4,
    bathrooms: 3,
    parking: 3,
    area: 180,
  },
  {
    id: "3",
    image: "/beautiful-modern-house.jpg",
    price: "R$ 2.500.000",
    title: "Casa em Condomínio",
    location: "Alphaville, São Paulo",
    bedrooms: 5,
    bathrooms: 4,
    parking: 4,
    area: 350,
  },
  {
    id: "4",
    image: "/modern-commercial-building.png",
    price: "R$ 3.500.000",
    title: "Edifício Comercial",
    location: "Paulista, São Paulo",
    bedrooms: 0,
    bathrooms: 6,
    parking: 10,
    area: 600,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] bg-cover bg-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/luxury-real-estate-building-facade.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl md:text-6xl font-serif text-white text-center mb-6 text-balance">
            Encontre o Imóvel dos Seus Sonhos
          </h1>
          <p className="text-lg md:text-xl text-white/90 text-center mb-12 max-w-2xl text-balance">
            Excelência em consultoria e gestão imobiliária
          </p>

          {/* Search Bar */}
          <SearchBar />
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-16 md:py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-serif text-[#1E5933] mb-4">Imóveis em Destaque</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Selecionamos os melhores imóveis para você
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-[#1E5933] hover:bg-[#1E5933]/90 text-white px-8">
              <Link href="/imoveis">Ver Todos os Imóveis</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 px-4 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-serif text-[#1E5933] mb-4">Por Que Escolher a Santa Fé?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#B5893E]/10 flex items-center justify-center">
                <div className="w-8 h-8 bg-[#B5893E] rounded-full" />
              </div>
              <h3 className="text-xl font-semibold text-[#1E5933] mb-3">Experiência</h3>
              <p className="text-muted-foreground">Mais de 25 anos de mercado com excelência comprovada</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#B5893E]/10 flex items-center justify-center">
                <div className="w-8 h-8 bg-[#B5893E] rounded-full" />
              </div>
              <h3 className="text-xl font-semibold text-[#1E5933] mb-3">Atendimento Personalizado</h3>
              <p className="text-muted-foreground">Dedicação total para encontrar o imóvel perfeito para você</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#B5893E]/10 flex items-center justify-center">
                <div className="w-8 h-8 bg-[#B5893E] rounded-full" />
              </div>
              <h3 className="text-xl font-semibold text-[#1E5933] mb-3">Portfólio Premium</h3>
              <p className="text-muted-foreground">Seleção exclusiva dos melhores imóveis da região</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
