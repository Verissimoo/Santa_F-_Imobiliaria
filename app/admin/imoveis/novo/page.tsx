"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Home, MapPin, ImageIcon, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function NovoImovelPage() {
  const router = useRouter()
  const [images, setImages] = useState<string[]>([])
  const [dragActive, setDragActive] = useState(false)

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("[v0] Form submitted")
  }

  const handleDiscard = () => {
    if (confirm("Tem certeza que deseja descartar as alterações?")) {
      router.back()
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Fixed Header */}
      <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="font-serif text-2xl font-semibold text-foreground">Cadastrar Novo Imóvel</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleDiscard}>
              Descartar
            </Button>
            <Button onClick={handleSubmit} className="bg-[#1E5933] hover:bg-[#1E5933]/90">
              <Save className="mr-2 h-4 w-4" />
              Salvar Imóvel
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <form onSubmit={handleSubmit} className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Main Information */}
          <div className="space-y-8 lg:col-span-2">
            {/* General Information Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-[#B5893E]" />
                  <CardTitle className="font-serif">Informações Gerais</CardTitle>
                </div>
                <CardDescription>Dados básicos do imóvel</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="titulo">Título do Anúncio</Label>
                  <Input id="titulo" placeholder="Ex: Apartamento de 3 quartos no Jardim Paulista" required />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="finalidade">Finalidade</Label>
                    <Select required>
                      <SelectTrigger id="finalidade">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="venda">Venda</SelectItem>
                        <SelectItem value="locacao">Locação</SelectItem>
                        <SelectItem value="ambos">Venda e Locação</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tipo">Tipo de Imóvel</Label>
                    <Select required>
                      <SelectTrigger id="tipo">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartamento">Apartamento</SelectItem>
                        <SelectItem value="casa">Casa</SelectItem>
                        <SelectItem value="cobertura">Cobertura</SelectItem>
                        <SelectItem value="terreno">Terreno</SelectItem>
                        <SelectItem value="comercial">Comercial</SelectItem>
                        <SelectItem value="rural">Rural</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição Completa</Label>
                  <Textarea
                    id="descricao"
                    placeholder="Descreva detalhadamente o imóvel, suas características, diferenciais e comodidades..."
                    className="min-h-[200px]"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Location Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-[#B5893E]" />
                  <CardTitle className="font-serif">Localização</CardTitle>
                </div>
                <CardDescription>Endereço do imóvel</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="cidade">Cidade</Label>
                    <Input id="cidade" placeholder="Ex: São Paulo" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bairro">Bairro</Label>
                    <Input id="bairro" placeholder="Ex: Jardim Paulista" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endereco">Endereço Completo</Label>
                  <Input id="endereco" placeholder="Ex: Rua Augusta, 2000" required />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Price and Measurements Card */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Preço e Medidas</CardTitle>
                <CardDescription>Valores e especificações</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="preco">Preço</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">R$</span>
                    <Input id="preco" type="text" placeholder="0,00" className="pl-10" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="area">Área (m²)</Label>
                  <Input id="area" type="number" placeholder="0" min="0" required />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="quartos" className="text-xs">
                      Quartos
                    </Label>
                    <Input id="quartos" type="number" placeholder="0" min="0" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="banheiros" className="text-xs">
                      Banheiros
                    </Label>
                    <Input id="banheiros" type="number" placeholder="0" min="0" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vagas" className="text-xs">
                      Vagas
                    </Label>
                    <Input id="vagas" type="number" placeholder="0" min="0" required />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Photos Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-[#B5893E]" />
                  <CardTitle className="font-serif">Fotos</CardTitle>
                </div>
                <CardDescription>Upload de imagens do imóvel</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div
                  className={`relative flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
                    dragActive
                      ? "border-[#1E5933] bg-[#1E5933]/5"
                      : "border-border bg-muted/20 hover:border-[#B5893E] hover:bg-muted/40"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById("file-upload")?.click()}
                >
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files && handleFiles(e.target.files)}
                  />
                  <div className="flex flex-col items-center gap-2 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#B5893E]/10">
                      <Plus className="h-6 w-6 text-[#B5893E]" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Adicionar fotos</p>
                      <p className="text-xs text-muted-foreground">Arraste ou clique para fazer upload</p>
                    </div>
                  </div>
                </div>

                {/* Image Thumbnails Grid */}
                {images.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {images.map((image, index) => (
                      <div key={index} className="group relative aspect-square overflow-hidden rounded-lg">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Upload ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeImage(index)
                          }}
                          className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100"
                        >
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
