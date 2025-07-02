import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { LicenseProvider } from "@/contexts/license-context"

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "RestApp - Sistema de Gestión para Restaurantes",
  description: "Sistema completo de gestión para restaurantes con POS, inventario y reportes",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${geist.variable} ${geistMono.variable} antialiased`}>
        <LicenseProvider>
          {children}
          <Toaster />
        </LicenseProvider>
      </body>
    </html>
  )
}
