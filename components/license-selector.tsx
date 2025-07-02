"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Check, Crown, Star, Zap, Building2, Info } from "lucide-react"

export type LicenseType = "Gratis" | "Lite" | "Pro" | "Franquicia"

interface LicenseSelectorProps {
  currentLicense: LicenseType
  onLicenseChange: (license: LicenseType) => void
}

const LICENSES = {
  Gratis: {
    name: "Gratis",
    price: "$0",
    period: "/mes",
    color: "bg-gray-500",
    icon: <Info className="h-4 w-4" />,
    features: ["Hasta 5 productos", "1 usuario", "Soporte básico", "Reportes básicos"],
    limitations: ["Sin gestión de inventario", "Sin múltiples ubicaciones", "Sin integraciones avanzadas"],
  },
  Lite: {
    name: "Lite",
    price: "$29",
    period: "/mes",
    color: "bg-blue-500",
    icon: <Zap className="h-4 w-4" />,
    features: [
      "Hasta 100 productos",
      "3 usuarios",
      "Gestión básica de inventario",
      "Reportes avanzados",
      "Soporte por email",
    ],
    limitations: ["Sin múltiples ubicaciones", "Sin integraciones de terceros"],
  },
  Pro: {
    name: "Pro",
    price: "$79",
    period: "/mes",
    color: "bg-orange-500",
    icon: <Star className="h-4 w-4" />,
    features: [
      "Productos ilimitados",
      "10 usuarios",
      "Gestión completa de inventario",
      "Múltiples ubicaciones",
      "Integraciones avanzadas",
      "Reportes personalizados",
      "Soporte prioritario",
    ],
    limitations: ["Sin funciones de franquicia"],
  },
  Franquicia: {
    name: "Franquicia",
    price: "$199",
    period: "/mes",
    color: "bg-purple-500",
    icon: <Building2 className="h-4 w-4" />,
    features: [
      "Todo lo de Pro",
      "Usuarios ilimitados",
      "Gestión multi-franquicia",
      "Dashboard centralizado",
      "Reportes consolidados",
      "Soporte 24/7",
      "Consultoría incluida",
    ],
    limitations: [],
  },
}

export function LicenseSelector({ currentLicense, onLicenseChange }: LicenseSelectorProps) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <Card className="border-2 border-dashed border-orange-200 bg-orange-50/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-800">
          <Crown className="h-5 w-5" />
          Plan Actual: {currentLicense}
        </CardTitle>
        <CardDescription className="text-orange-700">
          Cambia tu plan para probar diferentes funcionalidades
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(LICENSES).map(([key, license]) => (
            <Button
              key={key}
              variant={currentLicense === key ? "default" : "outline"}
              size="sm"
              onClick={() => onLicenseChange(key as LicenseType)}
              className={currentLicense === key ? `${license.color} text-white` : ""}
            >
              {license.icon}
              {license.name}
              {currentLicense === key && <Check className="h-3 w-3 ml-1" />}
            </Button>
          ))}
        </div>

        <Dialog open={showDetails} onOpenChange={setShowDetails}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700">
              Ver comparación de planes
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Comparación de Planes</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(LICENSES).map(([key, license]) => (
                <Card key={key} className={`relative ${currentLicense === key ? "ring-2 ring-orange-500" : ""}`}>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-full ${license.color} text-white`}>{license.icon}</div>
                      <div>
                        <CardTitle className="text-lg">{license.name}</CardTitle>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold">{license.price}</span>
                          <span className="text-sm text-muted-foreground">{license.period}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-green-700 mb-2">Incluye:</h4>
                      <ul className="space-y-1">
                        {license.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <Check className="h-3 w-3 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {license.limitations.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-red-700 mb-2">Limitaciones:</h4>
                        <ul className="space-y-1">
                          {license.limitations.map((limitation, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm text-red-600">
                              <span className="w-3 h-3 text-center">×</span>
                              {limitation}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Button
                      onClick={() => {
                        onLicenseChange(key as LicenseType)
                        setShowDetails(false)
                      }}
                      className={`w-full ${currentLicense === key ? "bg-gray-400" : license.color}`}
                      disabled={currentLicense === key}
                    >
                      {currentLicense === key ? "Plan Actual" : `Cambiar a ${license.name}`}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
