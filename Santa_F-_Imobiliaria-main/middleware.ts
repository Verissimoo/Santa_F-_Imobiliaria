import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Nota: Como estamos usando localStorage para esse protótipo simples, 
  // o middleware de servidor tem limitações. 
  // Em produção, usaríamos Cookies.
  
  // Se você quiser uma proteção real por cookies depois, me avise.
  // Por enquanto, o controle será feito via redirecionamento no Login.
  
  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}