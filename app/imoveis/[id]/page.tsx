import { Bed, Bath, Droplets, Maximize, MapPin, Phone, Mail, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { prisma } from "@/lib/prisma" 
import { notFound } from "next/navigation"
import { PropertyMainImage } from "@/components/property-main-image"

export default async function PropertyDetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const property = await prisma.property.findUnique({
    where: { id: id }
  });

  if (!property) return notFound();

  // Consultor Dinâmico
  const cName = property.consultantName || "Rose Boaro";
  const cPhone = property.consultantPhone || "556283469699";

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(property.price.replace(/\D/g, "")) || 0);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Button variant="ghost" asChild className="text-[#1E5933] hover:bg-[#1E5933]/5 font-medium">
          <Link href="/imoveis">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para a listagem
          </Link>
        </Button>
      </div>

      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            
            <div className="lg:col-span-2 space-y-10">
              <PropertyMainImage 
                images={property.images} 
                title={property.title} 
                tipo={property.tipo} 
              />

              <div>
                <h1 className="text-3xl md:text-5xl font-serif text-[#1E5933] mb-3 leading-tight">
                  {property.title}
                </h1>
                <div className="flex items-center text-gray-500 gap-2">
                  <MapPin className="w-5 h-5 text-[#B5893E]" />
                  <span className="text-lg">{property.location}</span>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-100">
                <h2 className="text-2xl font-serif text-[#1E5933] mb-6">Sobre o Imóvel</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                  {property.description.split('\n').map((line, index) => {
                    if (line.trim().startsWith('-') || line.trim().startsWith('*')) {
                      return (
                        <div key={index} className="flex items-start gap-3 pl-2">
                          <span className="text-[#B5893E] mt-1.5">•</span>
                          <span>{line.replace(/^[-*]\s*/, '')}</span>
                        </div>
                      );
                    }
                    if (!line.trim()) return null;
                    return <p key={index}>{line}</p>;
                  })}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
                  
                  <div className="mb-8 p-6 bg-[#1E5933]/5 rounded-2xl text-center">
                    <span className="text-sm text-gray-500 uppercase tracking-widest block mb-1">Valor de Venda</span>
                    <div className="text-4xl font-bold text-[#1E5933]">{formattedPrice}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-10">
                    <div className="flex items-center gap-3 p-4 bg-[#F8F9FA] rounded-2xl">
                      <Bed className="w-5 h-5 text-[#B5893E]" />
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 uppercase font-bold">Quartos</span>
                        <span className="font-bold text-[#1E5933]">{property.bedrooms}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-[#F8F9FA] rounded-2xl">
                      <Bath className="w-5 h-5 text-[#B5893E]" />
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 uppercase font-bold">Banh.</span>
                        <span className="font-bold text-[#1E5933]">{property.bathrooms}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-[#F8F9FA] rounded-2xl">
                      <Droplets className="w-5 h-5 text-[#B5893E]" />
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 uppercase font-bold">Nascentes</span>
                        <span className="font-bold text-[#1E5933]">{property.waterSources}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-[#F8F9FA] rounded-2xl">
                      <Maximize className="w-5 h-5 text-[#B5893E]" />
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 uppercase font-bold">Área</span>
                        <span className="font-bold text-[#1E5933]">{property.area} m²</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Button asChild className="w-full bg-[#1E5933] hover:bg-[#1E5933]/90 text-white py-7 text-lg rounded-2xl shadow-lg transition-all active:scale-95">
                      <Link href={`tel:${cPhone}`}>
                        <Phone className="w-5 h-5 mr-3" />
                        Ligar para {cName.split(' ')[0]}
                      </Link>
                    </Button>

                    <Button variant="outline" className="w-full border-2 border-[#1E5933] text-[#1E5933] hover:bg-[#1E5933]/5 py-7 text-lg rounded-2xl" asChild>
                      <Link href={`mailto:gestaoimobsantafe@gmail.com?subject=Interesse no imóvel: ${property.title}`}>
                        <Mail className="w-5 h-5 mr-3" />
                        Enviar E-mail
                      </Link>
                    </Button>
                  </div>

                  <div className="mt-8 pt-8 border-t border-gray-100 space-y-3">
                    <div className="flex flex-col items-center gap-2 text-sm text-gray-500">
                      <span className="font-bold text-[#1E5933] text-base">{cName}</span>
                      <span className="flex items-center gap-1 font-medium"><Phone className="w-3 h-3" /> {cPhone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Link
        href={`https://wa.me/${cPhone}?text=Olá ${cName}! Vi o imóvel "${property.title}" no site e gostaria de agendar uma visita.`}
        target="_blank"
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 z-50 hover:rotate-6"
      >
        <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217s.231.001.332.005c.109.004.258-.041.404.314.159.386.542 1.32.588 1.414.046.094.077.203.014.331-.063.129-.094.209-.188.319-.094.109-.197.244-.282.327-.101.099-.206.207-.089.408.117.201.519.855 1.114 1.385.767.682 1.411.894 1.613.993.201.1.319.083.438-.054.119-.137.513-.598.65-.802.136-.203.272-.17.459-.101.188.07.1.188 1.184.613.094.047.156.07.21.156.054.086.054.499-.09.904z" />
        </svg>
      </Link>
    </div>
  )
}