import { ContentLayout } from 'components/Layout'
import { AuthActionVerb, AuthPossession } from 'constants/enum/auth'
import Authorization from 'features/authorization/Authorization'

import { PlanCreateComponent } from '../components/PlanCreateComponent'

export const PlanCreate = () => {
  return (
    <ContentLayout title="Create plan">
      <Authorization
        forbiddenFallback={<div>Access denied.</div>}
        permission={[
          {
            resource: 'plan',
            action: AuthActionVerb.CREATE,
          },
        ]}
      >
        <PlanCreateComponent />
      </Authorization>
    </ContentLayout>
  )
}
