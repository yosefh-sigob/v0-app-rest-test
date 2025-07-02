"use client"

import type { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lock, Zap, Crown, Building } from "lucide-react"
import { NivelLicencia } from "@/interfaces/database"
import { hasLicenseAccess, getUpgradeMessage, getNextLicenseLevel } from "@/utils/license"

interface LicenseGuardProps {
  children: ReactNode
  currentLicense: NivelLicencia
  requiredFeature: string
  fallback?: ReactNode
  showUpgrade?: boolean
}

const LICENSE_ICONS = {
  [NivelLicencia.GRATIS]: Lock,
  [NivelLicencia.LITE]: Zap,
  [NivelLicencia.PRO]: Crown,
  [NivelLicencia.FRANQUICIA]: Building,
}

const LICENSE_COLORS = {
  [NivelLicencia.GRATIS]: "bg-gray-100 text-gray-800 border-gray-200",
  [NivelLicencia.LITE]: "bg-blue-100 text-blue-800 border-blue-200",
  [NivelLicencia.PRO]: "bg-purple-100 text-purple-800 border-purple-200",
  [NivelLicencia.FRANQUICIA]: "bg-gold-100 text-gold-800 border-gold-200",
}

export function LicenseGuard({
  children,
  currentLicense,
  requiredFeature,
  fallback,
  showUpgrade = true,
}: LicenseGuardProps) {
  const hasAccess = hasLicenseAccess(currentLicense, requiredFeature)

  if (hasAccess) {
    return <>{children}</>
  }

  if (fallback) {
    return <>{fallback}</>
  }

  if (!showUpgrade) {
    return null
  }

  const upgradeMessage = getUpgradeMessage(currentLicense, requiredFeature)
  const nextLevel = getNextLicenseLevel(currentLicense)
  const NextIcon = nextLevel ? LICENSE_ICONS[nextLevel] : Crown

  return (
    <Card className="border-dashed">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
          <NextIcon className="w-6 h-6 text-muted-foreground" />
        </div>
        <CardTitle className="text-lg">Funcionalidad Premium</CardTitle>
        <CardDescription>{upgradeMessage}</CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="flex justify-center items-center space-x-2">
          <span className="text-sm text-muted-foreground">Plan actual:</span>
          <Badge variant="outline" className={LICENSE_COLORS[currentLicense]}>
            {currentLicense}
          </Badge>
        </div>

        {nextLevel && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Actualiza a <strong>{nextLevel}</strong> para desbloquear esta funcionalidad
            </p>
            <Button size="sm" className="w-full">
              Actualizar Plan
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

interface LicenseInfoProps {
  currentLicense: NivelLicencia
  className?: string
}

export function LicenseInfo({ currentLicense, className }: LicenseInfoProps) {
  const Icon = LICENSE_ICONS[currentLicense]

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Icon className="w-4 h-4" />
      <Badge variant="outline" className={LICENSE_COLORS[currentLicense]}>
        {currentLicense}
      </Badge>
    </div>
  )
}
