import { User } from 'generated/graphql'

export type AuthUser = {
  id: string
  email: string
  firstName: string
  lastName: string
  bio: string
  role: 'ADMIN' | 'USER'
}

export type UserResponse = {
  accessToken: string
  refreshToken: string
  user: User
}
