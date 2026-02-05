import { apiClient } from 'api/client'
import type { User } from 'auth/types'

/**
 * Example user service demonstrating authenticated API requests
 * All requests will automatically include the bearer token
 */

export interface UpdateUserData {
  name?: string
  email?: string
}

/**
 * Get all users (admin only)
 */
export async function getUsers(): Promise<User[]> {
  const response = await apiClient.get<User[]>('/users')
  return response.data
}

/**
 * Get user by ID
 */
export async function getUserById(id: string): Promise<User> {
  const response = await apiClient.get<User>(`/users/${id}`)
  return response.data
}

/**
 * Update user profile
 */
export async function updateUser(id: string, data: UpdateUserData): Promise<User> {
  const response = await apiClient.patch<User>(`/users/${id}`, data)
  return response.data
}

/**
 * Delete user
 */
export async function deleteUser(id: string): Promise<void> {
  await apiClient.delete(`/users/${id}`)
}
