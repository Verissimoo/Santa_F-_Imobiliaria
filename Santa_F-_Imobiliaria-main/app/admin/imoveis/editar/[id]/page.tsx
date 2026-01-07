"use client"

import { useEffect, useState, use } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Loader2, Home, MapPin, ImageIcon, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

export default function EditarImovelPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params) 
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [formData, setFormData] = useState<any>(null)

  const propertyTypes = {
    Urbano: ["Casa", "Apartamento", "Lote", "Terreno", "Comercial"],
    Rural: ["Fazenda", "Chácara", "Sítio", "Terreno Rural"]
  }

  useEffect(() => {
    fetch(`/api/properties/${resolvedParams.id}`)
      .then(res => res.json())
      .then(data => {
        setFormData(data)
        setImages(data.images || [])
        setLoading(false)
      })
      .catch(() => toast.error("Erro ao carregar dados do imóvel"))
  }, [resolvedParams.id])

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "")
    const formatted = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(value) / 100)
    setFormData((prev: any) => ({ ...prev, price: formatted }))
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
    setSaving(true)
    try {
      const res = await fetch(`/api/properties/${resolvedParams.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, images }),
      })

      if (res.ok) {
        toast.success("Imóvel atualizado com sucesso!")
        router.push("/admin")
      } else {
        throw new Error()
      }
    } catch {
      toast.error("Erro ao salvar alterações")
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-20 text-center"><Loader2 className="animate-spin mx-auto" /> Carregando...</div>

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-10">
      <header className="sticky top-0 z-50 border-b bg-white p-4 shadow-sm mb-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}><ArrowLeft className="h-5 w-5" /></Button>
            <h1 className="font-serif text-2xl font-bold text-[#1E5933]">Editar Imóvel</h1>
          </div>
          <Button onClick={handleSubmit} disabled={saving} className="bg-[#1E5933] hover:bg-[#1E5933]/90">
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Salvar Alterações
          </Button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Home className="h-5 w-5 text-[#B5893E]" /> Informações Gerais</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título do Anúncio</Label>
                <Input id="title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Zona</Label>
                  <Select value={formData.category} onValueChange={(v) => setFormData({...formData, category: v, tipo: ""})}>
                    <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Urbano">Urbano</SelectItem>
                      <SelectItem value="Rural">Rural</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Tipo</Label>
                  <Select value={formData.tipo} onValueChange={(v) => setFormData({...formData, tipo: v})}>
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
                <Label htmlFor="location">Localização Completa</Label>
                <Input id="location" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} placeholder="Ex: Rua A, Bairro B - Cidade C" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea id="description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={6} required />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader><CardTitle>Preço e Medidas</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="price">Preço</Label>
                <Input id="price" value={formData.price} onChange={handlePriceChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="area">Área</Label>
                <Input id="area" value={formData.area} onChange={e => setFormData({...formData, area: e.target.value})} required />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1"><Label className="text-xs">Quartos</Label><Input type="number" value={formData.bedrooms} onChange={e => setFormData({...formData, bedrooms: e.target.value})} /></div>
                <div className="space-y-1"><Label className="text-xs">Banh.</Label><Input type="number" value={formData.bathrooms} onChange={e => setFormData({...formData, bathrooms: e.target.value})} /></div>
                <div className="space-y-1"><Label className="text-xs">Vagas</Label><Input type="number" value={formData.parking} onChange={e => setFormData({...formData, parking: e.target.value})} /></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><ImageIcon className="h-5 w-5 text-[#B5893E]" /> Fotos</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                {images.map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-lg overflow-hidden border">
                    <img src={img} className="object-cover w-full h-full" alt="Preview" />
                    <button type="button" onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5"><X className="w-3 h-3" /></button>
                  </div>
                ))}
                <button type="button" onClick={() => document.getElementById('file-edit')?.click()} className="aspect-square flex flex-col items-center justify-center border-2 border-dashed rounded-lg hover:bg-muted/50">
                  <Plus className="w-6 h-6 text-[#B5893E]" />
                  <span className="text-[10px] mt-1">Add</span>
                </button>
                <input id="file-edit" type="file" multiple accept="image/*" className="hidden" onChange={(e) => e.target.files && handleFiles(e.target.files)} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}