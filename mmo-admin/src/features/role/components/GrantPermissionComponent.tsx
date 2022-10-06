import { Card, Checkbox, Label, Spinner } from 'flowbite-react'
import { AuthActionVerb, Resources } from 'constants/resources'
import { useParams } from 'react-router-dom'
import _ from 'lodash'

import {
  useGetRolePermissionsQuery,
  useRevokePermissionMutation,
  useGrantPermissionMutation,
  User,
} from 'generated/graphql'
import { checkExistsArray, dropSubPermission } from 'utils/array'
import { useNotification } from 'react-hook-notification'
import { loadPermission, useAuth } from 'lib/auth'

export const GrantPermissionComponent = () => {
  const { roleName } = useParams()
  const { user } = useAuth()
  const notification = useNotification()

  const { data, isLoading } = useGetRolePermissionsQuery({
    rolename: roleName as string,
  })

  const { mutate: grantMutate } = useGrantPermissionMutation()

  const { mutate: revokeMutate } = useRevokePermissionMutation()

  const onCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      grantMutate(
        {
          object: event.target.name,
          role: roleName as string,
          operation: event.target.value,
        },
        {
          onSuccess: () => {
            notification.success({
              title: 'Success',
              text: 'Permission was granted',
            })
            loadPermission(user as User)
          },
        }
      )
    } else {
      revokeMutate(
        {
          object: event.target.name,
          role: roleName as string,
          operation: event.target.value,
        },
        {
          onSuccess: () => {
            notification.success({
              title: 'Success',
              text: 'Permission was revoked',
            })
            loadPermission(user as User)
          },
        }
      )
    }
  }

  if (isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    )
  }

  const permissions = dropSubPermission(data?.getRolePermissions) as [][]

  return (
    <Card title="Grant persmission">
      {Resources.map((resource, index) => {
        return (
          <div className="grid grid-cols-12 gap-4" key={index}>
            <div>{resource.toUpperCase()}</div>
            <div className="col-span-11">
              <div className="flex">
                {AuthActionVerb.map((action, i) => {
                  const permission = [resource, action] as unknown as []
                  const hasPermission = checkExistsArray(permissions, permission)
                  return (
                    <div className="flex items-center mr-4 gap-2" key={i}>
                      <Checkbox
                        name={resource}
                        value={action}
                        onChange={onCheckboxChange}
                        defaultChecked={hasPermission}
                      />
                      <Label htmlFor="remember">{action}</Label>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )
      })}
    </Card>
  )
}
