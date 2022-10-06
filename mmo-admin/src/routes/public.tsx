import { lazyImport } from 'utils/lazyImport'

const { AuthRoutes } = lazyImport(() => import('features/auth'), 'AuthRoutes')

export const PublicRoutes = [
  {
    path: '/auth/*',
    element: <AuthRoutes />,
  },
]
