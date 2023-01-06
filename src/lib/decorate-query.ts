import { ParsedUrlQuery } from 'querystring'

export default function decorateQuery(query: ParsedUrlQuery) {
  const params: { [key: string]: unknown } = {
    ...query,
    page: 1,
    pageSize: query.pageSize || 10,
  }

  return params
}
