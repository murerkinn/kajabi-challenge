import { Button, Card, Col, Row, Typography } from 'antd'
import Link from 'next/link'

import StatisticCard from '@/modules/dashboard/components/statistic-card'
import EmployeeTable from '@/modules/employee/components/employee-table'

const Home = () => {
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
                data={[]}
                loading={false}
                total={0}
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
