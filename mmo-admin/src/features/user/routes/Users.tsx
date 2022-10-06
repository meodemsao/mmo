import { ContentLayout } from 'components/Layout'
import { AuthActionVerb } from 'constants/enum/auth'
import Authorization from 'features/authorization/Authorization'
import { UserGrid } from '../components/UserGrid'

export const Users = () => {
  return (
    <ContentLayout title="Users">
      <Authorization
        forbiddenFallback={<div>Access denied.</div>}
        permission={[
          {
            resource: 'user',
            action: AuthActionVerb.READ,
          },
        ]}
      >
        <UserGrid />
      </Authorization>
    </ContentLayout>
  )
}
