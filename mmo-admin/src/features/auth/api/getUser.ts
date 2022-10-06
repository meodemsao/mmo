import gql from 'graphql-tag'

import { MeQuery } from 'generated/graphql'
import { graphqlRequest } from 'lib/graphql-request'

export const getUser = async (): Promise<MeQuery | null> => {
  const query = gql`
    query {
      me {
        id
        username
        firstname
        lastname
      }
    }
  `

  return await graphqlRequest(query)
}
