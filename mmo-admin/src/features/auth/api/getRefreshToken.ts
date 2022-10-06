import gql from 'graphql-tag'

import { RefreshTokenMutation } from 'generated/graphql'
import { graphqlRequest } from 'lib/graphql-request'

export const getRefreshToken = async (
  variables: any
): Promise<RefreshTokenMutation | undefined> => {
  const mutation = gql`
    mutation refreshToken($token: JWT!) {
      refreshToken(token: $token) {
        accessToken
        refreshToken
      }
    }
  `
  return await graphqlRequest(mutation, variables)
}
