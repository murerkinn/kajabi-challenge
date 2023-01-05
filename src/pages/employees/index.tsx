import { Card, Col, Row, Typography } from 'antd'
import Head from 'next/head'
import { useRouter } from 'next/router'

import usePaginatedService from '@/hooks/use-paginated-service'
import EmployeeTable from '@/modules/employee/components/employee-table'
import EmployeeService from '@/modules/employee/service'

const EmployeesPage = () => {
  const { query } = useRouter()

  const { data, loading, pagination } = usePaginatedService(
    () => EmployeeService.listEmployees(query),
    [query]
  )

  return (
    <>
      <Head>
        <title>Kajabi - Employees</title>
      </Head>

      <main>
        <Row className="page-title">
          <Col>
            <Typography.Title>Employees</Typography.Title>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Card>
              <EmployeeTable
                data={data}
                loading={loading}
                total={pagination.total}
              />
            </Card>
          </Col>
        </Row>
      </main>
    </>
  )
}

export default EmployeesPage
