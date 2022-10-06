import { Table, Pagination } from 'flowbite-react'

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

interface DataTableProps<Data> {
  data: Data[]
  columns: ColumnDef<Data>[]
  pagination: {
    total: number
    pageIndex: number
    pageSize: number
  }
  onPageChange(page: number): void
}

export const DataTable = <Data extends object>({
  data,
  columns,
  pagination,
  onPageChange,
}: DataTableProps<Data>) => {
  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  })

  const totalPage = Math.ceil(pagination.total / pagination.pageSize)

  if (!data || data.length == 0) return null

  return (
    <>
      <Table striped={true}>
        {table.getHeaderGroups().map((headerGroup) => (
          <Table.Head key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Table.HeadCell key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </Table.HeadCell>
            ))}
          </Table.Head>
        ))}

        <Table.Body>
          {table.getRowModel().rows.map((row) => (
            <Table.Row key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Table.Cell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {totalPage > 1 ? (
        <Pagination
          currentPage={pagination.pageIndex}
          totalPages={totalPage}
          onPageChange={onPageChange}
        />
      ) : null}
    </>
  )
}
