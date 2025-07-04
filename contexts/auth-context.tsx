"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import type { User, AuthContextType, LoginCredentials } from "@/interfaces/auth"
import { authenticateUser, validateToken } from "@/actions/auth.actions"
import { toast } from "sonner"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const storedToken = localStorage.getItem("auth_token")
      const storedUser = localStorage.getItem("auth_user")

      if (storedToken && storedUser) {
        // Validar token con el servidor
        const validUser = await validateToken(storedToken)

        if (validUser) {
          setToken(storedToken)
          setUser(validUser)
          setIsAuthenticated(true)
        } else {
          // Token inválido, limpiar storage
          localStorage.removeItem("auth_token")
          localStorage.removeItem("auth_user")
        }
      }
    } catch (error) {
      console.error("Error checking auth:", error)
      logout()
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      setIsLoading(true)
      const result = await authenticateUser(credentials)

      if (result.success && result.user && result.token) {
        setUser(result.user)
        setToken(result.token)
        setIsAuthenticated(true)

        // Guardar en localStorage
        localStorage.setItem("auth_token", result.token)
        localStorage.setItem("auth_user", JSON.stringify(result.user))

        toast.success(`¡Bienvenido ${result.user.nombreCompleto}!`)

        // Redirigir al dashboard
        router.push("/dashboard")

        return true
      } else {
        toast.error(result.error || "Credenciales inválidas")
        return false
      }
    } catch (error) {
      console.error("Login error:", error)
      toast.error("Error de conexión")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    setIsAuthenticated(false)

    // Limpiar localStorage
    localStorage.removeItem("auth_token")
    localStorage.removeItem("auth_user")

    toast.success("Sesión cerrada correctamente")

    // Redirigir al login
    router.push("/")
  }

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
