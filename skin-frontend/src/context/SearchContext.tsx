import { createContext, useContext, useMemo, useState } from 'react'

type SearchContextValue = {
  query: string
  setQuery: (value: string) => void
}

const SearchContext = createContext<SearchContextValue | null>(null)

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState('')

  const value = useMemo<SearchContextValue>(() => ({ query, setQuery }), [query])
  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
}

export function useProductSearch() {
  const ctx = useContext(SearchContext)
  if (!ctx) throw new Error('useProductSearch must be used within a SearchProvider')
  return ctx
}

