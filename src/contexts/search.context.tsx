import { createContext, useState } from 'react';

type SarchContextType = {
  isSearchActive?: boolean;
  searchQuery?: string;
  updateSearchQuery?: (query: string) => void;
  updateSearchActive?: (isActive: boolean) => void;
};

export const SearchContext = createContext<SarchContextType>({});

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  const updateSearchQuery = (query: string) => {
    setSearchQuery(query);
  };

  const updateSearchActive = (isActive: boolean) => {
    setIsSearchActive(isActive);
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        isSearchActive,
        updateSearchQuery,
        updateSearchActive,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
