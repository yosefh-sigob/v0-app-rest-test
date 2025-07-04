"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Home, Bell, User, Settings, LogOut, Shield } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/auth-context"
import { RolUsuario } from "@/interfaces/auth"

interface AuthHeaderProps {
  title?: string
}

const getRoleBadgeColor = (rol: RolUsuario) => {
  switch (rol) {
    case RolUsuario.ADMINISTRADOR:
      return "bg-red-100 text-red-800 border-red-200"
    case RolUsuario.GERENTE:
      return "bg-purple-100 text-purple-800 border-purple-200"
    case RolUsuario.CAJERO:
      return "bg-green-100 text-green-800 border-green-200"
    case RolUsuario.MESERO:
      return "bg-blue-100 text-blue-800 border-blue-200"
    case RolUsuario.COCINERO:
      return "bg-orange-100 text-orange-800 border-orange-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getRoleIcon = (rol: RolUsuario) => {
  switch (rol) {
    case RolUsuario.ADMINISTRADOR:
      return <Shield className="h-3 w-3" />
    default:
      return null
  }
}

export function AuthHeader({ title }: AuthHeaderProps) {
  const { usuario, logout } = useAuth()

  if (!usuario) return null

  const handleLogout = async () => {
    await logout()
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <header className="restaurant-header px-6 py-4 border-b border-orange-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Botón para regresar al selector */}
          <Link href="/dashboard">
            <Button
              variant="outline"
              size="sm"
              className="border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent"
            >
              <Home className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
          </Link>

          {title && (
            <>
              <div className="h-6 w-px bg-orange-200" />
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            </>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {/* Información del usuario */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{usuario.NombreCompleto}</p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={cn("text-xs", getRoleBadgeColor(usuario.Rol))}>
                  {getRoleIcon(usuario.Rol)}
                  {usuario.Rol}
                </Badge>
                <span className="text-xs text-gray-500">{usuario.NombreEmpresa}</span>
              </div>
            </div>
          </div>

          {/* Notificaciones */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
          </Button>

          {/* Menú de usuario */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center space-x-2 hover:bg-orange-50">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={usuario.Avatar || "/placeholder.svg"} alt={usuario.NombreCompleto} />
                  <AvatarFallback className="bg-gradient-to-br from-amber-500 to-orange-600 text-white text-xs">
                    {getInitials(usuario.NombreCompleto)}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden lg:block text-sm text-gray-700">{usuario.NombreCompleto.split(" ")[0]}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{usuario.NombreCompleto}</p>
                  <p className="text-xs text-gray-500">{usuario.Correo}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className={cn("text-xs", getRoleBadgeColor(usuario.Rol))}>
                      {getRoleIcon(usuario.Rol)}
                      {usuario.Rol}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {usuario.NivelLicencia}
                    </Badge>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Mi Perfil</span>
              </DropdownMenuItem>
              {usuario.EsAdministrador && (
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configuración</span>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar Sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
