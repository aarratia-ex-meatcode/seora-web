import { graphqlRequest } from "@/lib/graphql-client"
import GetProviders from "@/features/dashboard/graphql/provider.gql"

export async function getProviders() {
  const { providers } = await graphqlRequest(GetProviders)
  return providers
}
