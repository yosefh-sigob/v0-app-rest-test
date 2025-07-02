"use client"

import type React from "react"

import { useLicense } from "@/contexts/license-context"
import { canAccessFeature } from "@/utils/license"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lock, Crown, Zap, Star } from "lucide-react"

interface LicenseGuardProps {
  children: React.ReactNode
  feature: string
  fallback?: React.ReactNode
}

export function LicenseGuard({ children, feature, fallback }: LicenseGuardProps) {
  const { currentLicense, setShowSelector } = useLicense()

  if (canAccessFeature(currentLicense, feature)) {
    return <>{children}</>
  }

  if (fallback) {
    return <>{fallback}</>
  }

  const getUpgradeInfo = () => {
    switch (feature) {
      case "productos.editar":
      case "productos.eliminar":
        return {
          title: "Funcionalidad Premium",
          description: "Para editar y eliminar productos necesitas una licencia Lite o superior",
          requiredPlan: "Lite",
          icon: <Zap className="h-6 w-6 text-yellow-500" />,
          color: "bg-yellow-50 border-yellow-200",
        }
      case "productos.avanzado":
        return {
          title: "Funciones Avanzadas",
          description: "Las funciones avanzadas requieren una licencia Pro",
          requiredPlan: "Pro",
          icon: <Star className="h-6 w-6 text-purple-500" />,
          color: "bg-purple-50 border-purple-200",
        }
      case "franquicia":
        return {
          title: "Funciones de Franquicia",
          description: "Esta funcionalidad está disponible solo para licencias de Franquicia",
          requiredPlan: "Franquicia",
          icon: <Crown className="h-6 w-6 text-orange-500" />,
          color: "bg-orange-50 border-orange-200",
        }
      default:
        return {
          title: "Funcionalidad Restringida",
          description: "Esta funcionalidad requiere una licencia superior",
          requiredPlan: "Pro",
          icon: <Lock className="h-6 w-6 text-gray-500" />,
          color: "bg-gray-50 border-gray-200",
        }
    }
  }

  const upgradeInfo = getUpgradeInfo()

  return (
    <Card className={`${upgradeInfo.color} shadow-sm`}>
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-2">{upgradeInfo.icon}</div>
        <CardTitle className="text-lg">{upgradeInfo.title}</CardTitle>
        <CardDescription className="text-sm">{upgradeInfo.description}</CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="flex justify-center">
          <Badge variant="outline" className="text-xs font-medium">
            Requiere: {upgradeInfo.requiredPlan}
          </Badge>
        </div>
        <Button onClick={() => setShowSelector(true)} size="sm" className="w-full">
          Ver Planes Disponibles
        </Button>
      </CardContent>
    </Card>
  )
}
