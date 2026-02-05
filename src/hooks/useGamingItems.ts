import { useQuery, queryOptions } from '@tanstack/react-query'
import { getFastGamingItems, getSlowGamingItems } from 'api/services/items'

// Query options for fast-loading gaming items (awaited in loader)
export const fastGamingItemsQueryOptions = queryOptions({
  queryKey: ['gaming-items-fast'],
  queryFn: getFastGamingItems,
})

// Query options for slow-loading gaming items (prefetched in loader)
export const slowGamingItemsQueryOptions = queryOptions({
  queryKey: ['gaming-items-slow'],
  queryFn: getSlowGamingItems,
})

/**
 * Hook to fetch fast-loading gaming items
 * Data is guaranteed to be available (loaded in route loader)
 */
export function useFastGamingItems() {
  return useQuery(fastGamingItemsQueryOptions)
}

/**
 * Hook to fetch slow-loading gaming items
 * May show loading state initially if prefetch hasn't completed
 */
export function useSlowGamingItems() {
  return useQuery(slowGamingItemsQueryOptions)
}
