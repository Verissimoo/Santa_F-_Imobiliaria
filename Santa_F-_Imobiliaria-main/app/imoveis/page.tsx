import { prisma } from "@/lib/prisma"
import { PropertyCard } from "@/components/property-card"
import { SearchBar } from "@/components/search-bar"
import { Suspense } from "react" // Importante para o SearchBar

export default async function ImoveisPage(props: { 
  searchParams: Promise<{ category?: string; type?: string; city?: string }> 
}) {
  // CORREÇÃO: Aguardar o searchParams (Obrigatório no Next.js 15/16)
  const searchParams = await props.searchParams;

  // Construção do filtro dinâmico para o Prisma baseado no seu Schema
  const where: any = {};
  if (searchParams.category) where.category = searchParams.category;
  if (searchParams.type) where.tipo = searchParams.type; // 'tipo' conforme seu schema
  if (searchParams.city) where.location = { contains: searchParams.city, mode: 'insensitive' };

  const allProperties = await prisma.property.findMany({
    where,
    orderBy: { createdAt: "desc" }
  })

  // Função para formatar preço com R$ automaticamente
  const formatPrice = (price: string) => {
    const value = parseFloat(price.replace(/[^\d.-]/g, '')) || 0;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  }

  return (
    <div className="min-h-screen">
      <section className="bg-[#1E5933] py-16 px-4 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-serif mb-6">Nossos Imóveis</h1>
        <div className="w-full max-w-4xl mx-auto">
          {/* Suspense é necessário porque o SearchBar usa useSearchParams */}
          <Suspense fallback={<div>Carregando filtros...</div>}>
            <SearchBar />
          </Suspense>
        </div>
      </section>

      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          {allProperties.length === 0 ? (
            <p className="text-center text-muted-foreground">Nenhum imóvel encontrado.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {allProperties.map((property) => (
                <PropertyCard 
                  key={property.id} 
                  {...property} 
                  price={formatPrice(property.price)} // Preço formatado com R$
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
