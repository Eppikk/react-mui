import { createContext, useState, useEffect, type ReactNode } from 'react'
import * as authService from 'api/services/auth'

export interface User {
  id: string
  name: string
  email: string
}

export interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  // Initialize with existing token if available
  const token = localStorage.getItem('auth_token')
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(!!token)
  const [isLoading, setIsLoading] = useState(!!token) // Only loading if we have a token to verify

  // Check for existing token on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('auth_token')
      if (token) {
        try {
          const currentUser = await authService.getCurrentUser()
          setUser(currentUser)
          setIsAuthenticated(true)
        } catch (error) {
          // Token is invalid, clear it
          localStorage.removeItem('auth_token')
          setIsAuthenticated(false)
        }
      }
      setIsLoading(false)
    }

    if (token) {
      initAuth()
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password })
      setUser(response.user)
      setIsAuthenticated(true)
    } catch (error) {
      setUser(null)
      setIsAuthenticated(false)
      throw error
    }
  }

  const logout = () => {
    authService.logout()
    setUser(null)
    setIsAuthenticated(false)
  }

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    isLoading,
  }

  // Don't render children until initial auth check is complete
  if (isLoading) {
    return null // Or return a loading spinner component
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
