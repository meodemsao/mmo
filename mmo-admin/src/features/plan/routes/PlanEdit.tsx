import { ContentLayout } from 'components/Layout'
import { AuthActionVerb, AuthPossession } from 'constants/enum/auth'
import Authorization from 'features/authorization/Authorization'

import { PlanEditComponent } from '../components/PlanEditComponent'

export const PlanEdit = () => {
  return (
    <ContentLayout title="Edit plan">
      <Authorization
        forbiddenFallback={<div>Access denied.</div>}
        permission={[
          {
            resource: 'plan',
            action: AuthActionVerb.UPDATE,
          },
        ]}
      >
        <PlanEditComponent />
      </Authorization>
    </ContentLayout>
  )
}
