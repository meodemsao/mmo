import { ContentLayout } from 'components/Layout'

import { GrantPermissionComponent } from '../components/GrantPermissionComponent'

export const GrantPermission = () => {
  return (
    <ContentLayout title="Grant role">
      <GrantPermissionComponent />
    </ContentLayout>
  )
}
