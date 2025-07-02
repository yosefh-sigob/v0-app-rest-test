"use client"

import type { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lock, Zap, Crown, Star } from "lucide-react"
import { canAccessFeature, getUpgradeMessage, type LicenseLevel } from "@/utils/license"

interface LicenseGuardProps {
  children: ReactNode
  requiredLicense: LicenseLevel
  currentLicense?: LicenseLevel
  feature?: string
  showUpgrade?: boolean
}

const LICENSE_ICONS = {
  Gratis: <Star className="h-4 w-4" />,
  Lite: <Zap className="h-4 w-4" />,
  Pro: <Crown className="h-4 w-4" />,
  Franquicia: <Crown className="h-4 w-4 text-purple-500" />,
}

const LICENSE_COLORS = {
  Gratis: "bg-gray-100 text-gray-800",
  Lite: "bg-blue-100 text-blue-800",
  Pro: "bg-orange-100 text-orange-800",
  Franquicia: "bg-purple-100 text-purple-800",
}

export function LicenseGuard({
  children,
  requiredLicense,
  currentLicense = "Gratis", // En producción vendría de la sesión
  feature,
  showUpgrade = true,
}: LicenseGuardProps) {
  const hasAccess = canAccessFeature(currentLicense, requiredLicense)

  if (hasAccess) {
    return <>{children}</>
  }

  if (!showUpgrade) {
    return null
  }

  return (
    <Card className="border-dashed">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
          <Lock className="h-6 w-6 text-orange-600" />
        </div>
        <CardTitle className="text-xl">{feature ? `${feature} no disponible` : "Funcionalidad bloqueada"}</CardTitle>
        <CardDescription>{getUpgradeMessage(currentLicense, requiredLicense)}</CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="flex justify-center items-center gap-2">
          <span className="text-sm text-muted-foreground">Plan actual:</span>
          <Badge variant="outline" className={LICENSE_COLORS[currentLicense]}>
            {LICENSE_ICONS[currentLicense]}
            {currentLicense}
          </Badge>
        </div>
        <div className="flex justify-center items-center gap-2">
          <span className="text-sm text-muted-foreground">Plan requerido:</span>
          <Badge className={LICENSE_COLORS[requiredLicense]}>
            {LICENSE_ICONS[requiredLicense]}
            {requiredLicense}
          </Badge>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700">Actualizar Plan</Button>
      </CardContent>
    </Card>
  )
}
