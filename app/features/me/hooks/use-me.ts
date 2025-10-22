import { useQuery } from "@tanstack/react-query"
import { me } from "~/features/me/api/me"

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: me,
  })
}
