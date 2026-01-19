"use client"

import { useState } from "react"
import { Camera } from "lucide-react"
import Image from "next/image"
import { 
  Dialog, 
  DialogContent, 
  DialogTrigger, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

interface PropertyMainImageProps {
  images: string[]
  title: string
  tipo: string
}

export function PropertyMainImage({ images, title, tipo }: PropertyMainImageProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="relative h-[350px] md:h-[500px] w-full overflow-hidden rounded-2xl shadow-lg cursor-pointer group">
          <Image
            src={images[0] || "/placeholder.svg"}
            alt={title}
            fill
            priority
            quality={90}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          <div className="absolute top-4 left-4 bg-[#1E5933] text-white px-4 py-1 rounded-full text-sm font-medium shadow-md">
            {tipo}
          </div>

          <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm hover:bg-white text-[#1E5933] px-5 py-2.5 rounded-xl shadow-xl flex items-center gap-2 font-semibold transition-all hover:scale-105 border border-[#1E5933]/10">
            <Camera className="w-5 h-5 text-[#B5893E]" />
            <span>Ver todas as {images.length} fotos</span>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-5xl bg-black/95 border-none p-0 overflow-hidden text-white flex items-center justify-center">
        <DialogTitle className="sr-only">Galeria de Fotos - {title}</DialogTitle>
        <DialogDescription className="sr-only">
          Visualização em carrossel das fotos do imóvel {title}.
        </DialogDescription>

        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index} className="flex items-center justify-center h-[80vh] relative">
                <Image 
                  src={image} 
                  alt={`${title} - Foto ${index + 1}`} 
                  fill
                  className="object-contain" 
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex left-4 bg-white/10 hover:bg-white/20 border-none text-white h-12 w-12" />
          <CarouselNext className="hidden md:flex right-4 bg-white/10 hover:bg-white/20 border-none text-white h-12 w-12" />
        </Carousel>
      </DialogContent>
    </Dialog>
  )
}