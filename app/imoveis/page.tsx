import { prisma } from "@/lib/prisma"
import { PropertyCard } from "@/components/property-card"
import { SearchBar } from "@/components/search-bar"
import { Suspense } from "react"

export default async function ImoveisPage(props: { 
  searchParams: Promise<{ category?: string; type?: string; state?: string }> 
}) {
  const searchParams = await props.searchParams;

  const where: any = {};
  if (searchParams.category) where.category = searchParams.category;
  if (searchParams.type) where.tipo = searchParams.type;
  
  if (searchParams.state) {
    where.location = { 
      contains: searchParams.state, 
      mode: 'insensitive' 
    };
  }

  const allProperties = await prisma.property.findMany({
    where,
    orderBy: { createdAt: "desc" }
  })

  const formatPrice = (price: string) => {
    const value = parseInt(price.replace(/\D/g, '')) || 0;
    
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }

  return (
    <div className="min-h-screen">
      <section className="bg-[#1E5933] py-16 px-4 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-serif mb-6">Nossos Imóveis</h1>
        <div className="w-full max-w-4xl mx-auto">
          <Suspense fallback={<div className="h-20 bg-white/10 animate-pulse rounded-xl" />}>
            <SearchBar />
          </Suspense>
        </div>
      </section>

      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          {allProperties.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed rounded-3xl">
              <p className="text-muted-foreground">Nenhum imóvel encontrado para os filtros selecionados.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {allProperties.map((property) => (
                <PropertyCard 
                  key={property.id} 
                  {...property} 
                  // Passagem explícita para compatibilidade com o componente PropertyCard atualizado
                  price={formatPrice(property.price)}
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
