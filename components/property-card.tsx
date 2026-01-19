import Link from "next/link"
import { Bed, Bath, Droplets, Maximize } from "lucide-react" // Trocado Car por Droplets

interface PropertyCardProps {
  id: string
  image: string
  price: string
  title: string
  location: string
  bedrooms: number
  bathrooms: number
  waterSources: number // Alterado de parking
  area: number
}

export function PropertyCard({
  id,
  image,
  price,
  title,
  location,
  bedrooms,
  bathrooms,
  waterSources,
  area,
}: PropertyCardProps) {
  return (
    <Link href={`/imoveis/${id}`} className="group">
      <div className="bg-white rounded-xl overflow-hidden border hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-64 overflow-hidden">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        <div className="p-5">
          <div className="text-2xl font-bold text-[#1E5933] mb-2">{price}</div>

          <h3 className="font-semibold text-foreground mb-1 group-hover:text-[#1E5933] transition-colors">{title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{location}</p>

          <div className="flex items-center justify-between pt-4 border-t">
            {bedrooms > 0 && (
              <div className="flex items-center gap-1.5">
                <Bed className="w-4 h-4 text-[#B5893E]" />
                <span className="text-sm text-muted-foreground">{bedrooms}</span>
              </div>
            )}

            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-[#B5893E]" />
              <span className="text-sm text-muted-foreground">{bathrooms}</span>
            </div>

            {/* ÍCONE DE ÁGUA / NASCENTES */}
            <div className="flex items-center gap-1.5" title="Nascentes/Represas">
              <Droplets className="w-4 h-4 text-[#B5893E]" />
              <span className="text-sm text-muted-foreground">{waterSources}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Maximize className="w-4 h-4 text-[#B5893E]" />
              <span className="text-sm text-muted-foreground">{area}m²</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
