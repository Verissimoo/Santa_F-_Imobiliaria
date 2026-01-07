// lib/prisma.ts
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error("A variável de ambiente DATABASE_URL não foi definida no Vercel.")
}

// Configura o pool com suporte a SSL para o banco online
const pool = new Pool({ 
  connectionString,
  ssl: {
    rejectUnauthorized: false // Necessário para Supabase/Neon no Vercel
  }
})

const adapter = new PrismaPg(pool)

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma