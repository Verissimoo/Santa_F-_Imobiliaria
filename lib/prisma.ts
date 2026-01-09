// lib/prisma.ts
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error("A variável DATABASE_URL não foi encontrada no arquivo .env")
}

// Usamos o Pool da biblioteca 'pg' que já está no seu package.json
const pool = new Pool({ 
  connectionString,
  ssl: {
    // Essencial para evitar o erro de certificado no Supabase
    rejectUnauthorized: false 
  }
})

const adapter = new PrismaPg(pool)

const globalForPrisma = global as unknown as { prisma: PrismaClient }

// Passamos o adaptador explicitamente para o Prisma 7
export const prisma =
  globalForPrisma.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma