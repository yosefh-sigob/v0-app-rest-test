"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type LicenseType = "Gratis" | "Lite" | "Pro" | "Franquicia"

interface LicenseContextType {
  currentLicense: LicenseType
  setLicense: (license: LicenseType) => void
}

const LicenseContext = createContext<LicenseContextType | undefined>(undefined)

export function LicenseProvider({ children }: { children: ReactNode }) {
  const [currentLicense, setCurrentLicense] = useState<LicenseType>("Gratis")

  // Cargar licencia desde localStorage al inicializar
  useEffect(() => {
    const savedLicense = localStorage.getItem("restaurant-license") as LicenseType
    if (savedLicense && ["Gratis", "Lite", "Pro", "Franquicia"].includes(savedLicense)) {
      setCurrentLicense(savedLicense)
    }
  }, [])

  const setLicense = (license: LicenseType) => {
    setCurrentLicense(license)
    localStorage.setItem("restaurant-license", license)
  }

  return <LicenseContext.Provider value={{ currentLicense, setLicense }}>{children}</LicenseContext.Provider>
}

export function useLicense() {
  const context = useContext(LicenseContext)
  if (context === undefined) {
    throw new Error("useLicense must be used within a LicenseProvider")
  }
  return context
}
