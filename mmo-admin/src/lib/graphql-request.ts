import { GraphQLClient } from 'graphql-request'

import { ENDPOINT } from 'config'
import storage from 'utils/storage'

export const graphqlRequest = async (query: any, variables?: any) => {
  const headers = {
    authorization: `Bearer ${storage.getToken()}`,
  }
  const graphqlRequestClient = new GraphQLClient(ENDPOINT, {})

  try {
    return await graphqlRequestClient.request(query, variables, headers)
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2))
    return null
  }
}
