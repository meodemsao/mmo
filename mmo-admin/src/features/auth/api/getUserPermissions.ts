import gql from 'graphql-tag'

import { GetUserPermissionsQuery } from 'generated/graphql'
import { graphqlRequest } from 'lib/graphql-request'

export const getUserPermissions = async (
  username: string
): Promise<GetUserPermissionsQuery | null> => {
  const query = gql`
    query getUserPermissions($username: String!) {
      getUserPermissions(username: $username)
    }
  `
  return await graphqlRequest(query, { username })
}
