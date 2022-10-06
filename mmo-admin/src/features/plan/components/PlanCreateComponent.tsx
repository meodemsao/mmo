import { useNavigate } from 'react-router-dom'

import { ModeForm } from 'constants/enum/form'
import { PlanCreateInput, useCreateOnePlanMutation } from 'generated/graphql'
import { useNotification } from 'react-hook-notification'

import { PlanForm } from './PlanForm'

export const PlanCreateComponent = () => {
  const navigate = useNavigate()
  const notification = useNotification()
  const { mutate, isLoading } = useCreateOnePlanMutation()

  const onHandleSubmit = (data: PlanCreateInput) => {
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
          navigate('/plans')
        },
      }
    )
  }

  return (
    <PlanForm
      onSubmit={onHandleSubmit}
      title="Create plan"
      mode={ModeForm.Create}
      disableClick={isLoading}
    />
  )
}
