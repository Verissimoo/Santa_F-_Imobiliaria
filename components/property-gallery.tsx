"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ImageIcon, X } from "lucide-react"

interface PropertyGalleryProps {
  images: string[]
  title: string
}

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [isOpen, setIsOpen] = useState(false)
  
  // Imagens da galeria (excluindo a principal que já fica no topo da página)
  const galleryImages = images.slice(1)
  const displayLimit = 3 
  const remainingCount = galleryImages.length - displayLimit

  if (galleryImages.length === 0) return null

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-serif text-[#1E5933] mb-6 border-b pb-2">Galeria de Fotos</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {galleryImages.slice(0, displayLimit).map((image, index) => (
          <div 
            key={index} 
            className="h-32 md:h-48 overflow-hidden rounded-xl shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => setIsOpen(true)}
          >
            <img src={image} alt={`${title} - ${index}`} className="w-full h-full object-cover" />
          </div>
        ))}

        {/* Botão Ver Mais / Última Foto com Blur */}
        {galleryImages.length > displayLimit && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <div className="relative h-32 md:h-48 overflow-hidden rounded-xl shadow-sm cursor-pointer group">
                <img 
                  src={galleryImages[displayLimit]} 
                  alt="Ver mais fotos" 
                  className="w-full h-full object-cover blur-[2px] group-hover:blur-0 transition-all" 
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
                  <ImageIcon className="w-6 h-6 mb-1" />
                  <span className="font-bold">+{remainingCount} fotos</span>
                </div>
              </div>
            </DialogTrigger>
            
            <DialogContent className="max-w-5xl bg-black/95 border-none p-0 overflow-hidden text-white">
              <Carousel className="w-full">
                <CarouselContent>
                  {images.map((image, index) => (
                    <CarouselItem key={index} className="flex items-center justify-center h-[80vh]">
                      <img 
                        src={image} 
                        alt={`${title} - Foto ${index + 1}`} 
                        className="max-h-full max-w-full object-contain" 
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4 bg-white/10 hover:bg-white/20 border-none text-white" />
                <CarouselNext className="right-4 bg-white/10 hover:bg-white/20 border-none text-white" />
              </Carousel>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm font-light">
                {title} — Use as setas para navegar
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}