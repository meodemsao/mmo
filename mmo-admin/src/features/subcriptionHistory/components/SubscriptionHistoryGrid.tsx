import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Spinner } from 'flowbite-react'
import { useQueryParams, NumberParam, withDefault } from 'use-query-params'

import { DataTable } from 'components/Table'
import { useSubHistoriesQuery, SubHistory } from 'generated/graphql'

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from 'config/paging'
import { useParams } from 'react-router-dom'

export const SubscriptionHistoryGrid = () => {
  const params = useParams()
  const [query, setQuery] = useQueryParams({
    pageIndex: withDefault(NumberParam, DEFAULT_PAGE_INDEX),
    pageSize: withDefault(NumberParam, DEFAULT_PAGE_SIZE),
  })

  const { pageIndex, pageSize } = query

  const { data, isLoading } = useSubHistoriesQuery({
    where: {
      subId: {
        equals: params.subId,
      },
    },
    skip: (pageIndex - 1) * pageSize,
    take: pageSize,
  })

  const onPageChange = (page: number) => {
    setQuery({
      pageIndex: page,
      pageSize: pageSize,
    })
  }

  const columns = React.useMemo<ColumnDef<SubHistory>[]>(
    () => [
      {
        header: 'Start',
        accessorKey: 'startAt',
        cell: (info) => info.getValue(),
      },
      {
        header: 'Expired',
        accessorKey: 'expiredAt',
        cell: (info) => info.getValue(),
      },
      {
        header: 'Created',
        accessorKey: 'createdAt',
        cell: (info) => info.getValue(),
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
        data={data?.subHistories.nodes as SubHistory[]}
        onPageChange={onPageChange}
        columns={columns}
        pagination={{
          pageIndex,
          pageSize,
          total: data?.subHistories.totalCount,
        }}
      />
    </div>
  )
}
