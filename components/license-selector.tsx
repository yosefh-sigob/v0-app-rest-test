"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Crown, Zap, Building, Star, Check, Info } from "lucide-react"
import type { LicenseType } from "@/utils/license"

interface LicenseSelectorProps {
  currentLicense: LicenseType
  onLicenseChange: (license: LicenseType) => void
}

const LICENSE_CONFIG = {
  Gratis: {
    icon: <Star className="h-4 w-4" />,
    color: "bg-gray-500",
    borderColor: "border-gray-200",
    textColor: "text-gray-700",
    features: ["Gestión básica de productos", "Venta en comedor", "Hasta 50 productos", "1 usuario"],
  },
  Lite: {
    icon: <Zap className="h-4 w-4" />,
    color: "bg-blue-500",
    borderColor: "border-blue-200",
    textColor: "text-blue-700",
    features: [
      "Todo lo de Gratis +",
      "Venta en mostrador",
      "Venta a domicilio",
      "Menú digital QR",
      "Reportes básicos",
      "Hasta 200 productos",
      "3 usuarios",
    ],
  },
  Pro: {
    icon: <Crown className="h-4 w-4" />,
    color: "bg-orange-500",
    borderColor: "border-orange-200",
    textColor: "text-orange-700",
    features: [
      "Todo lo de Lite +",
      "Reportes avanzados",
      "Control de inventario",
      "Integraciones API",
      "Campañas SMS",
      "Programa de lealtad",
      "Productos ilimitados",
      "10 usuarios",
    ],
  },
  Franquicia: {
    icon: <Building className="h-4 w-4" />,
    color: "bg-purple-500",
    borderColor: "border-purple-200",
    textColor: "text-purple-700",
    features: [
      "Todo lo de Pro +",
      "Multi-sucursal",
      "Reportes corporativos",
      "Dashboard centralizado",
      "Gestión de franquicias",
      "Usuarios ilimitados",
      "Soporte prioritario",
    ],
  },
}

export function LicenseSelector({ currentLicense, onLicenseChange }: LicenseSelectorProps) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-orange-800 flex items-center gap-2">
          <Info className="h-4 w-4" />
          Modo Demo - Selector de Licencia
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-2 mb-3">
          {(Object.keys(LICENSE_CONFIG) as LicenseType[]).map((license) => {
            const config = LICENSE_CONFIG[license]
            const isActive = currentLicense === license

            return (
              <Button
                key={license}
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => onLicenseChange(license)}
                className={`${
                  isActive
                    ? `${config.color} hover:opacity-90 text-white`
                    : `${config.borderColor} ${config.textColor} hover:bg-orange-50`
                }`}
              >
                {config.icon}
                {license}
                {isActive && <Check className="h-3 w-3 ml-1" />}
              </Button>
            )
          })}
        </div>

        <div className="flex items-center justify-between text-xs text-orange-700">
          <span>
            Plan actual: <strong>{currentLicense}</strong>
          </span>
          <Dialog open={showDetails} onOpenChange={setShowDetails}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="text-xs text-orange-600 hover:text-orange-700">
                Ver detalles de planes
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Planes y Funcionalidades</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {(Object.keys(LICENSE_CONFIG) as LicenseType[]).map((license) => {
                  const config = LICENSE_CONFIG[license]
                  const isActive = currentLicense === license

                  return (
                    <Card key={license} className={`${isActive ? config.borderColor + " ring-2 ring-offset-2" : ""}`}>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2">
                          <div className={`p-2 rounded-full ${config.color} text-white`}>{config.icon}</div>
                          {license}
                          {isActive && <Badge className={`${config.color} text-white`}>Actual</Badge>}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          {config.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Check className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <Button
                          onClick={() => {
                            onLicenseChange(license)
                            setShowDetails(false)
                          }}
                          className={`w-full mt-4 ${config.color} hover:opacity-90 text-white`}
                          disabled={isActive}
                        >
                          {isActive ? "Plan Actual" : `Probar ${license}`}
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  )
}
