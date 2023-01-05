import { Col, Input, Row, Table, TablePaginationConfig, TableProps } from 'antd'
import {
  FilterValue,
  Key,
  SorterResult,
  TableCurrentDataSource,
} from 'antd/lib/table/interface'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { ReactNode, useCallback, useState } from 'react'

import updateQuery from '@/lib/update-query'

import Pagination from './pagination'

const calculateShowingDataCount = (
  total: number,
  pageSize: number,
  page: number
) => {
  const startIndex = pageSize * (page - 1) + 1
  const endIndex = pageSize * page > total ? total : pageSize * page

  return `${startIndex} - ${endIndex}`
}

type Props<T> = TableProps<T> & {
  total?: number
  onChange?: (data: ParsedUrlQuery) => void
  selectedRows?: Key[]
  selectionActions?: JSX.Element
  searchFieldName?: string
}

const BaseTable = <T extends object>({
  dataSource,
  columns,
  loading,
  onChange,
  total,
  searchFieldName = 'query',
  ...tableProps
}: Props<T> & { children?: ReactNode }) => {
  const router = useRouter()
  const [query, setQuery] = useState(router.query[searchFieldName])
  const [pageSize, setPageSize] = useState(Number(router.query.pageSize || 10))
  const [page, setPage] = useState(Number(router.query.page || 1))

  const normalizeOnChangeData = useCallback(
    (
      pagination: TablePaginationConfig,
      filters: Record<string, FilterValue | null>,
      sorter: SorterResult<T> | SorterResult<T>[],
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      extra: TableCurrentDataSource<T>
    ) => {
      if (Array.isArray(sorter)) sorter = sorter[0]

      const normalizedData: ParsedUrlQuery = {
        page: pagination.current?.toString(),
        pageSize: pagination.pageSize?.toString(),
        sortBy: sorter.columnKey?.toString(),
        sortOrder: sorter.order || undefined,
        filters: filters as unknown as string[],
      }

      return normalizedData
    },
    []
  )

  const changePage = useCallback(
    (newPage: number) => {
      setPage(newPage)

      if (!onChange) return

      onChange({
        page: String(newPage),
      })
    },
    [onChange]
  )

  const changePageSize = useCallback(
    (newPageSize: number) => {
      setPageSize(newPageSize)

      if (dataSource && newPageSize >= dataSource?.length) {
        setPage(1)
      }

      if (!onChange) return

      onChange({
        pageSize: String(newPageSize),
        page:
          dataSource && newPageSize >= dataSource?.length
            ? '1'
            : page.toString(),
      })
    },
    [onChange, dataSource, page]
  )

  return (
    <Table
      {...tableProps}
      onChange={(...data) => {
        if (!onChange) return

        const normalizedData = normalizeOnChangeData(...data)

        onChange(normalizedData)
      }}
      className={cn('base-table', tableProps.className)}
      rowKey="id"
      scroll={{ x: 1300 }}
      dataSource={dataSource}
      columns={columns}
      loading={loading}
      pagination={{
        position: [],
        pageSize,
        current: page,
      }}
      title={() => (
        <Row gutter={[24, 24]} justify="space-between" align="middle">
          <Col style={{ paddingLeft: 0 }}>
            <Input.Search
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search..."
              onSearch={value => {
                setPage(1)
                updateQuery({ [searchFieldName]: value, page: '1' })
              }}
            />
          </Col>
          <Col>
            <Pagination
              currentPage={page}
              pageSize={pageSize}
              total={total || 0}
              setCurrentPage={changePage}
              setPageSize={changePageSize}
            />
          </Col>
        </Row>
      )}
      footer={() => (
        <Row justify="space-between" align="middle">
          <Col>
            {`Total ${total || 0} Results. Showing ${calculateShowingDataCount(
              total || 0,
              pageSize,
              page
            )}`}
          </Col>
          <Col>
            <Pagination
              currentPage={page}
              pageSize={pageSize}
              total={total || 0}
              setCurrentPage={changePage}
              setPageSize={changePageSize}
            />
          </Col>
        </Row>
      )}
    />
  )
}

export default BaseTable
