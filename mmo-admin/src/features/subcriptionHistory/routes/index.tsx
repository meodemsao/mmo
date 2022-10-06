import { lazyImport } from 'utils/lazyImport'

const { SubscriptionHistories } = lazyImport(
  () => import('./SubscriptionsHistory'),
  'SubscriptionHistories'
)

export const SubHistoryRoutes = [
  { path: '/sub-history/:subId', element: <SubscriptionHistories /> },
]
