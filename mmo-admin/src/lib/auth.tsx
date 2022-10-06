import { initReactQueryAuth } from 'react-query-auth'

import { Spinner } from 'flowbite-react'
import {
  loginWithEmailAndPassword,
  getUser,
  // registerWithEmailAndPassword,
  UserResponse,
  LoginCredentialsDTO,
  // RegisterCredentialsDTO,
} from 'features/auth'
// eslint-disable-next-line no-restricted-imports
import { getRefreshToken } from 'features/auth/api/getRefreshToken'
// eslint-disable-next-line no-restricted-imports
import { getUserPermissions } from 'features/auth/api/getUserPermissions'
import { User } from 'generated/graphql'
import storage from 'utils/storage'

async function updateToken(accessToken: string, refreshToken: string) {
  await storage.setToken(accessToken)
  await storage.setRefreshToken(refreshToken)
}

async function handleUserResponse(userResponse: UserResponse) {
  const { accessToken, refreshToken, user } = userResponse
  await updateToken(accessToken, refreshToken)
  return user
}

export async function loadPermission(user: User) {
  if (user) {
    const permissions = await getUserPermissions(user.username)
    if (permissions) {
      await storage.setPermissions(permissions.getUserPermissions)
    }
  }
}

async function loadUser(): Promise<User | null> {
  if (storage.getToken() && storage.getRefreshToken()) {
    let user = await getUser()
    if (!user) {
      const token = await getRefreshToken({ token: storage.getRefreshToken() })
      if (token) {
        await updateToken(token?.refreshToken.accessToken, token?.refreshToken.refreshToken)
      } else {
        await logoutFn()
      }
      user = await getUser()
    }
    loadPermission(user?.me as User)
    return user?.me as User
  }
  return null
}

async function loginFn(loginInput: LoginCredentialsDTO) {
  const userResult = await loginWithEmailAndPassword(loginInput)
  const user = await handleUserResponse(userResult)
  await loadPermission(user)
  return user
}

async function registerFn(data: any) {
  // const response = await registerWithEmailAndPassword(data)
  // const user = await handleUserResponse(response)
  // await loadPermission(user)
  // return user
  return null
}

async function logoutFn() {
  storage.clearToken()
  window.location.assign(window.location.origin as unknown as string)
}

const authConfig = {
  loadUser,
  loginFn,
  registerFn,
  logoutFn,
  LoaderComponent() {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Spinner size="xl" />
      </div>
    )
  },
}

export const { AuthProvider, useAuth } = initReactQueryAuth<
  User | null,
  unknown,
  LoginCredentialsDTO
  // RegisterCredentialsDTO
>(authConfig)
