import Link from "next/link"
import { Bed, Bath, Maximize } from "lucide-react"

interface PropertyCardProps {
  id: string
  image: string
  price: string
  title: string
  location: string
  bedrooms: number
  bathrooms: number
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

          <h3 className="font-semibold text-foreground mb-1 group-hover:text-[#1E5933] transition-colors line-clamp-1">{title}</h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-1">{location}</p>

          {/* Features: Apenas ícone e número */}
          <div className="flex items-center justify-between pt-4 border-t">
            {bedrooms > 0 && (
              <div className="flex items-center gap-1.5">
                <Bed className="w-4 h-4 text-[#B5893E]" />
                <span className="text-sm text-muted-foreground font-medium">{bedrooms}</span>
              </div>
            )}

            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-[#B5893E]" />
              <span className="text-sm text-muted-foreground font-medium">{bathrooms}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Maximize className="w-4 h-4 text-[#B5893E]" />
              <span className="text-sm text-muted-foreground font-medium">{area}m²</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
