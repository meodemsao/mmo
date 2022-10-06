import { useNavigate } from 'react-router-dom'

import { ModeForm } from 'constants/enum/form'
import { RoleCreateInput, useCreateOneRoleMutation } from 'generated/graphql'
import { useNotification } from 'react-hook-notification'

import { PlanForm } from './CategoryForm'

export const PlanCreateComponent = () => {
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
    <PlanForm
      onSubmit={onHandleSubmit}
      title="Create plan"
      mode={ModeForm.Edit}
      disableClick={isLoading}
    />
  )
}
