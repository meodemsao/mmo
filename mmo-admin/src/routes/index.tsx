import { useRoutes } from 'react-router-dom'

import { Landing } from 'features/misc'
import { useAuth } from 'lib/auth'

import { ProtectedRoutes } from './protected'
import { PublicRoutes } from './public'

export const AppRoutes = () => {
  const auth = useAuth()

  const CommonRoutes = [{ path: '/', element: <Landing /> }]

  const routes = auth.user ? ProtectedRoutes : PublicRoutes

  const element = useRoutes([...routes, ...CommonRoutes])

  return element
}
