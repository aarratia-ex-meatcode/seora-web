import { print } from "graphql"
import { useAuthStore } from "~/stores/auth"

const endpoint = import.meta.env.VITE_API_URL

export async function graphqlRequest(query: any, variables: Record<string, any> = {}) {
  const token = useAuthStore.getState().token

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ query: print(query), variables }),
  })

  const { data, errors } = await res.json()
  if (errors?.length) {
    const message = errors[0]?.message || "GraphQL Error"
    throw new Error(message)
  }

  return data
}
