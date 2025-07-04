"use client"

import { useState } from "react"
import { Bell, Menu, LogOut, User, Settings, ChefHat, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"
import { getRoleColor, getRoleBadgeColor } from "./role-navigation"

interface AuthHeaderProps {
  onToggleSidebar: () => void
}

function getUserInitials(nombreCompleto?: string): string {
  if (!nombreCompleto || typeof nombreCompleto !== "string") return "U"

  const names = nombreCompleto.trim().split(" ").filter(Boolean)
  if (names.length === 0) return "U"
  if (names.length === 1) return names[0].charAt(0).toUpperCase()

  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase()
}

function getFirstName(nombreCompleto?: string): string {
  if (!nombreCompleto || typeof nombreCompleto !== "string") return "Usuario"

  const names = nombreCompleto.trim().split(" ").filter(Boolean)
  return names.length > 0 ? names[0] : "Usuario"
}

export function AuthHeader({ onToggleSidebar }: AuthHeaderProps) {
  const { user, logout } = useAuth()
  const [notificationCount] = useState(5)

  if (!user) return null

  const userInitials = getUserInitials(user.nombreCompleto)
  const firstName = getFirstName(user.nombreCompleto)
  const roleColor = getRoleColor(user.rol)
  const roleBadgeColor = getRoleBadgeColor(user.rol)

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
      {/* Left side */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={onToggleSidebar} className="lg:hidden hover:bg-gray-100">
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center">
            <ChefHat className="h-5 w-5 text-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-gray-900">AppRest</h1>
            <p className="text-xs text-gray-500">Sistema de Gestión</p>
          </div>
        </div>
      </div>

      {/* Center - Current time */}
      <div className="hidden md:block text-center">
        <div className="text-sm font-medium text-gray-700">
          {new Date().toLocaleDateString("es-ES", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
        <div className="text-xs text-gray-500">
          {new Date().toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-3">
        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative hover:bg-gray-100">
          <Bell className="h-5 w-5 text-gray-600" />
          {notificationCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {notificationCount}
            </Badge>
          )}
        </Button>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-auto px-3 hover:bg-gray-100">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.nombreCompleto} />
                  <AvatarFallback className={`${roleColor} text-white text-sm font-bold`}>
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-gray-900">{firstName}</span>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${roleBadgeColor}`}>{user.rol}</div>
                  </div>
                  <div className="text-xs text-gray-500">{user.nombreEmpresa}</div>
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.nombreCompleto} />
                    <AvatarFallback className={`${roleColor} text-white font-bold`}>{userInitials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-semibold leading-none">{user.nombreCompleto}</p>
                    <p className="text-xs leading-none text-muted-foreground mt-1">{user.correo}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${roleBadgeColor}`}>{user.rol}</div>
                  <Badge variant="outline" className="text-xs">
                    {user.nivelLicencia}
                  </Badge>
                  {user.esAdministrador && (
                    <Badge variant="secondary" className="text-xs">
                      <Shield className="h-3 w-3 mr-1" />
                      Admin
                    </Badge>
                  )}
                </div>
                <div className="text-xs text-gray-500">
                  <strong>Empresa:</strong> {user.nombreEmpresa}
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Mi Perfil</span>
            </DropdownMenuItem>
            {user.esAdministrador && (
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Configuración</span>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600 focus:bg-red-50">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Cerrar Sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
