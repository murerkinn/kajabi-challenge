import { ParsedUrlQuery } from 'querystring'

export default function decorateQuery(query: ParsedUrlQuery) {
  const params: { [key: string]: unknown } = {
    page: 1,
    per_page: query.pageSize || 10,
    ...query,
  }

  return params
}
