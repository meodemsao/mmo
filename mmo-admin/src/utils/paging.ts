import queryString from 'query-string'

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from 'config/paging'

export const getPaging = (search: string) => {
  const params = queryString.parse(search)

  const pageIndex = params.pageIndex ? parseInt(params.pageIndex as string) : DEFAULT_PAGE_INDEX
  const pageSize = params.pageSize ? parseInt(params.pageSize as string) : DEFAULT_PAGE_SIZE

  return { pageIndex, pageSize }
}
