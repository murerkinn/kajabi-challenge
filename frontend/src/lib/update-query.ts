import Router from 'next/router'
import { ParsedUrlQuery } from 'querystring'

export default function updateQuery(newQueryParams: ParsedUrlQuery) {
  const query = { ...Router.query, ...newQueryParams }

  for (const key in query) {
    if (!query[key]) delete query[key]
  }

  if (JSON.stringify(query) == JSON.stringify(Router.query)) return

  Router.push({ query }, undefined, { shallow: true })
}
