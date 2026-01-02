import { PropertyCard } from "@/components/property-card"
import { SearchBar } from "@/components/search-bar"

const allProperties = [
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
  {
    id: "5",
    image: "/luxury-villa-pool.png",
    price: "R$ 4.200.000",
    title: "Casa de Alto Padrão",
    location: "Morumbi, São Paulo",
    bedrooms: 6,
    bathrooms: 5,
    parking: 5,
    area: 500,
  },
  {
    id: "6",
    image: "/modern-loft-interior.jpg",
    price: "R$ 680.000",
    title: "Loft Contemporâneo",
    location: "Vila Madalena, São Paulo",
    bedrooms: 1,
    bathrooms: 1,
    parking: 1,
    area: 80,
  },
  {
    id: "7",
    image: "/elegant-duplex-apartment.jpg",
    price: "R$ 1.850.000",
    title: "Duplex Exclusivo",
    location: "Higienópolis, São Paulo",
    bedrooms: 4,
    bathrooms: 3,
    parking: 3,
    area: 220,
  },
  {
    id: "8",
    image: "/modern-studio-apartment.png",
    price: "R$ 420.000",
    title: "Studio Compacto",
    location: "Pinheiros, São Paulo",
    bedrooms: 1,
    bathrooms: 1,
    parking: 1,
    area: 45,
  },
]

export default function ImoveisPage() {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
<section className="bg-[#1E5933] py-16 px-4">
  <div className="max-w-7xl mx-auto flex flex-col items-center"> {/* Adicionado flex e items-center */}
    <h1 className="text-4xl md:text-5xl font-serif text-white text-center mb-6">
      Nossos Imóveis
    </h1>
    <p className="text-lg text-white/90 text-center mb-8 max-w-2xl">
      Explore nossa seleção exclusiva de propriedades
    </p>

    {/* Wrapper para garantir a centralização da barra de busca */}
    <div className="w-full flex justify-center">
      <SearchBar />
    </div>
  </div>
</section>

      {/* Properties Grid */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {allProperties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
