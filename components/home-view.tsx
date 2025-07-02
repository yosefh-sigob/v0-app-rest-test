"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Calculator, Settings, Phone, Mail, MapPin, ChefHat, Utensils } from "lucide-react"

export function HomeView() {
  return (
    <div className="min-h-screen bg-gradient-restaurant">
      {/* Header */}
      <header className="header-restaurant px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-restaurant-neutral">Restaurante El Buen Sabor</h1>
              <p className="text-sm text-restaurant-neutral-lighter">Sistema de Gestión Integral</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-restaurant-accent text-restaurant-neutral">
            Licencia PRO
          </Badge>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold text-restaurant-neutral mb-4">Bienvenido al Sistema</h2>
          <p className="text-xl text-restaurant-neutral-light max-w-2xl mx-auto">
            Selecciona tu área de trabajo para comenzar a gestionar las operaciones del restaurante
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Mesero Card */}
          <Card className="card-restaurant group hover:scale-105 transition-transform duration-300 animate-slide-up">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-restaurant-neutral">Mesero</CardTitle>
              <CardDescription className="text-restaurant-neutral-light">
                Gestión de mesas, órdenes y atención al cliente
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-2 mb-6 text-sm text-restaurant-neutral-lighter">
                <p>• Administrar mesas asignadas</p>
                <p>• Tomar órdenes de clientes</p>
                <p>• Gestionar cuentas y pagos</p>
                <p>• Ver estadísticas personales</p>
              </div>
              <Link href="/mesero">
                <Button className="btn-primary w-full group-hover:shadow-lg transition-shadow duration-300">
                  <Users className="w-4 h-4 mr-2" />
                  Acceder como Mesero
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Cajero Card */}
          <Card
            className="card-restaurant group hover:scale-105 transition-transform duration-300 animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Calculator className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-restaurant-neutral">Cajero</CardTitle>
              <CardDescription className="text-restaurant-neutral-light">
                Procesamiento de pagos y control de caja
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-2 mb-6 text-sm text-restaurant-neutral-lighter">
                <p>• Procesar pagos y cobros</p>
                <p>• Gestionar caja registradora</p>
                <p>• Generar reportes de ventas</p>
                <p>• Control de efectivo</p>
              </div>
              <Link href="/cajero">
                <Button className="btn-primary w-full group-hover:shadow-lg transition-shadow duration-300">
                  <Calculator className="w-4 h-4 mr-2" />
                  Acceder como Cajero
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Administrador Card */}
          <Card
            className="card-restaurant group hover:scale-105 transition-transform duration-300 animate-slide-up md:col-span-2 lg:col-span-1"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-restaurant-neutral">Administrador</CardTitle>
              <CardDescription className="text-restaurant-neutral-light">
                Panel completo de administración y configuración
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-2 mb-6 text-sm text-restaurant-neutral-lighter">
                <p>• Panel completo de control</p>
                <p>• Gestión de productos y menús</p>
                <p>• Reportes y análisis</p>
                <p>• Configuración del sistema</p>
              </div>
              <Link href="/dashboard">
                <Button className="btn-primary w-full group-hover:shadow-lg transition-shadow duration-300">
                  <Settings className="w-4 h-4 mr-2" />
                  Acceder al Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="card-restaurant p-6 text-center animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <div className="text-3xl font-bold text-restaurant-primary mb-2">25</div>
            <div className="text-sm text-restaurant-neutral-light">Mesas Totales</div>
          </div>
          <div className="card-restaurant p-6 text-center animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <div className="text-3xl font-bold text-restaurant-secondary mb-2">12</div>
            <div className="text-sm text-restaurant-neutral-light">Mesas Ocupadas</div>
          </div>
          <div className="card-restaurant p-6 text-center animate-slide-up" style={{ animationDelay: "0.5s" }}>
            <div className="text-3xl font-bold text-restaurant-accent mb-2">87</div>
            <div className="text-sm text-restaurant-neutral-light">Clientes Hoy</div>
          </div>
          <div className="card-restaurant p-6 text-center animate-slide-up" style={{ animationDelay: "0.6s" }}>
            <div className="text-3xl font-bold text-restaurant-primary mb-2">$15,420</div>
            <div className="text-sm text-restaurant-neutral-light">Ventas Hoy</div>
          </div>
        </div>

        {/* Support Section */}
        <Card className="card-restaurant animate-slide-up" style={{ animationDelay: "0.7s" }}>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-restaurant-neutral flex items-center justify-center">
              <Utensils className="w-6 h-6 mr-2 text-restaurant-primary" />
              Soporte y Contacto
            </CardTitle>
            <CardDescription className="text-restaurant-neutral-light">
              ¿Necesitas ayuda? Nuestro equipo está aquí para apoyarte
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 rounded-lg bg-restaurant-background-secondary">
                <Phone className="w-8 h-8 text-restaurant-primary mx-auto mb-3" />
                <h3 className="font-semibold text-restaurant-neutral mb-2">Teléfono</h3>
                <p className="text-restaurant-neutral-light">+52 (55) 1234-5678</p>
                <p className="text-sm text-restaurant-neutral-lighter">Lun - Vie: 9:00 - 18:00</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-restaurant-background-secondary">
                <Mail className="w-8 h-8 text-restaurant-secondary mx-auto mb-3" />
                <h3 className="font-semibold text-restaurant-neutral mb-2">Email</h3>
                <p className="text-restaurant-neutral-light">soporte@restaurante.com</p>
                <p className="text-sm text-restaurant-neutral-lighter">Respuesta en 24 hrs</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-restaurant-background-secondary">
                <MapPin className="w-8 h-8 text-restaurant-accent mx-auto mb-3" />
                <h3 className="font-semibold text-restaurant-neutral mb-2">Ubicación</h3>
                <p className="text-restaurant-neutral-light">Av. Principal 123</p>
                <p className="text-sm text-restaurant-neutral-lighter">Ciudad de México</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-restaurant-neutral text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <ChefHat className="w-6 h-6" />
            <span className="text-lg font-semibold">Sistema de Gestión Restaurante</span>
          </div>
          <p className="text-restaurant-neutral-lighter">
            © 2024 Restaurante El Buen Sabor. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
