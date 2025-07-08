import { createContext, useContext, useState, ReactNode } from 'react';

export interface Filters {
  gender?: string;
  type?: string;
  search: string;
  minPrice?: number;
  maxPrice?: number;
}

interface FilterContextValue extends Filters {
  setGender: (v: string | undefined) => void;
  setType: (v: string | undefined) => void;
  setSearch: (v: string) => void;
  setMinPrice: (v: number | undefined) => void;
  setMaxPrice: (v: number | undefined) => void;
}

const FilterContext = createContext<FilterContextValue | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [gender, setGender] = useState<string | undefined>();
  const [type, setType] = useState<string | undefined>();
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();

  return (
    <FilterContext.Provider
      value={{ gender, type, search, minPrice, maxPrice, setGender, setType, setSearch, setMinPrice, setMaxPrice }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error('FilterContext is missing');
  return ctx;
}
