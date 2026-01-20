"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Home, MapPin, ImageIcon, Plus, X, Loader2, UserCircle } from "lucide-react"
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

  const consultants = [
    { name: "Rose Boaro", phone: "556283469699" },
    { name: "Cicero Ceffaz", phone: "556298361616" }
  ]

  const [formData, setFormData] = useState({
    title: "",
    category: "", 
    tipo: "",
    description: "",
    estado: "GO",
    cidade: "",
    endereco: "",
    price: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    consultantName: "Rose Boaro",
    consultantPhone: "556283469699",
  })

  const propertyTypes = {
    Urbano: ["Casa", "Apartamento", "Lote", "Terreno", "Comercial"],
    Rural: ["Fazenda", "Chácara", "Sítio", "Terreno Rural"]
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    if (id === "price") {
      const cleanValue = value.replace(/\D/g, "")
      setFormData((prev) => ({ ...prev, [id]: cleanValue }))
      return
    }
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => {
      if (name === "category") return { ...prev, [name]: value, tipo: "" }
      return { ...prev, [name]: value }
    })
  }

  const handleConsultantChange = (name: string) => {
    const selected = consultants.find(c => c.name === name)
    if (selected) {
      setFormData(prev => ({ ...prev, consultantName: selected.name, consultantPhone: selected.phone }))
    }
  }

  const handleFiles = (files: FileList) => {
    const fileArray = Array.from(files)
    fileArray.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) setImages((prev) => [...prev, e.target!.result as string])
      }
      reader.readAsDataURL(file)
    })
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
          location: `${formData.endereco}, ${formData.cidade} - ${formData.estado}`,
          images: images,
        }),
      })

      if (!response.ok) throw new Error("Erro ao salvar")
      toast({ title: "Sucesso!", description: "Imóvel cadastrado com sucesso." })
      router.push("/admin")
    } catch (error) {
      toast({ variant: "destructive", title: "Erro", description: "Erro ao salvar." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}><ArrowLeft className="h-5 w-5" /></Button>
            <h1 className="font-serif text-2xl font-semibold text-[#1E5933]">Cadastrar Novo Imóvel</h1>
          </div>
          <Button onClick={handleSubmit} disabled={loading} className="bg-[#1E5933] hover:bg-[#1E5933]/90">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Salvar Imóvel
          </Button>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="mx-auto max-w-7xl px-4 py-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <Card>
            <CardHeader><CardTitle className="font-serif flex items-center gap-2"><Home className="h-5 w-5 text-[#B5893E]" /> Geral</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input id="title" value={formData.title} onChange={handleChange} required />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Zona</Label>
                  <Select onValueChange={(v) => handleSelectChange("category", v)} required>
                    <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                    <SelectContent><SelectItem value="Urbano">Urbano</SelectItem><SelectItem value="Rural">Rural</SelectItem></SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Tipo</Label>
                  <Select onValueChange={(v) => handleSelectChange("tipo", v)} required disabled={!formData.category}>
                    <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                    <SelectContent>
                       {formData.category && propertyTypes[formData.category as keyof typeof propertyTypes].map(type => (
                         <SelectItem key={type} value={type}>{type}</SelectItem>
                       ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea id="description" value={formData.description} onChange={handleChange} className="min-h-[200px]" required />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="font-serif flex items-center gap-2"><MapPin className="h-5 w-5 text-[#B5893E]" /> Localização</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Estado (UF)</Label>
                  <Select defaultValue="GO" onValueChange={(v) => setFormData({...formData, estado: v})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GO">Goiás (GO)</SelectItem>
                      <SelectItem value="DF">Distrito Federal (DF)</SelectItem>
                      <SelectItem value="MT">Mato Grosso (MT)</SelectItem>
                      <SelectItem value="MS">Mato Grosso do Sul (MS)</SelectItem>
                      <SelectItem value="TO">Tocantins (TO)</SelectItem>
                      <SelectItem value="BA">Bahia (BA)</SelectItem>
                      <SelectItem value="MG">Minas Gerais (MG)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cidade">Cidade / Município</Label>
                  <Input id="cidade" value={formData.cidade} onChange={handleChange} required placeholder="Ex: Pirenópolis" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="endereco">Endereço / Logradouro / Nome da Fazenda</Label>
                <Input id="endereco" value={formData.endereco} onChange={handleChange} required />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader><CardTitle className="font-serif flex items-center gap-2"><UserCircle className="h-5 w-5 text-[#B5893E]" /> Consultor</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Responsável pelo Atendimento</Label>
                <Select onValueChange={handleConsultantChange} defaultValue="Rose Boaro">
                  <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    {consultants.map(c => <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <p className="text-[10px] text-[#1E5933] font-bold uppercase tracking-wider">WhatsApp: {formData.consultantPhone}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="font-serif">Preço e Medidas</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="price">Preço (Apenas números)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">R$</span>
                  <Input id="price" value={formData.price} onChange={handleChange} className="pl-10" required />
                </div>
                <p className="text-[10px] text-[#1E5933] font-bold">
                  Confirmação: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(Number(formData.price) || 0)}
                </p>
              </div>
              <div className="space-y-2"><Label htmlFor="area">Área Total (m²)</Label><Input id="area" type="number" value={formData.area} onChange={handleChange} required /></div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1"><Label className="text-[10px]">Quartos</Label><Input id="bedrooms" type="number" value={formData.bedrooms} onChange={handleChange} /></div>
                <div className="space-y-1"><Label className="text-[10px]">Banh.</Label><Input id="bathrooms" type="number" value={formData.bathrooms} onChange={handleChange} /></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="font-serif flex items-center gap-2"><ImageIcon className="h-5 w-5 text-[#B5893E]" /> Fotos</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                {images.map((image, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden border">
                    <img src={image} className="h-full w-full object-cover" />
                    <button type="button" onClick={() => setImages(prev => prev.filter((_, i) => i !== index))} className="absolute right-1 top-1 bg-red-500 text-white rounded-full p-0.5"><X className="h-3 w-3" /></button>
                  </div>
                ))}
                <button type="button" onClick={() => document.getElementById("file-upload")?.click()} className="aspect-square flex flex-col items-center justify-center border-2 border-dashed rounded-lg hover:bg-muted/50"><Plus className="h-6 w-6 text-[#B5893E]" /></button>
                <input id="file-upload" type="file" multiple accept="image/*" className="hidden" onChange={(e) => e.target.files && handleFiles(e.target.files)} />
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}