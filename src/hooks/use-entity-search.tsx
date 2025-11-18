import { useEffect, useState } from "react";
import { PAGINATION } from "@/config/constants";

interface UseEntitySearchProps<T extends {
  search: string;
  page: number
}> {
  params: T;
  setParams: (params: T) => void;
  debouncesMs?: number;
}

export function useEntitySearch<T extends {
  search: string;
  page: number;
}>({
  params,
  setParams,
  debouncesMs = 500
}: UseEntitySearchProps<T>) {
  const [localSearch, setLocalSearch] = useState(params.search);
  useEffect(() => {
    if (localSearch === "" && params.search !== "") {
      setParams({ ...params, search: "", });
      return;
    }
    const timer = setTimeout(() => {
      if (localSearch !== params.search) {
        setParams({
          ...params, search: localSearch, page: PAGINATION.DEFAULT_PAGE
        })
      }
    }, debouncesMs)
    return () => clearTimeout(timer)
  }, [localSearch, params, setParams, debouncesMs]);

  useEffect(() => {
    setLocalSearch(params.search)
  }, [params.search]);

  return {
    searchValue: localSearch,
    onSearchChange: setLocalSearch,
  };
};



