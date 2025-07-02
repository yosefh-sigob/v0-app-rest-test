"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Home, Bell, User, Settings, LogOut, ChevronDown } from "lucide-react"

export function Header() {
  return (
    <header className="header-restaurant px-6 py-4 flex items-center justify-between">
      {/* Breadcrumb y botón de inicio */}
      <div className="flex items-center space-x-4">
        <Link href="/">
          <Button
            variant="outline"
            size="sm"
            className="border-restaurant-primary text-restaurant-primary hover:bg-restaurant-primary hover:text-white bg-transparent"
          >
            <Home className="w-4 h-4 mr-2" />
            Volver al Inicio
          </Button>
        </Link>
        <div className="text-sm text-restaurant-neutral-lighter">Dashboard / Panel Principal</div>
      </div>

      {/* Acciones del header */}
      <div className="flex items-center space-x-4">
        {/* Notificaciones */}
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-5 h-5" />
          <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
            3
          </Badge>
        </Button>

        {/* Menú de usuario */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium">Juan Carlos</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <User className="w-4 h-4 mr-2" />
              Mi Perfil
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" />
              Configuración
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Volver al Inicio
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar Sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
