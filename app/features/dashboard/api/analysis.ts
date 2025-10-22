import { graphqlRequest } from "@/lib/graphql-client"
import RunAeoAnalysis from "@/features/dashboard/graphql/analysis.gql"

export async function runAeoAnalysis(variables: {
    project_id: string
    question: string
    models: string[]
}) {
    const { runaeoAnalysis } = await graphqlRequest(RunAeoAnalysis, variables)
    return runaeoAnalysis
}
