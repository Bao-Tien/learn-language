import React from 'react'

interface SearchInputProps {
  children: React.ReactNode
}

interface SearchInputContextDefault {
  searchInput: string
  updateSearchInput: (searchInput: string) => void
}

const searchInputContextDeafaultData = {
  searchInput: '',
  updateSearchInput: () => {},
}

export const SearchInputContext = React.createContext<SearchInputContextDefault>(
  searchInputContextDeafaultData,
)

const SearchInputContextProvider = ({ children }: SearchInputProps) => {
  const [searchInput, setSearchInput] = React.useState(searchInputContextDeafaultData.searchInput)

  const updateSearchInput = (searchInput: string) => setSearchInput(searchInput)

  const searchInputContextDynamicData = { searchInput, updateSearchInput }

  return (
    <SearchInputContext.Provider value={searchInputContextDynamicData}>
      {children}
    </SearchInputContext.Provider>
  )
}

export default SearchInputContextProvider
