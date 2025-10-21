import { graphqlRequest } from "@/lib/graphql-client"
import GetUsers from "@/features/dashboard/graphql/users.gql"

export async function getUsers({ first = 10, page = 1 }) {
  const { users } = await graphqlRequest(GetUsers, { first, page })
  return users
}
