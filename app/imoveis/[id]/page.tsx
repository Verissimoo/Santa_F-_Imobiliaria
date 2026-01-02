import { Bed, Bath, Car, Maximize, MapPin, Phone, Mail, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const propertyDetails = {
  id: "1",
  title: "Apartamento Moderno em Jardins",
  price: "R$ 850.000",
  location: "Jardins, São Paulo - SP",
  description:
    "Magnífico apartamento localizado em uma das regiões mais nobres de São Paulo. Este imóvel oferece acabamento de alto padrão, ambientes amplos e muito bem distribuídos. Possui uma vista privilegiada e está próximo a restaurantes, shoppings e áreas de lazer. O condomínio oferece completa infraestrutura com academia, piscina, salão de festas e segurança 24 horas.",
  bedrooms: 3,
  bathrooms: 2,
  parking: 2,
  area: 120,
  images: [
    "/luxury-apartment-living-room.png",
    "/modern-kitchen-island.png",
    "/elegant-master-bedroom.jpg",
    "/luxurious-bathroom-marble.jpg",
  ],
  features: [
    "Ar condicionado",
    "Armários embutidos",
    "Varanda gourmet",
    "Piso em porcelanato",
    "Iluminação LED",
    "Sistema de segurança",
  ],
}

export default function PropertyDetailPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Barra de Navegação Interna */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Button variant="ghost" asChild className="text-[#1E5933] hover:bg-[#1E5933]/5">
          <Link href="/imoveis">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para a listagem
          </Link>
        </Button>
      </div>

      {/* Hero / Image Gallery Section */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative h-[300px] md:h-[550px] w-full overflow-hidden rounded-2xl shadow-lg">
            <img
              src={propertyDetails.images[0] || "/placeholder.svg"}
              alt={propertyDetails.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute top-4 left-4 bg-[#1E5933] text-white px-4 py-1 rounded-full text-sm font-medium">
              Venda
            </div>
          </div>
        </div>
      </section>

      {/* Property Info */}
      <section className="pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h1 className="text-3xl md:text-5xl font-serif text-[#1E5933] mb-4 leading-tight">
                  {propertyDetails.title}
                </h1>
                <div className="flex items-center text-gray-500 gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-[#B5893E]" />
                  <span className="text-lg">{propertyDetails.location}</span>
                </div>
                <div className="text-4xl font-bold text-[#1E5933]">{propertyDetails.price}</div>
              </div>

              {/* Icon Features Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 p-6 bg-[#F8F9FA] rounded-xl">
                <div className="flex flex-col items-center text-center gap-2">
                  <Bed className="w-6 h-6 text-[#B5893E]" />
                  <span className="text-sm text-gray-500">Quartos</span>
                  <span className="font-bold text-[#1E5933]">{propertyDetails.bedrooms}</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <Bath className="w-6 h-6 text-[#B5893E]" />
                  <span className="text-sm text-gray-500">Banheiros</span>
                  <span className="font-bold text-[#1E5933]">{propertyDetails.bathrooms}</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <Car className="w-6 h-6 text-[#B5893E]" />
                  <span className="text-sm text-gray-500">Vagas</span>
                  <span className="font-bold text-[#1E5933]">{propertyDetails.parking}</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <Maximize className="w-6 h-6 text-[#B5893E]" />
                  <span className="text-sm text-gray-500">Área</span>
                  <span className="font-bold text-[#1E5933]">{propertyDetails.area} m²</span>
                </div>
              </div>

              {/* Description Section */}
              <div className="mb-10">
                <h2 className="text-2xl font-serif text-[#1E5933] mb-4 border-b pb-2">Descrição do Imóvel</h2>
                <p className="text-gray-600 leading-relaxed text-lg">{propertyDetails.description}</p>
              </div>

              {/* Features List */}
              <div className="mb-10">
                <h2 className="text-2xl font-serif text-[#1E5933] mb-4 border-b pb-2">O que este imóvel oferece</h2>
                <div className="grid grid-cols-2 gap-4">
                  {propertyDetails.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#B5893E]" />
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gallery Grid */}
              <div>
                <h2 className="text-2xl font-serif text-[#1E5933] mb-6 border-b pb-2">Galeria de Fotos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {propertyDetails.images.slice(1).map((image, index) => (
                    <div key={index} className="h-64 overflow-hidden rounded-xl shadow-sm">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${propertyDetails.title} - ${index + 2}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Fixa */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-white rounded-2xl p-8 border-2 border-[#F8F9FA] shadow-xl">
                <h3 className="text-2xl font-serif text-[#1E5933] mb-2">Interessado?</h3>
                <p className="text-gray-500 mb-8">Nossa equipe está pronta para te atender e agendar uma visita.</p>

                <div className="space-y-4 mb-8">
                  <Button asChild className="w-full bg-[#1E5933] hover:bg-[#1E5933]/90 text-white py-6 text-lg rounded-xl shadow-md transition-all active:scale-95">
                    <Link href="tel:5561974036070">
                      <Phone className="w-5 h-5 mr-3" />
                      Ligar Agora
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full border-2 border-[#1E5933] text-[#1E5933] hover:bg-[#1E5933]/5 py-6 text-lg rounded-xl"
                  >
                    <Mail className="w-5 h-5 mr-3" />
                    Enviar E-mail
                  </Button>
                </div>

                <div className="pt-6 border-t border-gray-100 space-y-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone className="w-5 h-5 text-[#B5893E]" />
                    <span>(61) 97403-6070</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Mail className="w-5 h-5 text-[#B5893E]" />
                    <span>contato@santafe.com.br</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <Link
        href="https://wa.me/556298361616?text=Olá! Vi o imóvel Apartamento Moderno em Jardins no site e gostaria de mais informações."
        target="_blank"
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 z-50 animate-bounce"
      >
        <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217s.231.001.332.005c.109.004.258-.041.404.314.159.386.542 1.32.588 1.414.046.094.077.203.014.331-.063.129-.094.209-.188.319-.094.109-.197.244-.282.327-.101.099-.206.207-.089.408.117.201.519.855 1.114 1.385.767.682 1.411.894 1.613.993.201.1.319.083.438-.054.119-.137.513-.598.65-.802.136-.203.272-.17.459-.101.188.07.1.188 1.184.613.094.047.156.07.21.156.054.086.054.499-.09.904z" />
        </svg>
      </Link>
    </div>
  )
}