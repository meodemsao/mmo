import { lazyImport } from 'utils/lazyImport'

const { Plans } = lazyImport(() => import('./Plans'), 'Plans')
const { PlanCreate } = lazyImport(() => import('./PlanCreate'), 'PlanCreate')
const { PlanEdit } = lazyImport(() => import('./PlanEdit'), 'PlanEdit')

export const PlanRoutes = [
  { path: '/plans/edit/:id', element: <PlanEdit /> },
  { path: '/plans/create', element: <PlanCreate /> },
  { path: '/plans', element: <Plans /> },
]
