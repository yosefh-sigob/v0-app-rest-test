"use client"

import { useState } from "react"
import { Bell, Menu, LogOut, User, Settings } from "lucide-react"
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
import { getRoleColor, getRoleBadgeVariant } from "./role-navigation"

interface AuthHeaderProps {
  onToggleSidebar: () => void
}

function getUserInitials(nombreCompleto: string): string {
  if (!nombreCompleto || typeof nombreCompleto !== "string") return "U"

  const names = nombreCompleto.trim().split(" ")
  if (names.length === 1) return names[0].charAt(0).toUpperCase()

  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase()
}

export function AuthHeader({ onToggleSidebar }: AuthHeaderProps) {
  const { user, logout } = useAuth()
  const [notificationCount] = useState(3)

  if (!user) return null

  const userInitials = getUserInitials(user.nombreCompleto)
  const roleColor = getRoleColor(user.rol)
  const roleBadgeVariant = getRoleBadgeVariant(user.rol)

  return (
    <header className="h-16 border-b bg-white px-4 flex items-center justify-between">
      {/* Left side */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={onToggleSidebar} className="lg:hidden">
          <Menu className="h-4 w-4" />
        </Button>

        <div className="hidden lg:block">
          <h1 className="text-xl font-semibold text-gray-900">AppRest</h1>
          <p className="text-sm text-gray-500">Sistema de Gestión</p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
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
            <Button variant="ghost" className="relative h-10 w-auto px-2">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.nombreCompleto} />
                  <AvatarFallback className={`${roleColor} text-white text-sm font-semibold`}>
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{user.nombreCompleto}</span>
                    <Badge variant={roleBadgeVariant} className="text-xs">
                      {user.rol}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500">{user.nombreEmpresa}</div>
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.nombreCompleto}</p>
                <p className="text-xs leading-none text-muted-foreground">{user.correo}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant={roleBadgeVariant} className="text-xs">
                    {user.rol}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {user.nivelLicencia}
                  </Badge>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Configuración</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Cerrar Sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
