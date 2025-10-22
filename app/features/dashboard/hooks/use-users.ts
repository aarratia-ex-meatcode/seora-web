import { useQuery } from "@tanstack/react-query"
import { getUsers } from "~/features/dashboard/api/user"

export function useUsers(params = { first: 10, page: 1 }) {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => getUsers(params),
    refetchOnWindowFocus: false,
  })
}
