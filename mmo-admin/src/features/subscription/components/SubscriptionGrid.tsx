import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Button, Spinner } from 'flowbite-react'
import { useQueryParams, NumberParam, withDefault } from 'use-query-params'

import { DataTable } from 'components/Table'
import { useSubsQuery, Sub } from 'generated/graphql'

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from 'config/paging'
import { Link, useNavigate } from 'react-router-dom'
import { useNotification } from 'react-hook-notification'

export const SubscriptionGrid = () => {
  const [query, setQuery] = useQueryParams({
    pageIndex: withDefault(NumberParam, DEFAULT_PAGE_INDEX),
    pageSize: withDefault(NumberParam, DEFAULT_PAGE_SIZE),
  })

  const notification = useNotification()

  const navigate = useNavigate()

  const { pageIndex, pageSize } = query

  const { data, isLoading } = useSubsQuery({
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

  const columns = React.useMemo<ColumnDef<Sub>[]>(
    () => [
      {
        header: 'Username',
        cell: (info) => info.row.original.user.username,
      },
      {
        header: 'Plan',
        cell: (info) => info.row.original.plan.name,
      },
      {
        header: 'Status',
        accessorKey: 'status',
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
              <Link to={`/sub-history/${info.row.original.id}`} replace={false}>
                <Button>Detail</Button>
              </Link>
              {/* <Button color="failure" onClick={() => onDeleteRole(info.row.original.name)}>
                Delete
              </Button> */}
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
      <DataTable
        data={data?.subs.nodes as Sub[]}
        onPageChange={onPageChange}
        columns={columns}
        pagination={{
          pageIndex,
          pageSize,
          total: data?.subs.totalCount,
        }}
      />
    </div>
  )
}
