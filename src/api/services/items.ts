import { apiClient } from 'api/client'

// Common item interface
export interface Item {
  id: number
  title: string
  description: string
  price: string
  image: string
}

export type GamingItem = Item
export type ElectronicsItem = Item
export type ClothingItem = Item
export type Book = Item

/**
 * Fetch gaming items
 */
export async function getGamingItems(): Promise<GamingItem[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1200))

  // Mock data - replace with actual API call
  // const response = await apiClient.get<GamingItem[]>('/items/gaming')
  // return response.data

  return [
    {
      id: 10,
      title: 'Gaming Console',
      description: 'Next-gen gaming console',
      price: '$499',
      image: 'https://via.placeholder.com/300x200/388e3c/ffffff?text=Console',
    },
    {
      id: 11,
      title: 'Gaming Headset',
      description: 'Pro gaming headset with surround sound',
      price: '$129',
      image: 'https://via.placeholder.com/300x200/388e3c/ffffff?text=Headset',
    },
    {
      id: 12,
      title: 'Mechanical Keyboard',
      description: 'RGB mechanical gaming keyboard',
      price: '$159',
      image: 'https://via.placeholder.com/300x200/388e3c/ffffff?text=Keyboard',
    },
  ]
}

/**
 * Fetch fast-loading gaming items (awaited in loader)
 * Quick response - data available immediately on page load
 */
export async function getFastGamingItems(): Promise<GamingItem[]> {
  // Simulate fast API response
  await new Promise(resolve => setTimeout(resolve, 300))

  return [
    {
      id: 10,
      title: 'Gaming Console',
      description: 'Next-gen gaming console',
      price: '$499',
      image: 'https://via.placeholder.com/300x200/388e3c/ffffff?text=Console',
    },
    {
      id: 11,
      title: 'Gaming Headset',
      description: 'Pro gaming headset with surround sound',
      price: '$129',
      image: 'https://via.placeholder.com/300x200/388e3c/ffffff?text=Headset',
    },
  ]
}

/**
 * Fetch slow-loading gaming items (prefetched in loader)
 * Slow response - shows loading state initially
 */
export async function getSlowGamingItems(): Promise<GamingItem[]> {
  // Simulate slow API response
  await new Promise(resolve => setTimeout(resolve, 2500))

  return [
    {
      id: 12,
      title: 'Mechanical Keyboard',
      description: 'RGB mechanical gaming keyboard',
      price: '$159',
      image: 'https://via.placeholder.com/300x200/388e3c/ffffff?text=Keyboard',
    },
    {
      id: 13,
      title: 'Gaming Mouse',
      description: 'High-precision gaming mouse with RGB',
      price: '$89',
      image: 'https://via.placeholder.com/300x200/388e3c/ffffff?text=Mouse',
    },
    {
      id: 14,
      title: 'Gaming Chair',
      description: 'Ergonomic gaming chair with lumbar support',
      price: '$299',
      image: 'https://via.placeholder.com/300x200/388e3c/ffffff?text=Chair',
    },
  ]
}

/**
 * Fetch electronics items
 */
export async function getElectronicsItems(): Promise<ElectronicsItem[]> {
  // Simulate slow network delay
  await new Promise(resolve => setTimeout(resolve, 2000))

  // Mock data - replace with actual API call
  // const response = await apiClient.get<ElectronicsItem[]>('/items/electronics')
  // return response.data

  return [
    {
      id: 1,
      title: 'Laptop Pro 15',
      description: 'High-performance laptop with 16GB RAM',
      price: '$1,299',
      image: 'https://via.placeholder.com/300x200/1976d2/ffffff?text=Laptop',
    },
    {
      id: 2,
      title: 'Smartphone X',
      description: 'Latest smartphone with 5G support',
      price: '$899',
      image: 'https://via.placeholder.com/300x200/1976d2/ffffff?text=Phone',
    },
    {
      id: 3,
      title: 'Wireless Earbuds',
      description: 'Noise-cancelling wireless earbuds',
      price: '$199',
      image: 'https://via.placeholder.com/300x200/1976d2/ffffff?text=Earbuds',
    },
  ]
}

/**
 * Fetch clothing items
 */
export async function getClothingItems(): Promise<ClothingItem[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Mock data - replace with actual API call
  // const response = await apiClient.get<ClothingItem[]>('/items/clothing')
  // return response.data

  return [
    {
      id: 4,
      title: 'Designer T-Shirt',
      description: 'Premium cotton t-shirt',
      price: '$45',
      image: 'https://via.placeholder.com/300x200/9c27b0/ffffff?text=T-Shirt',
    },
    {
      id: 5,
      title: 'Denim Jeans',
      description: 'Classic fit denim jeans',
      price: '$79',
      image: 'https://via.placeholder.com/300x200/9c27b0/ffffff?text=Jeans',
    },
    {
      id: 6,
      title: 'Winter Jacket',
      description: 'Warm insulated winter jacket',
      price: '$149',
      image: 'https://via.placeholder.com/300x200/9c27b0/ffffff?text=Jacket',
    },
  ]
}

/**
 * Fetch books
 */
export async function getBooks(): Promise<Book[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500))

  // Mock data - replace with actual API call
  // const response = await apiClient.get<Book[]>('/items/books')
  // return response.data

  return [
    {
      id: 7,
      title: 'The Design of Everyday Things',
      description: 'Classic book on design principles',
      price: '$24',
      image: 'https://via.placeholder.com/300x200/f57c00/ffffff?text=Design+Book',
    },
    {
      id: 8,
      title: 'Clean Code',
      description: 'A handbook of agile software craftsmanship',
      price: '$32',
      image: 'https://via.placeholder.com/300x200/f57c00/ffffff?text=Clean+Code',
    },
    {
      id: 9,
      title: 'Fiction Bestseller',
      description: 'Award-winning contemporary fiction',
      price: '$18',
      image: 'https://via.placeholder.com/300x200/f57c00/ffffff?text=Fiction',
    },
  ]
}
