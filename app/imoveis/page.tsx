import { prisma } from "@/lib/prisma"
import { PropertyCard } from "@/components/property-card"
import { SearchBar } from "@/components/search-bar"

export default async function ImoveisPage() {
  // Busca todos os imóveis do banco via Prisma
  const allProperties = await prisma.property.findMany({
    orderBy: { createdAt: "desc" }
  })

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="bg-[#1E5933] py-16 px-4 text-center">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">Nossos Imóveis</h1>
          <p className="text-lg text-white/90 mb-8 max-w-2xl">
            Explore nossa seleção exclusiva de propriedades diretamente do nosso sistema.
          </p>
          <div className="w-full max-w-4xl mx-auto">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          {allProperties.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">Nenhum imóvel cadastrado no momento.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {allProperties.map((property) => (
                <PropertyCard 
                  key={property.id} 
                  {...property} 
                  // Como o banco salva 'images' como array, passamos a primeira foto
                  image={property.images[0] || "/placeholder.svg"} 
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
