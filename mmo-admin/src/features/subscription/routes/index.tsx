import { lazyImport } from 'utils/lazyImport'

const { Subscriptions } = lazyImport(() => import('./Subscriptions'), 'Subscriptions')

export const SubRoutes = [{ path: '/subs', element: <Subscriptions /> }]
