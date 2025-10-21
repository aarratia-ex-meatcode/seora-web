import { graphqlRequest } from '@/lib/graphql-client'
import LoginMutation from '@/features/login/graphql/login.gql'

export async function login(email: string, password: string) {
  const { login } = await graphqlRequest(LoginMutation, { email, password })
  return login
}
