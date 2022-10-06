import { Suspense } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Spinner } from 'flowbite-react'

import { MainLayout } from 'components/Layout'
import { lazyImport } from 'utils/lazyImport'
import { UsersRoutes } from 'features/user/routes'
import { RoleRoutes } from 'features/role/routes'
import { PlanRoutes } from 'features/plan/routes'
import { SubRoutes } from 'features/subscription/routes'
import { SubHistoryRoutes } from 'features/subcriptionHistory/routes'

const { Dashboard } = lazyImport(() => import('features/misc'), 'Dashboard')

const App = () => {
  return (
    <MainLayout>
      <Suspense
        fallback={
          <div className="h-full w-full flex items-center justify-center">
            <Spinner size="xl" />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </MainLayout>
  )
}

export const ProtectedRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      ...PlanRoutes,
      ...SubRoutes,
      ...SubHistoryRoutes,
      ...UsersRoutes,
      ...RoleRoutes,
      { path: '/', element: <Dashboard /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
]
