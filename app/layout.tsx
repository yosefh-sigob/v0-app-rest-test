import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LicenseProvider } from "@/contexts/license-context"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RestApp - Sistema de Gestión para Restaurantes",
  description: "Sistema completo de gestión para restaurantes con múltiples módulos",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <LicenseProvider>
          {children}
          <Toaster />
        </LicenseProvider>
      </body>
    </html>
  )
}
