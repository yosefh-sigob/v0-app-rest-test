"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ChefHat, Menu, X, LogOut } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { RoleNavigation } from "./role-navigation"
import { RolUsuario } from "@/interfaces/auth"

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

export function AuthSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { usuario, logout } = useAuth()

  if (!usuario) return null

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const handleLogout = async () => {
    await logout()
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="sm" onClick={() => setIsCollapsed(!isCollapsed)} className="bg-white shadow-md">
          {isCollapsed ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "restaurant-sidebar fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          isCollapsed ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo y empresa */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-amber-800">
            <div className="flex items-center space-x-3">
              <ChefHat className="h-8 w-8 text-amber-300" />
              <div>
                <h2 className="text-xl font-bold text-amber-100">AppRest</h2>
                <p className="text-xs text-amber-300">{usuario.NombreEmpresa}</p>
              </div>
            </div>
          </div>

          {/* Información del usuario */}
          <div className="px-4 py-4 border-b border-amber-800">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={usuario.Avatar || "/placeholder.svg"} alt={usuario.NombreCompleto} />
                <AvatarFallback className="bg-gradient-to-br from-amber-500 to-orange-600 text-white">
                  {getInitials(usuario.NombreCompleto)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-amber-100 truncate">{usuario.NombreCompleto}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Badge
                    variant="outline"
                    className={cn("text-xs border-amber-300 text-amber-100", getRoleBadgeColor(usuario.Rol))}
                  >
                    {usuario.Rol}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation basada en roles */}
          <RoleNavigation />

          {/* Footer con logout */}
          <div className="px-4 py-4 border-t border-amber-800 space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full border-amber-300 text-amber-100 hover:bg-amber-800 bg-transparent"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </Button>
            <p className="text-xs text-amber-300 text-center">© 2024 AppRest v1.0</p>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isCollapsed && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden" onClick={() => setIsCollapsed(false)} />
      )}
    </>
  )
}
