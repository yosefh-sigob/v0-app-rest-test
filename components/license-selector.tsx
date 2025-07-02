"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Check, Crown, Zap, Building, Gift, Info } from "lucide-react"
import type { LicenseType } from "@/utils/license"

interface LicenseSelectorProps {
  currentLicense: LicenseType
  onLicenseChange: (license: LicenseType) => void
}

const LICENSE_CONFIG = {
  Gratis: {
    name: "Gratis",
    icon: <Gift className="h-5 w-5" />,
    color: "bg-gray-500",
    features: ["Gestión básica de productos", "Venta en comedor únicamente", "Hasta 50 productos", "1 usuario"],
  },
  Lite: {
    name: "Lite",
    icon: <Zap className="h-5 w-5" />,
    color: "bg-blue-500",
    features: [
      "Todo lo de Gratis +",
      "Venta en mostrador y domicilio",
      "Menú digital QR",
      "Reportes básicos",
      "Hasta 200 productos",
      "3 usuarios",
    ],
  },
  Pro: {
    name: "Pro",
    icon: <Crown className="h-5 w-5" />,
    color: "bg-orange-500",
    features: [
      "Todo lo de Lite +",
      "Reportes avanzados",
      "Control de inventario",
      "Integraciones API",
      "Campañas SMS",
      "Productos ilimitados",
      "10 usuarios",
    ],
  },
  Franquicia: {
    name: "Franquicia",
    icon: <Building className="h-5 w-5" />,
    color: "bg-purple-500",
    features: [
      "Todo lo de Pro +",
      "Multi-sucursal",
      "Reportes corporativos",
      "Dashboard centralizado",
      "Usuarios ilimitados",
      "Soporte prioritario",
    ],
  },
}

export function LicenseSelector({ currentLicense, onLicenseChange }: LicenseSelectorProps) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <>
      <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className={`p-2 rounded-lg ${LICENSE_CONFIG[currentLicense].color} text-white`}>
              {LICENSE_CONFIG[currentLicense].icon}
            </div>
            Plan Actual: {LICENSE_CONFIG[currentLicense].name}
            <Dialog open={showDetails} onOpenChange={setShowDetails}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="ml-auto">
                  <Info className="h-4 w-4 mr-1" />
                  Ver Detalles
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Planes de Licencia</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Object.entries(LICENSE_CONFIG).map(([key, config]) => (
                    <Card
                      key={key}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        currentLicense === key ? "ring-2 ring-orange-500" : ""
                      }`}
                      onClick={() => {
                        onLicenseChange(key as LicenseType)
                        setShowDetails(false)
                      }}
                    >
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <div className={`p-1.5 rounded ${config.color} text-white`}>{config.icon}</div>
                          {config.name}
                          {currentLicense === key && <Check className="h-4 w-4 text-green-600 ml-auto" />}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-1 text-sm">
                          {config.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Check className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {Object.entries(LICENSE_CONFIG).map(([key, config]) => (
              <Button
                key={key}
                variant={currentLicense === key ? "default" : "outline"}
                size="sm"
                onClick={() => onLicenseChange(key as LicenseType)}
                className={
                  currentLicense === key
                    ? `${config.color} hover:opacity-90 text-white`
                    : "hover:bg-orange-50 hover:border-orange-300"
                }
              >
                {config.icon}
                {config.name}
                {currentLicense === key && <Check className="h-3 w-3 ml-1" />}
              </Button>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            🧪 <strong>Modo Demo:</strong> Cambia entre planes para probar diferentes funcionalidades
          </p>
        </CardContent>
      </Card>
    </>
  )
}
