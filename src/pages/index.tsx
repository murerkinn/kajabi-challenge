import { Button, Card, Col, Row, Typography } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'

import usePaginatedService from '@/hooks/use-paginated-service'
import StatisticCard from '@/modules/dashboard/components/statistic-card'
import EmployeeTable from '@/modules/employee/components/employee-table'
import EmployeeService from '@/modules/employee/service'

const Home = () => {
  const { query } = useRouter()

  const {
    data: employees,
    loading: employeesLoading,
    pagination: employeesPagination,
  } = usePaginatedService(
    () => EmployeeService.listEmployees({ ...query, pageSize: '5' }),
    [query]
  )

  return (
    <>
      <main>
        <Row className="page-title">
          <Col>
            <Typography.Title>Dashboard</Typography.Title>
          </Col>
        </Row>

        <Row gutter={[24, 24]} style={{ marginBottom: '2rem' }}>
          <Col xs={24} sm={12} lg={6}>
            <StatisticCard />
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <StatisticCard />
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <StatisticCard />
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <StatisticCard />
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Card
              title={
                <Row
                  align="middle"
                  justify="space-between"
                  style={{ padding: '2.4rem 0' }}
                >
                  <Col>
                    <Typography.Title level={2}>Employees</Typography.Title>
                  </Col>

                  <Col>
                    <Link href="/employees" legacyBehavior>
                      <Button>View All</Button>
                    </Link>
                  </Col>
                </Row>
              }
              bodyStyle={{ padding: '0 2.4rem' }}
            >
              <EmployeeTable
                data={employees}
                loading={employeesLoading}
                total={employeesPagination.total}
                hideHeader
                hideFooter
              />
            </Card>
          </Col>
        </Row>
      </main>
    </>
  )
}

export default Home
