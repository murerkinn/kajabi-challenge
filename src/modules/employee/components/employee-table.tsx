import Icon from '@ant-design/icons'
import EditIcon from '@mui/icons-material/Edit'
import { Button, Space, Typography } from 'antd'
import Link from 'next/link'
import { ParsedUrlQuery } from 'querystring'

import BaseTable from '@/components/base-table'
import updateQuery from '@/lib/update-query'

import { Employee } from '../types'

type EmployeeTableProps = {
  data: Employee[]
  loading: boolean
  total: number
}

const EmployeeTable = ({ data, loading, total }: EmployeeTableProps) => {
  return (
    <>
      <BaseTable
        dataSource={data}
        loading={loading}
        total={total}
        onChange={data => updateQuery(data as ParsedUrlQuery)}
        columns={[
          {
            key: 'id',
            dataIndex: 'id',
            title: 'ID',
            render: (id: number) => (
              <Typography.Text copyable>{id}</Typography.Text>
            ),
          },
          {
            key: 'email',
            dataIndex: 'email',
            title: 'Email',
            render: (email: string) => (
              <Typography.Text copyable>{email}</Typography.Text>
            ),
          },
          { key: 'firstName', dataIndex: 'first_name', title: 'First Name' },
          { key: 'lastName', dataIndex: 'last_name', title: 'Last Name' },
          {
            key: 'actions',
            title: 'Actions',
            align: 'right',
            render: (_, record) => (
              <Space>
                <Link legacyBehavior href={`/employees/${record.id}`}>
                  <Button icon={<Icon component={EditIcon as any} />} />
                </Link>
              </Space>
            ),
          },
        ]}
      />
    </>
  )
}

export default EmployeeTable
