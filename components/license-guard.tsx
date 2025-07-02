"use client"

import type { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lock, Crown, Zap, Building, ArrowRight } from "lucide-react"
import { useLicense } from "@/contexts/license-context"
import { hasFeature, LICENSE_FEATURES } from "@/utils/license"
import type { LicenseType } from "@/utils/license"

interface LicenseGuardProps {
  children: ReactNode
  feature: keyof typeof LICENSE_FEATURES.Gratis
  fallback?: ReactNode
}

const LICENSE_ICONS = {
  Gratis: <Lock className="h-4 w-4" />,
  Lite: <Zap className="h-4 w-4" />,
  Pro: <Crown className="h-4 w-4" />,
  Franquicia: <Building className="h-4 w-4" />,
}

const LICENSE_COLORS = {
  Gratis: "bg-gray-500",
  Lite: "bg-blue-500",
  Pro: "bg-orange-500",
  Franquicia: "bg-purple-500",
}

function getRequiredLicense(feature: keyof typeof LICENSE_FEATURES.Gratis): LicenseType {
  const licenses: LicenseType[] = ["Gratis", "Lite", "Pro", "Franquicia"]

  for (const license of licenses) {
    if (LICENSE_FEATURES[license][feature]) {
      return license
    }
  }

  return "Pro" // Default fallback
}

export function LicenseGuard({ children, feature, fallback }: LicenseGuardProps) {
  const { currentLicense, setLicense } = useLicense()

  const hasAccess = hasFeature(currentLicense, feature)
  const requiredLicense = getRequiredLicense(feature)

  if (hasAccess) {
    return <>{children}</>
  }

  if (fallback) {
    return <>{fallback}</>
  }

  return (
    <Card className="border-dashed border-2 border-orange-200 bg-orange-50/50">
      <CardContent className="flex flex-col items-center justify-center py-8 text-center">
        <div className="mb-4">
          <div className={`inline-flex p-3 rounded-full ${LICENSE_COLORS[requiredLicense]} text-white mb-3`}>
            <Lock className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Funcionalidad Bloqueada</h3>
          <p className="text-muted-foreground mb-4">
            Esta funcionalidad requiere el plan <strong>{requiredLicense}</strong> o superior
          </p>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Badge variant="outline" className="text-xs">
            {LICENSE_ICONS[currentLicense]}
            Plan Actual: {currentLicense}
          </Badge>
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
          <Badge className={`text-xs text-white ${LICENSE_COLORS[requiredLicense]}`}>
            {LICENSE_ICONS[requiredLicense]}
            Requerido: {requiredLicense}
          </Badge>
        </div>

        <Button
          onClick={() => setLicense(requiredLicense)}
          className={`${LICENSE_COLORS[requiredLicense]} hover:opacity-90 text-white`}
        >
          {LICENSE_ICONS[requiredLicense]}
          Probar Plan {requiredLicense}
        </Button>

        <p className="text-xs text-muted-foreground mt-3">
          🧪 Modo demo - Cambia de plan para probar esta funcionalidad
        </p>
      </CardContent>
    </Card>
  )
}
