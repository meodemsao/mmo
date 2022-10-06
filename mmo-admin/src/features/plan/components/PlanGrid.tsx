import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Button, Spinner } from 'flowbite-react'
import { useQueryParams, NumberParam, withDefault } from 'use-query-params'

import { DataTable } from 'components/Table'
import { useDeleteOneRoleMutation, usePlansQuery, Plan } from 'generated/graphql'

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from 'config/paging'
import { Link, useNavigate } from 'react-router-dom'
import { useNotification } from 'react-hook-notification'

export const PlanGrid = () => {
  const [query, setQuery] = useQueryParams({
    pageIndex: withDefault(NumberParam, DEFAULT_PAGE_INDEX),
    pageSize: withDefault(NumberParam, DEFAULT_PAGE_SIZE),
  })

  const notification = useNotification()

  const navigate = useNavigate()

  const { pageIndex, pageSize } = query

  const { data, isLoading } = usePlansQuery({
    where: {},
    skip: (pageIndex - 1) * pageSize,
    take: pageSize,
  })

  const { mutate, isSuccess } = useDeleteOneRoleMutation({})

  const onDeleteRole = (name: string) => {
    mutate(
      {
        name,
      },
      {
        onSuccess: () => {
          notification.success({
            title: 'Success',
            text: 'Role created successfully',
          })
          // reset();
          navigate(0)
        },
      }
    )
  }

  const onPageChange = (page: number) => {
    setQuery({
      pageIndex: page,
      pageSize: pageSize,
    })
  }

  const columns = React.useMemo<ColumnDef<Plan>[]>(
    () => [
      {
        Header: 'Name',
        accessorKey: 'name',
        cell: (info) => info.getValue(),
      },
      {
        Header: 'Price',
        accessorKey: 'price',
        cell: (info) => info.getValue(),
      },
      {
        header: 'Created',
        accessorKey: 'createdAt',
        cell: (info) => info.getValue(),
      },
      {
        header: 'Action',
        cell: (info) => {
          return (
            <div className="flex flex-row gap-2">
              <Link to={`/plans/edit/${info.row.original.id}`} replace={false}>
                <Button>Edit</Button>
              </Link>
              <Button color="failure" onClick={() => onDeleteRole(info.row.original.name)}>
                Delete
              </Button>
            </div>
          )
        },
      },
    ],
    []
  )

  if (isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!data) return null

  return (
    <div>
      <div className="flex gap-4 justify-end pb-4">
        <Link to={`/plans/create`} replace={false}>
          <Button>Create</Button>
        </Link>
        <Button>...</Button>
      </div>

      <DataTable
        data={data?.plans.nodes as Plan[]}
        onPageChange={onPageChange}
        columns={columns}
        pagination={{
          pageIndex,
          pageSize,
          total: data?.plans.totalCount,
        }}
      />
    </div>
  )
}
