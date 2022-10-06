import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Button, Spinner } from 'flowbite-react'
import { useQueryParams, NumberParam, withDefault } from 'use-query-params'

import { DataTable } from 'components/Table'
import { User, useUsersQuery } from 'generated/graphql'

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from 'config/paging'
import { Link } from 'react-router-dom'

export const UserGrid = () => {
  const [query, setQuery] = useQueryParams({
    pageIndex: withDefault(NumberParam, DEFAULT_PAGE_INDEX),
    pageSize: withDefault(NumberParam, DEFAULT_PAGE_SIZE),
  })

  const { pageIndex, pageSize } = query

  const { data, isLoading } = useUsersQuery({
    where: {},
    skip: (pageIndex - 1) * pageSize,
    take: pageSize,
  })

  const onPageChange = (page: number) => {
    setQuery({
      pageIndex: page,
      pageSize: pageSize,
    })
  }

  const columns = React.useMemo<ColumnDef<User>[]>(
    () => [
      {
        Header: 'Username',
        accessorKey: 'username',
        cell: (info) => info.getValue(),
      },
      {
        header: 'FirstName',
        accessorKey: 'firstname',
        cell: (info) => info.getValue(),
      },
      {
        header: 'Lastname',
        accessorKey: 'lastname',
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
              <Link to={`/users/assign/${info.row.original.username}`} replace={false}>
                <Button color="success">Assign</Button>
              </Link>
              <Button>Edit</Button>
              <Button>Delete</Button>
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
    <DataTable
      data={data?.users.nodes as User[]}
      onPageChange={onPageChange}
      columns={columns}
      pagination={{
        pageIndex,
        pageSize,
        total: data?.users.totalCount,
      }}
    />
  )
}
