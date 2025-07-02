"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { NivelLicencia } from "@/interfaces/database"

interface LicenseContextType {
  currentLicense: NivelLicencia
  setLicense: (license: NivelLicencia) => void
  hasFeature: (feature: string) => boolean
}

const LicenseContext = createContext<LicenseContextType | undefined>(undefined)

interface LicenseProviderProps {
  children: ReactNode
  defaultLicense?: NivelLicencia
}

// Definir qué features están disponibles en cada licencia
const LICENSE_FEATURES = {
  [NivelLicencia.GRATIS]: ["gestionProductos", "ventaComedor"],
  [NivelLicencia.LITE]: [
    "gestionProductos",
    "ventaComedor",
    "ventaMostrador",
    "ventaDomicilio",
    "menuDigital",
    "reportesBasicos",
  ],
  [NivelLicencia.PRO]: [
    "gestionProductos",
    "ventaComedor",
    "ventaMostrador",
    "ventaDomicilio",
    "menuDigital",
    "reportesBasicos",
    "reportesAvanzados",
    "controlInventario",
    "integracionesAPI",
    "campanaSMS",
    "programaLealtad",
  ],
  [NivelLicencia.FRANQUICIA]: [
    "gestionProductos",
    "ventaComedor",
    "ventaMostrador",
    "ventaDomicilio",
    "menuDigital",
    "reportesBasicos",
    "reportesAvanzados",
    "controlInventario",
    "integracionesAPI",
    "campanaSMS",
    "programaLealtad",
    "multiSucursal",
    "reportesCorporativos",
    "dashboardCentralizado",
  ],
}

export function LicenseProvider({ children, defaultLicense = NivelLicencia.GRATIS }: LicenseProviderProps) {
  const [currentLicense, setCurrentLicense] = useState<NivelLicencia>(defaultLicense)

  // Cargar licencia desde localStorage al inicializar
  useEffect(() => {
    const savedLicense = localStorage.getItem("demo-license")
    if (savedLicense && Object.values(NivelLicencia).includes(savedLicense as NivelLicencia)) {
      setCurrentLicense(savedLicense as NivelLicencia)
    }
  }, [])

  const setLicense = (license: NivelLicencia) => {
    setCurrentLicense(license)
    localStorage.setItem("demo-license", license)
  }

  const hasFeature = (feature: string): boolean => {
    return LICENSE_FEATURES[currentLicense]?.includes(feature) || false
  }

  return (
    <LicenseContext.Provider value={{ currentLicense, setLicense, hasFeature }}>{children}</LicenseContext.Provider>
  )
}

export function useLicense() {
  const context = useContext(LicenseContext)
  if (context === undefined) {
    throw new Error("useLicense must be used within a LicenseProvider")
  }
  return context
}
