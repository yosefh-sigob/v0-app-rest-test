"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { NivelLicencia } from "@/interfaces/database"

interface LicenseContextType {
  currentLicense: NivelLicencia
  setLicense: (license: NivelLicencia) => void
  hasFeature: (feature: string) => boolean
}

const LicenseContext = createContext<LicenseContextType | undefined>(undefined)

// Definición de características por licencia
const FEATURE_REQUIREMENTS = {
  // Funcionalidades básicas (Gratis)
  gestionProductos: NivelLicencia.GRATIS,
  ventaComedor: NivelLicencia.GRATIS,

  // Funcionalidades Lite
  ventaMostrador: NivelLicencia.LITE,
  ventaDomicilio: NivelLicencia.LITE,
  menuDigital: NivelLicencia.LITE,
  reportesBasicos: NivelLicencia.LITE,

  // Funcionalidades Pro
  reportesAvanzados: NivelLicencia.PRO,
  controlInventario: NivelLicencia.PRO,
  integracionesAPI: NivelLicencia.PRO,
  campanaSMS: NivelLicencia.PRO,
  programaLealtad: NivelLicencia.PRO,

  // Funcionalidades Franquicia
  multiSucursal: NivelLicencia.FRANQUICIA,
  reportesCorporativos: NivelLicencia.FRANQUICIA,
  dashboardCentralizado: NivelLicencia.FRANQUICIA,
}

interface LicenseProviderProps {
  children: ReactNode
}

export function LicenseProvider({ children }: LicenseProviderProps) {
  const [currentLicense, setCurrentLicense] = useState<NivelLicencia>(NivelLicencia.GRATIS)

  // Cargar licencia desde localStorage al inicializar
  useEffect(() => {
    const savedLicense = localStorage.getItem("demo-license")
    if (savedLicense && Object.values(NivelLicencia).includes(savedLicense as NivelLicencia)) {
      setCurrentLicense(savedLicense as NivelLicencia)
    }
  }, [])

  // Guardar licencia en localStorage cuando cambie
  const setLicense = (license: NivelLicencia) => {
    setCurrentLicense(license)
    localStorage.setItem("demo-license", license)
  }

  // Verificar si tiene acceso a una característica
  const hasFeature = (feature: string): boolean => {
    const requiredLicense = FEATURE_REQUIREMENTS[feature as keyof typeof FEATURE_REQUIREMENTS]
    if (!requiredLicense) return true // Si no está definida, permitir acceso

    const licenseOrder = {
      [NivelLicencia.GRATIS]: 0,
      [NivelLicencia.LITE]: 1,
      [NivelLicencia.PRO]: 2,
      [NivelLicencia.FRANQUICIA]: 3,
    }

    return licenseOrder[currentLicense] >= licenseOrder[requiredLicense]
  }

  const value: LicenseContextType = {
    currentLicense,
    setLicense,
    hasFeature,
  }

  return <LicenseContext.Provider value={value}>{children}</LicenseContext.Provider>
}

export function useLicense() {
  const context = useContext(LicenseContext)
  if (context === undefined) {
    throw new Error("useLicense must be used within a LicenseProvider")
  }
  return context
}
