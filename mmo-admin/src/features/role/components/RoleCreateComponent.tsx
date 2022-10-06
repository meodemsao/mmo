import { useNavigate } from 'react-router-dom'

import { ModeForm } from 'constants/enum/form'
import { RoleCreateInput, useCreateOneRoleMutation } from 'generated/graphql'
import { useNotification } from 'react-hook-notification'

import { RoleForm } from './RoleForm'

export const RoleCreateComponent = () => {
  const navigate = useNavigate()
  const notification = useNotification()
  const { mutate, isLoading } = useCreateOneRoleMutation()

  const onHandleSubmit = (data: RoleCreateInput) => {
    mutate(
      {
        data,
      },
      {
        onSuccess: () => {
          notification.success({
            title: 'Success',
            text: 'Role created successfully',
          })
          // reset();
          navigate('/roles')
        },
      }
    )
  }

  return (
    <RoleForm
      onSubmit={onHandleSubmit}
      title="Create role"
      mode={ModeForm.Create}
      disableClick={isLoading}
    />
  )
}
