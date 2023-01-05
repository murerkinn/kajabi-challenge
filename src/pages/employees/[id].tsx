import Icon from '@ant-design/icons'
import { ArrowBack } from '@mui/icons-material'
import { Button, Card, Col, Row, Spin } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'

import useService from '@/hooks/use-service'
import EmployeeForm from '@/modules/employee/components/employee-form'
import EmployeeService from '@/modules/employee/service'

const EmployeeDetailsPage = () => {
  const { query } = useRouter()

  const { data, loading } = useService(
    () => EmployeeService.getEmployeeById(query.id as string),
    [query.id]
  )

  return (
    <>
      <main>
        <Row className="page-title">
          <Col>
            <Link legacyBehavior href="/employees">
              <Button icon={<Icon component={() => <ArrowBack />} />}>
                Back
              </Button>
            </Link>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Card>
              <Spin spinning={loading}>
                <EmployeeForm data={data} />
              </Spin>
            </Card>
          </Col>
        </Row>
      </main>
    </>
  )
}

export default EmployeeDetailsPage
