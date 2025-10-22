import { useQuery } from "@tanstack/react-query"
import { getProviders } from "~/features/dashboard/api/provider"

export function useProviders() {
  return useQuery({
    queryKey: ["providers"],
    queryFn: () => getProviders(),
    refetchOnWindowFocus: false,
  })
}
