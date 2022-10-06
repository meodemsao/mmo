import { useNavigate, useParams } from 'react-router-dom'

import { ModeForm } from 'constants/enum/form'
import { RoleCreateInput, useRoleQuery, useUpdateOneRoleMutation } from 'generated/graphql'
import { useNotification } from 'react-hook-notification'

import { PlanForm } from './CategoryForm'
import { Spinner } from 'flowbite-react'

export const PlanEditComponent = () => {
  const navigate = useNavigate()
  const params = useParams()
  const { data, isLoading } = useRoleQuery({
    where: {
      id: {
        equals: params.id,
      },
    },
  })

  const { mutate } = useUpdateOneRoleMutation()
  const notification = useNotification()

  const onHandleSubmit = (input: RoleCreateInput) => {
    mutate(
      {
        where: {
          id: params.id,
        },
        data: {
          name: {
            set: input.name,
          },
          description: {
            set: input.description,
          },
        },
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

  if (isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!data) return null

  return (
    <PlanForm
      onSubmit={onHandleSubmit}
      defaultValues={data?.role}
      title="Edit plan"
      mode={ModeForm.Create}
      disableClick={isLoading}
    />
  )
}
