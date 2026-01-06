"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Home, MapPin, ImageIcon, Plus, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function NovoImovelPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [dragActive, setDragActive] = useState(false)

  // Estado atualizado: removeu finalidade, adicionou category
  const [formData, setFormData] = useState({
    title: "",
    category: "", 
    tipo: "",
    description: "",
    cidade: "",
    bairro: "",
    endereco: "",
    price: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    parking: "",
  })

  // Mapeamento de Tipos por Categoria
  const propertyTypes = {
    Urbano: ["Casa", "Apartamento", "Lote", "Terreno", "Comercial"],
    Rural: ["Fazenda", "Chácara", "Sítio", "Terreno Rural"]
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => {
      // Se mudar a categoria, limpa o tipo para evitar inconsistência
      if (name === "category") {
        return { ...prev, [name]: value, tipo: "" }
      }
      return { ...prev, [name]: value }
    })
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFiles = (files: FileList) => {
    const fileArray = Array.from(files)
    fileArray.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setImages((prev) => [...prev, e.target!.result as string])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          location: `${formData.endereco}, ${formData.bairro} - ${formData.cidade}`,
          images: images,
        }),
      })

      if (!response.ok) throw new Error("Erro ao salvar")

      toast({
        title: "Sucesso!",
        description: "Imóvel cadastrado com sucesso.",
      })
      
      router.push("/imoveis")
    } catch (error) {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível salvar o imóvel. Tente novamente.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="font-serif text-2xl font-semibold text-foreground">Cadastrar Novo Imóvel</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => router.back()} disabled={loading}>
              Descartar
            </Button>
            <Button onClick={handleSubmit} disabled={loading} className="bg-[#1E5933] hover:bg-[#1E5933]/90">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Salvar Imóvel
            </Button>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-[#B5893E]" />
                  <CardTitle className="font-serif">Informações Gerais</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título do Anúncio</Label>
                  <Input id="title" value={formData.title} onChange={handleChange} placeholder="Ex: Fazenda Santa Maria" required />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* CATEGORIA (Zona) */}
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria (Zona)</Label>
                    <Select onValueChange={(v) => handleSelectChange("category", v)} required>
                      <SelectTrigger id="category"><SelectValue placeholder="Selecione" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Urbano">Urbano</SelectItem>
                        <SelectItem value="Rural">Rural</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* TIPO (Dinâmico) */}
                  <div className="space-y-2">
                    <Label htmlFor="tipo">Tipo de Imóvel</Label>
                    <Select onValueChange={(v) => handleSelectChange("tipo", v)} required disabled={!formData.category}>
                      <SelectTrigger id="tipo"><SelectValue placeholder="Selecione" /></SelectTrigger>
                      <SelectContent>
                         {formData.category && propertyTypes[formData.category as keyof typeof propertyTypes].map(type => (
                           <SelectItem key={type} value={type}>{type}</SelectItem>
                         ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição Completa</Label>
                  <Textarea id="description" value={formData.description} onChange={handleChange} className="min-h-[200px]" required />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-[#B5893E]" />
                  <CardTitle className="font-serif">Localização</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="cidade">Cidade</Label>
                    <Input id="cidade" value={formData.cidade} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bairro">Bairro / Região</Label>
                    <Input id="bairro" value={formData.bairro} onChange={handleChange} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endereco">Endereço Completo</Label>
                  <Input id="endereco" value={formData.endereco} onChange={handleChange} required />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Preço e Medidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Preço</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">R$</span>
                    <Input id="price" value={formData.price} onChange={handleChange} className="pl-10" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="area">Área (m² ou ha)</Label>
                  <Input id="area" type="number" value={formData.area} onChange={handleChange} required />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="bedrooms" className="text-xs">Quartos</Label>
                    <Input id="bedrooms" type="number" value={formData.bedrooms} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bathrooms" className="text-xs">Banheiros</Label>
                    <Input id="bathrooms" type="number" value={formData.bathrooms} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parking" className="text-xs">Vagas</Label>
                    <Input id="parking" type="number" value={formData.parking} onChange={handleChange} required />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-[#B5893E]" />
                  <CardTitle className="font-serif">Fotos</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div
                  className={`relative flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
                    dragActive ? "border-[#1E5933] bg-[#1E5933]/5" : "border-border bg-muted/20 hover:border-[#B5893E]"
                  }`}
                  onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
                  onClick={() => document.getElementById("file-upload")?.click()}
                >
                  <input id="file-upload" type="file" multiple accept="image/*" className="hidden" onChange={(e) => e.target.files && handleFiles(e.target.files)} />
                  <div className="flex flex-col items-center gap-2 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#B5893E]/10">
                      <Plus className="h-6 w-6 text-[#B5893E]" />
                    </div>
                    <p className="text-sm font-medium">Adicionar fotos</p>
                  </div>
                </div>

                {images.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {images.map((image, index) => (
                      <div key={index} className="group relative aspect-square overflow-hidden rounded-lg">
                        <img src={image} alt={`Upload ${index + 1}`} className="h-full w-full object-cover" />
                        <button type="button" onClick={(e) => { e.stopPropagation(); removeImage(index); }} className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
