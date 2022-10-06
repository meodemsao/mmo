import { ContentLayout } from 'components/Layout'
import { AuthActionVerb, AuthPossession } from 'constants/enum/auth'
import Authorization from 'features/authorization/Authorization'

import { RoleEditComponent } from '../components/RoleEditComponent'

export const RoleEdit = () => {
  return (
    <ContentLayout title="Edit role">
      <Authorization
        forbiddenFallback={<div>Access denied.</div>}
        permission={[
          {
            resource: 'role',
            action: AuthActionVerb.UPDATE,
          },
        ]}
      >
        <RoleEditComponent />
      </Authorization>
    </ContentLayout>
  )
}
