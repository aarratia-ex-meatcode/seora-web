import { graphqlRequest } from "@/lib/graphql-client"
import MeQuery from "@/features/me/graphql/me.gql"

export async function me() {
  const { me } = await graphqlRequest(MeQuery)
  return me
}
