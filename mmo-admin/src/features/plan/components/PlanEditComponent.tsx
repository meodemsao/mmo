import { useNavigate, useParams } from 'react-router-dom'

import { ModeForm } from 'constants/enum/form'
import { PlanCreateInput, usePlanQuery, useUpdateOnePlanMutation } from 'generated/graphql'
import { useNotification } from 'react-hook-notification'

import { PlanForm } from './PlanForm'
import { Spinner } from 'flowbite-react'

export const PlanEditComponent = () => {
  const navigate = useNavigate()
  const params = useParams()
  const { data, isLoading } = usePlanQuery({
    where: {
      id: params.id,
    },
  })

  const { mutate } = useUpdateOnePlanMutation()
  const notification = useNotification()

  const onHandleSubmit = (input: PlanCreateInput) => {
    mutate(
      {
        where: {
          id: params.id,
        },
        data: {
          name: {
            set: input.name as string,
          },
          price: {
            set: input.price,
          },
          duration: {
            set: input.duration,
          },
        },
      },
      {
        onSuccess: () => {
          notification.success({
            title: 'Success',
            text: 'Plan update successfully',
          })
          // reset();
          navigate('/plans')
        },
      }
    )
  }

  if (isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    )
  }

  console.log('data................', data)

  return (
    <PlanForm
      onSubmit={onHandleSubmit}
      defaultValues={data?.plan}
      title="Edit plan"
      mode={ModeForm.Edit}
      disableClick={isLoading}
    />
  )
}
