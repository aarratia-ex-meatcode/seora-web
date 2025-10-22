import { graphqlRequest } from "@/lib/graphql-client"
import AddProject from "@/features/dashboard/graphql/project.gql"

export async function addProject(variables: {
  user_id: string
  name: string
  domain: string
  country?: string
  settings?: Record<string, any>
}) {
  const { addProject } = await graphqlRequest(AddProject, variables)
  return addProject
}
