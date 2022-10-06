import { useNavigate, useParams } from 'react-router-dom'

import { ModeForm } from 'constants/enum/form'
import { RoleCreateInput, useRoleQuery, useUpdateOneRoleMutation } from 'generated/graphql'
import { useNotification } from 'react-hook-notification'

import { RoleForm } from './RoleForm'
import { Spinner } from 'flowbite-react'

export const RoleEditComponent = () => {
  const navigate = useNavigate()
  const params = useParams()
  const { data, isLoading } = useRoleQuery({
    where: {
      id: params.id,
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
            set: input.name as string,
          },
          description: {
            set: input.description as string,
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

  return (
    <RoleForm
      onSubmit={onHandleSubmit}
      defaultValues={data?.role}
      title="Edit role"
      mode={ModeForm.Edit}
      disableClick={isLoading}
    />
  )
}
