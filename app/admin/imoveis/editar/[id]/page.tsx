"use client"

import { useEffect, useState, use } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

export default function EditarImovelPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  // CORREÇÃO NEXT 16: Desembrulha a promise do params
  const resolvedParams = use(params) 
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<any>(null)

  // Busca os dados atuais do imóvel
  useEffect(() => {
    fetch(`/api/properties/${resolvedParams.id}`)
      .then(res => res.json())
      .then(data => {
        setFormData(data)
        setLoading(false)
      })
      .catch(() => toast.error("Erro ao carrerar dados"))
  }, [resolvedParams.id])

  // Função para o Preço com R$ Automático
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "")
    const formatted = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(value) / 100)
    setFormData((prev: any) => ({ ...prev, price: formatted }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch(`/api/properties/${resolvedParams.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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
    <div className="p-8 max-w-4xl mx-auto">
      <header className="flex items-center gap-4 mb-8">
        <Button variant="ghost" onClick={() => router.back()}><ArrowLeft className="h-5 w-5" /></Button>
        <h1 className="text-2xl font-serif font-bold text-[#1E5933]">Editar Imóvel</h1>
      </header>

      <form onSubmit={handleSubmit} className="grid gap-6 bg-white p-6 rounded-xl border shadow-sm">
        <div className="space-y-2">
          <Label htmlFor="title">Título do Anúncio</Label>
          <Input id="title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Preço</Label>
            <Input id="price" value={formData.price} onChange={handlePriceChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="area">Área</Label>
            <Input id="area" type="number" value={formData.area} onChange={e => setFormData({...formData, area: e.target.value})} required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea id="description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={6} required />
        </div>

        <Button type="submit" disabled={saving} className="bg-[#1E5933] w-full md:w-auto ml-auto">
          {saving ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />}
          Salvar Alterações
        </Button>
      </form>
    </div>
  )
}