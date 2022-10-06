import gql from 'graphql-tag'

import { graphqlRequest } from 'lib/graphql-request'

import { UserResponse } from '../types'

export type LoginCredentialsDTO = {
  username: string
  password: string
}

export const loginWithEmailAndPassword = async (
  input: LoginCredentialsDTO
): Promise<UserResponse> => {
  const query = gql`
    mutation login($data: LoginInput!) {
      login(data: $data) {
        accessToken
        refreshToken
        user {
          id
          username
          firstname
          lastname
        }
      }
    }
  `
  const data = await graphqlRequest(query, {
    data: {
      username: input.username,
      password: input.password,
    },
  })
  return data.login
}
