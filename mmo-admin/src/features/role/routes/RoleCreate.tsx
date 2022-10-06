import { ContentLayout } from 'components/Layout'
import { AuthActionVerb, AuthPossession } from 'constants/enum/auth'
import Authorization from 'features/authorization/Authorization'

import { RoleCreateComponent } from '../components/RoleCreateComponent'

export const RoleCreate = () => {
  return (
    <ContentLayout title="Create role">
      <Authorization
        forbiddenFallback={<div>Access denied.</div>}
        permission={[
          {
            resource: 'role',
            action: AuthActionVerb.CREATE,
          },
        ]}
      >
        <RoleCreateComponent />
      </Authorization>
    </ContentLayout>
  )
}
