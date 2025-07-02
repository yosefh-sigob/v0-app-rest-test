import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LicenseProvider } from "@/contexts/license-context"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RestApp - Sistema de Gestión de Restaurantes",
  description: "Sistema completo para la gestión de restaurantes con múltiples funcionalidades",
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
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#fff",
                color: "#000",
                border: "1px solid #e5e7eb",
              },
            }}
          />
        </LicenseProvider>
      </body>
    </html>
  )
}
