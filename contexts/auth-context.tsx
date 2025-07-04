"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { UsuarioAuth, LoginCredentials } from "@/interfaces/auth"
import { loginAction, logoutAction, verificarSesionAction } from "@/actions/auth.actions"
import { toast } from "sonner"

interface AuthContextType {
  usuario: UsuarioAuth | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (credentials: LoginCredentials) => Promise<boolean>
  logout: () => Promise<void>
  verificarSesion: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<UsuarioAuth | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = !!usuario

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      setIsLoading(true)
      const result = await loginAction(credentials)

      if (result.success && result.data) {
        setUsuario(result.data.usuario)
        localStorage.setItem("auth_token", result.data.token)
        localStorage.setItem("auth_user", JSON.stringify(result.data.usuario))
        toast.success(`¡Bienvenido ${result.data.usuario.NombreCompleto}!`)
        return true
      } else {
        toast.error(result.error || "Error al iniciar sesión")
        return false
      }
    } catch (error) {
      toast.error("Error de conexión")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await logoutAction()
      setUsuario(null)
      localStorage.removeItem("auth_token")
      localStorage.removeItem("auth_user")
      toast.success("Sesión cerrada correctamente")
    } catch (error) {
      toast.error("Error al cerrar sesión")
    }
  }

  const verificarSesion = async (): Promise<void> => {
    try {
      const token = localStorage.getItem("auth_token")
      const userData = localStorage.getItem("auth_user")

      if (token && userData) {
        const result = await verificarSesionAction(token)
        if (result.success && result.data) {
          setUsuario(JSON.parse(userData))
        } else {
          // Token inválido, limpiar
          localStorage.removeItem("auth_token")
          localStorage.removeItem("auth_user")
          setUsuario(null)
        }
      }
    } catch (error) {
      console.error("Error verificando sesión:", error)
      setUsuario(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    verificarSesion()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        usuario,
        isLoading,
        isAuthenticated,
        login,
        logout,
        verificarSesion,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }
  return context
}
