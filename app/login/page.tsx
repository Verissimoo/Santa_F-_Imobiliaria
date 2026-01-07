"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Verificação de credenciais
    if (user === "admin" && password === "santafe123") {
      
      // 1. SALVAR O TOKEN: Sincronizado com a chave 'auth_token' utilizada na Navbar
      localStorage.setItem("auth_token", "true")
      
      toast({ 
        title: "Bem-vindo!", 
        description: "Login realizado com sucesso." 
      })

      // 2. REDIRECIONAMENTO: Agora abre diretamente a lista geral de imóveis no Admin
      router.push("/admin")
      
    } else {
      toast({ 
        variant: "destructive", 
        title: "Erro", 
        description: "Usuário ou senha incorretos." 
      })
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-serif">Acesso Administrativo</CardTitle>
          <CardDescription>Entre com suas credenciais para gerenciar imóveis</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Usuário</label>
              <Input 
                value={user} 
                onChange={(e) => setUser(e.target.value)} 
                placeholder="nome de usuário" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Senha</label>
              <Input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••" 
              />
            </div>
            <Button type="submit" className="w-full bg-[#1E5933] hover:bg-[#1E5933]/90">
              Entrar no Painel
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}