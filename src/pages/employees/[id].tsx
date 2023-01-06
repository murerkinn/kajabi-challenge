import Icon from '@ant-design/icons'
import { ArrowBack } from '@mui/icons-material'
import { Button, Card, Col, Row } from 'antd'
import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { ParsedUrlQuery } from 'querystring'

import EmployeeForm from '@/modules/employee/components/employee-form'
import EmployeeService from '@/modules/employee/service'
import { Employee } from '@/modules/employee/types'

type EmployeeDetailsPageProps = {
  employee?: Employee | null
}

const EmployeeDetailsPage = ({ employee = null }: EmployeeDetailsPageProps) => {
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
              <EmployeeForm data={employee} />
            </Card>
          </Col>
        </Row>
      </main>
    </>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { id } = ctx.params as ParsedUrlQuery

  try {
    const employee = await EmployeeService.getEmployeeById(id as string)

    return {
      props: {
        employee,
      },
    }
  } catch (e) {
    return {
      notFound: true,
    }
  }
}

export default EmployeeDetailsPage
