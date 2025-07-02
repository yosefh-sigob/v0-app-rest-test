"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { NivelLicencia } from "@/interfaces/database"
import { Crown, Zap, Building, Star, Check, X } from "lucide-react"

interface LicenseSelectorProps {
  currentLicense: NivelLicencia
  onLicenseChange: (license: NivelLicencia) => void
}

const LICENSE_INFO = {
  [NivelLicencia.GRATIS]: {
    name: "Gratis",
    icon: <Star className="h-5 w-5" />,
    color: "bg-gray-100 text-gray-800 border-gray-200",
    price: "$0",
    period: "Gratis para siempre",
    description: "Perfecto para empezar",
    features: ["Hasta 10 productos", "1 usuario", "Venta básica en comedor", "Reportes básicos", "Soporte por email"],
    limitations: ["Sin venta a domicilio", "Sin control de inventario", "Sin reportes avanzados", "Sin integraciones"],
  },
  [NivelLicencia.LITE]: {
    name: "Lite",
    icon: <Zap className="h-5 w-5" />,
    color: "bg-blue-100 text-blue-800 border-blue-200",
    price: "$29",
    period: "por mes",
    description: "Para restaurantes pequeños",
    features: [
      "Hasta 50 productos",
      "Hasta 3 usuarios",
      "Venta en comedor y mostrador",
      "Venta a domicilio",
      "Menú digital QR",
      "Reportes básicos",
      "Soporte prioritario",
    ],
    limitations: ["Sin control de inventario avanzado", "Sin multi-sucursal", "Sin API personalizada"],
  },
  [NivelLicencia.PRO]: {
    name: "Pro",
    icon: <Crown className="h-5 w-5" />,
    color: "bg-purple-100 text-purple-800 border-purple-200",
    price: "$79",
    period: "por mes",
    description: "Para restaurantes en crecimiento",
    features: [
      "Hasta 200 productos",
      "Hasta 10 usuarios",
      "Todos los canales de venta",
      "Control de inventario completo",
      "Reportes avanzados y analytics",
      "Integraciones API",
      "Campañas SMS",
      "Programa de lealtad",
      "Soporte 24/7",
    ],
    limitations: ["Sin gestión multi-sucursal"],
  },
  [NivelLicencia.FRANQUICIA]: {
    name: "Franquicia",
    icon: <Building className="h-5 w-5" />,
    color: "bg-orange-100 text-orange-800 border-orange-200",
    price: "$199",
    period: "por mes",
    description: "Para cadenas y franquicias",
    features: [
      "Productos ilimitados",
      "Usuarios ilimitados",
      "Multi-sucursal",
      "Reportes corporativos",
      "Dashboard centralizado",
      "API completa",
      "Personalización avanzada",
      "Soporte dedicado",
      "Capacitación incluida",
    ],
    limitations: [],
  },
}

export function LicenseSelector({ currentLicense, onLicenseChange }: LicenseSelectorProps) {
  const [showDetails, setShowDetails] = useState(false)
  const [selectedLicense, setSelectedLicense] = useState<NivelLicencia | null>(null)

  const handleLicenseSelect = (license: string) => {
    onLicenseChange(license as NivelLicencia)
  }

  const showLicenseDetails = (license: NivelLicencia) => {
    setSelectedLicense(license)
    setShowDetails(true)
  }

  return (
    <div className="space-y-4">
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <Crown className="h-5 w-5" />
            Selector de Licencia (Demo)
          </CardTitle>
          <CardDescription className="text-orange-700">
            Cambia el tipo de licencia para probar diferentes funcionalidades del sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Licencia actual:</span>
              <Badge className={LICENSE_INFO[currentLicense].color}>
                {LICENSE_INFO[currentLicense].icon}
                {LICENSE_INFO[currentLicense].name}
              </Badge>
            </div>

            <Select value={currentLicense} onValueChange={handleLicenseSelect}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={NivelLicencia.GRATIS}>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Gratis
                  </div>
                </SelectItem>
                <SelectItem value={NivelLicencia.LITE}>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Lite
                  </div>
                </SelectItem>
                <SelectItem value={NivelLicencia.PRO}>
                  <div className="flex items-center gap-2">
                    <Crown className="h-4 w-4" />
                    Pro
                  </div>
                </SelectItem>
                <SelectItem value={NivelLicencia.FRANQUICIA}>
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Franquicia
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {Object.entries(LICENSE_INFO).map(([license, info]) => (
              <Button
                key={license}
                variant="outline"
                size="sm"
                onClick={() => showLicenseDetails(license as NivelLicencia)}
                className="h-auto p-3 flex flex-col items-center gap-2"
              >
                {info.icon}
                <div className="text-center">
                  <div className="font-medium text-xs">{info.name}</div>
                  <div className="text-xs text-muted-foreground">{info.price}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dialog con detalles de licencia */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedLicense && LICENSE_INFO[selectedLicense].icon}
              Plan {selectedLicense && LICENSE_INFO[selectedLicense].name}
            </DialogTitle>
          </DialogHeader>

          {selectedLicense && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold">
                  {LICENSE_INFO[selectedLicense].price}
                  <span className="text-lg font-normal text-muted-foreground">
                    {LICENSE_INFO[selectedLicense].period}
                  </span>
                </div>
                <p className="text-muted-foreground">{LICENSE_INFO[selectedLicense].description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Incluye
                  </h4>
                  <ul className="space-y-2">
                    {LICENSE_INFO[selectedLicense].features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <Check className="h-3 w-3 text-green-600 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {LICENSE_INFO[selectedLicense].limitations.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
                      <X className="h-4 w-4" />
                      Limitaciones
                    </h4>
                    <ul className="space-y-2">
                      {LICENSE_INFO[selectedLicense].limitations.map((limitation, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <X className="h-3 w-3 text-red-600 flex-shrink-0" />
                          {limitation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    onLicenseChange(selectedLicense)
                    setShowDetails(false)
                  }}
                  className="flex-1"
                  disabled={currentLicense === selectedLicense}
                >
                  {currentLicense === selectedLicense
                    ? "Plan Actual"
                    : `Cambiar a ${LICENSE_INFO[selectedLicense].name}`}
                </Button>
                <Button variant="outline" onClick={() => setShowDetails(false)}>
                  Cerrar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
