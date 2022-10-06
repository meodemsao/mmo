import { useNavigate, useParams } from 'react-router-dom'
import Select, { ActionMeta, OnChangeValue } from 'react-select'
import {
  useAssignUserMutation,
  useDeAssignUserMutation,
  useGetUserRolesQuery,
  useRolesQuery,
} from 'generated/graphql'
import { useNotification } from 'react-hook-notification'
import { Spinner } from 'flowbite-react'
import { useEffect, useState } from 'react'
import _ from 'lodash'

interface RoleOption {
  key: string
  value: string
}

export const AssignRoleComponent = () => {
  const params = useParams()
  const notification = useNotification()
  const [currentRoles, setCurrentRoles] = useState<RoleOption[]>()

  const { data: roleQueryData, isLoading: isLoadingRolesQuery } = useRolesQuery({})

  const {
    status,
    data: getUserRolesQueryData,
    isLoading: isLoadingGetUserRolesQuery,
  } = useGetUserRolesQuery({
    username: params.username as string,
  })

  const { mutate: mutateAssignUser } = useAssignUserMutation()
  const { mutate: mutateDeAssignUser } = useDeAssignUserMutation()

  useEffect(() => {
    if (status === 'success') {
      setCurrentRoles(
        getUserRolesQueryData.getUserRoles.map((role) => ({
          value: role,
          label: role,
        })) as unknown as RoleOption[]
      )
    }
  }, [status, getUserRolesQueryData])

  const handleChange = (
    values: OnChangeValue<RoleOption, true>,
    actionMeta: ActionMeta<RoleOption>
  ) => {
    switch (actionMeta.action) {
      case 'remove-value':
        const changeRoleRemove = _.differenceWith(currentRoles as RoleOption[], values, _.isEqual)
        mutateDeAssignUser(
          {
            username: params.username as string,
            rolename: changeRoleRemove[0].value,
          },
          {
            onSuccess: () => {
              notification.success({
                title: 'Success',
                text: 'Deassign role successfully',
              })
            },
          }
        )
        break
      case 'select-option':
        const changeRoleAdd = _.differenceWith(values, currentRoles as RoleOption[], _.isEqual)
        mutateAssignUser(
          {
            username: params.username as string,
            rolename: changeRoleAdd[0].value,
          },
          {
            onSuccess: () => {
              notification.success({
                title: 'Success',
                text: 'Assign role successfully',
              })
            },
          }
        )

        break
    }

    setCurrentRoles(values as RoleOption[])
  }

  if (isLoadingRolesQuery || isLoadingGetUserRolesQuery) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!roleQueryData || !getUserRolesQueryData) return null

  const roles = roleQueryData.roles.nodes?.map((role) => ({
    value: role.name,
    label: role.name,
  })) as unknown as RoleOption[]

  const defaultRole = getUserRolesQueryData.getUserRoles.map((role) => ({
    value: role,
    label: role,
  })) as unknown as RoleOption[]

  return (
    <Select
      defaultValue={defaultRole}
      isMulti
      name="colors"
      options={roles}
      className="basic-multi-select"
      classNamePrefix="select"
      onChange={handleChange}
    />
  )
}
