import { apiClient } from 'api/client'
import type { User } from 'auth/types'

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: User
}

export interface RegisterCredentials {
  name: string
  email: string
  password: string
}

/**
 * Authenticate user with email and password
 * Stores the token in localStorage for subsequent requests
 *
 * Demo credentials:
 * Email: demo@example.com
 * Password: demo123
 */
export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  // Check for demo credentials
  if (credentials.email === 'demo@example.com' && credentials.password === 'demo123') {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))

    const mockToken = 'demo-token-' + Date.now()
    const mockResponse: LoginResponse = {
      token: mockToken,
      user: {
        id: '1',
        name: 'Demo User',
        email: 'demo@example.com',
      },
    }

    localStorage.setItem('auth_token', mockToken)
    return mockResponse
  }

  // Real API call for production
  const response = await apiClient.post<LoginResponse>('/auth/login', credentials)

  // Store token for subsequent requests
  if (response.data.token) {
    localStorage.setItem('auth_token', response.data.token)
  }

  return response.data
}

/**
 * Register a new user
 */
export async function register(credentials: RegisterCredentials): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>('/auth/register', credentials)

  // Store token for subsequent requests
  if (response.data.token) {
    localStorage.setItem('auth_token', response.data.token)
  }

  return response.data
}

/**
 * Logout user by removing token
 */
export function logout(): void {
  localStorage.removeItem('auth_token')
}

/**
 * Get current user profile
 * Requires authentication token
 */
export async function getCurrentUser(): Promise<User> {
  const token = localStorage.getItem('auth_token')

  // Handle demo token
  if (token?.startsWith('demo-token-')) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return {
      id: '1',
      name: 'Demo User',
      email: 'demo@example.com',
    }
  }

  const response = await apiClient.get<User>('/auth/me')
  return response.data
}

/**
 * Refresh authentication token
 */
export async function refreshToken(): Promise<{ token: string }> {
  const response = await apiClient.post<{ token: string }>('/auth/refresh')

  if (response.data.token) {
    localStorage.setItem('auth_token', response.data.token)
  }

  return response.data
}
