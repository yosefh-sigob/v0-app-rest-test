"use client"

import type { ReactNode } from "react"
import { NivelLicencia } from "@/interfaces/database"
import { hasFeature, type getLicenseFeatures } from "@/utils/license"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, Crown, Zap, Star } from "lucide-react"

interface LicenseGuardProps {
  children: ReactNode
  requiredFeature?: keyof ReturnType<typeof getLicenseFeatures>
  currentLicense: NivelLicencia
  fallback?: ReactNode
}

const LICENSE_ICONS = {
  [NivelLicencia.GRATIS]: Lock,
  [NivelLicencia.LITE]: Zap,
  [NivelLicencia.PRO]: Crown,
  [NivelLicencia.FRANQUICIA]: Star,
}

const LICENSE_COLORS = {
  [NivelLicencia.GRATIS]: "text-gray-500",
  [NivelLicencia.LITE]: "text-blue-500",
  [NivelLicencia.PRO]: "text-purple-500",
  [NivelLicencia.FRANQUICIA]: "text-yellow-500",
}

export function LicenseGuard({ children, requiredFeature, currentLicense, fallback }: LicenseGuardProps) {
  // Si no se especifica una característica requerida, mostrar el contenido
  if (!requiredFeature) {
    return <>{children}</>
  }

  // Verificar si la licencia actual tiene la característica requerida
  const hasRequiredFeature = hasFeature(currentLicense, requiredFeature)

  if (hasRequiredFeature) {
    return <>{children}</>
  }

  // Si se proporciona un fallback personalizado, usarlo
  if (fallback) {
    return <>{fallback}</>
  }

  // Mostrar mensaje de restricción por defecto
  const Icon = LICENSE_ICONS[currentLicense]
  const colorClass = LICENSE_COLORS[currentLicense]

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className={`mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4`}>
          <Icon className={`w-6 h-6 ${colorClass}`} />
        </div>
        <CardTitle className="text-xl">Función Restringida</CardTitle>
        <CardDescription>
          Esta funcionalidad requiere una licencia superior a tu plan actual ({currentLicense}).
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p className="text-sm text-muted-foreground">
          Actualiza tu plan para acceder a todas las características avanzadas de nuestro sistema.
        </p>
        <div className="flex gap-2 justify-center">
          <Button variant="outline" size="sm">
            Ver Planes
          </Button>
          <Button size="sm">Actualizar Ahora</Button>
        </div>
      </CardContent>
    </Card>
  )
}
