"use client"

import type { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lock, Crown, Zap, Building } from "lucide-react"
import { NivelLicencia } from "@/interfaces/database"

interface LicenseGuardProps {
  children: ReactNode
  currentLicense: NivelLicencia
  requiredFeature: string
  requiredLicense?: NivelLicencia
}

const licenseFeatures = {
  [NivelLicencia.GRATIS]: {
    ventaComedor: false,
    ventaMostrador: false,
    ventaDomicilio: false,
    reservaciones: false,
    encuestas: false,
    reportes: false,
    productos: 10,
    mesas: 5,
    usuarios: 1,
  },
  [NivelLicencia.LITE]: {
    ventaComedor: true,
    ventaMostrador: true,
    ventaDomicilio: false,
    reservaciones: true,
    encuestas: false,
    reportes: true,
    productos: 50,
    mesas: 15,
    usuarios: 3,
  },
  [NivelLicencia.PRO]: {
    ventaComedor: true,
    ventaMostrador: true,
    ventaDomicilio: true,
    reservaciones: true,
    encuestas: true,
    reportes: true,
    productos: 200,
    mesas: 50,
    usuarios: 10,
  },
  [NivelLicencia.FRANQUICIA]: {
    ventaComedor: true,
    ventaMostrador: true,
    ventaDomicilio: true,
    reservaciones: true,
    encuestas: true,
    reportes: true,
    productos: -1, // Ilimitado
    mesas: -1, // Ilimitado
    usuarios: -1, // Ilimitado
  },
}

const licenseInfo = {
  [NivelLicencia.GRATIS]: {
    name: "Gratis",
    icon: Lock,
    color: "bg-gray-100 text-gray-600",
    description: "Plan básico gratuito",
  },
  [NivelLicencia.LITE]: {
    name: "Lite",
    icon: Zap,
    color: "bg-blue-100 text-blue-600",
    description: "Plan para pequeños restaurantes",
  },
  [NivelLicencia.PRO]: {
    name: "Pro",
    icon: Crown,
    color: "bg-purple-100 text-purple-600",
    description: "Plan profesional completo",
  },
  [NivelLicencia.FRANQUICIA]: {
    name: "Franquicia",
    icon: Building,
    color: "bg-gold-100 text-gold-600",
    description: "Plan para cadenas de restaurantes",
  },
}

export function LicenseGuard({ children, currentLicense, requiredFeature, requiredLicense }: LicenseGuardProps) {
  const currentFeatures = licenseFeatures[currentLicense]
  const hasAccess = currentFeatures[requiredFeature as keyof typeof currentFeatures]

  // Si se especifica una licencia requerida, verificar el nivel
  if (requiredLicense) {
    const licenseOrder = [NivelLicencia.GRATIS, NivelLicencia.LITE, NivelLicencia.PRO, NivelLicencia.FRANQUICIA]
    const currentIndex = licenseOrder.indexOf(currentLicense)
    const requiredIndex = licenseOrder.indexOf(requiredLicense)

    if (currentIndex < requiredIndex) {
      return <LicenseUpgradePrompt currentLicense={currentLicense} requiredLicense={requiredLicense} />
    }
  }

  // Si no tiene acceso a la característica específica
  if (!hasAccess) {
    return <FeatureRestrictedPrompt currentLicense={currentLicense} requiredFeature={requiredFeature} />
  }

  return <>{children}</>
}

function LicenseUpgradePrompt({
  currentLicense,
  requiredLicense,
}: {
  currentLicense: NivelLicencia
  requiredLicense: NivelLicencia
}) {
  const requiredInfo = licenseInfo[requiredLicense]
  const RequiredIcon = requiredInfo.icon

  return (
    <Card className="border-dashed">
      <CardHeader className="text-center">
        <div className={`mx-auto w-12 h-12 rounded-full ${requiredInfo.color} flex items-center justify-center mb-2`}>
          <RequiredIcon className="w-6 h-6" />
        </div>
        <CardTitle className="text-lg">Actualización Requerida</CardTitle>
        <CardDescription>
          Esta funcionalidad requiere el plan <strong>{requiredInfo.name}</strong>
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="flex justify-center space-x-2">
          <Badge variant="outline">{licenseInfo[currentLicense].name}</Badge>
          <span>→</span>
          <Badge className={requiredInfo.color}>{requiredInfo.name}</Badge>
        </div>
        <Button className="w-full">Actualizar Plan</Button>
      </CardContent>
    </Card>
  )
}

function FeatureRestrictedPrompt({
  currentLicense,
  requiredFeature,
}: {
  currentLicense: NivelLicencia
  requiredFeature: string
}) {
  const currentInfo = licenseInfo[currentLicense]
  const CurrentIcon = currentInfo.icon

  const featureNames = {
    ventaComedor: "Venta en Comedor",
    ventaMostrador: "Venta en Mostrador",
    ventaDomicilio: "Venta a Domicilio",
    reservaciones: "Sistema de Reservaciones",
    encuestas: "Encuestas SMS",
    reportes: "Reportes Avanzados",
  }

  return (
    <Card className="border-dashed">
      <CardHeader className="text-center">
        <div className={`mx-auto w-12 h-12 rounded-full ${currentInfo.color} flex items-center justify-center mb-2`}>
          <CurrentIcon className="w-6 h-6" />
        </div>
        <CardTitle className="text-lg">Característica No Disponible</CardTitle>
        <CardDescription>
          <strong>{featureNames[requiredFeature as keyof typeof featureNames] || requiredFeature}</strong> no está
          disponible en tu plan actual
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <Badge variant="outline" className={currentInfo.color}>
          Plan {currentInfo.name}
        </Badge>
        <Button className="w-full">Ver Planes Disponibles</Button>
      </CardContent>
    </Card>
  )
}
