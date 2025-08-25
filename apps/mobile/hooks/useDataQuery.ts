import { useQuery } from '@tanstack/react-query';

export const useDataQuery = <T>(
  queryKey: string[],
  queryFn: () => Promise<T>,
  options?: {
    enabled?: boolean;
    staleTime?: number;
    cacheTime?: number;
  }
) => {
  return useQuery({
    queryKey,
    queryFn,
    ...options,
  });
};