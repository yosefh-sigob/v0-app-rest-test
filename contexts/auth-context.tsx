"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { User, AuthContextType, LoginCredentials } from "@/interfaces/auth"
import { authenticateUser } from "@/actions/auth.actions"
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

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = () => {
    try {
      const storedToken = localStorage.getItem("auth_token")
      const storedUser = localStorage.getItem("auth_user")

      if (storedToken && storedUser) {
        const userData = JSON.parse(storedUser)
        setToken(storedToken)
        setUser(userData)
        setIsAuthenticated(true)
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

        localStorage.setItem("auth_token", result.token)
        localStorage.setItem("auth_user", JSON.stringify(result.user))

        toast.success(`¡Bienvenido ${result.user.nombreCompleto}!`)
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
    localStorage.removeItem("auth_token")
    localStorage.removeItem("auth_user")
    toast.success("Sesión cerrada correctamente")
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
