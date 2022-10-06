import { ContentLayout } from 'components/Layout'

import { SubscriptionHistoryGrid } from '../components/SubscriptionHistoryGrid'

export const SubscriptionHistories = () => {
  return (
    <ContentLayout title="Subscription history">
      <SubscriptionHistoryGrid />
    </ContentLayout>
  )
}
