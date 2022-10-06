// eslint-disable-next-line import/no-unresolved
import { graphqlRequest } from 'lib/graphql-request'

export const useFetchData = <TData, TVariables>(query: string): (() => Promise<TData>) => {
  return async (variables?: TVariables) => {
    return await graphqlRequest(query, variables)
  }
}
