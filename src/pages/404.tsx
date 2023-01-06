import { Button, Col, Result, Row } from 'antd'
import Link from 'next/link'

const Error404Page = () => {
  return (
    <>
      <main>
        <Row justify="center" align="middle">
          <Col span={12}>
            <Result
              status="404"
              title="404"
              subTitle="Sorry, the page you visited does not exist."
              extra={
                <Link legacyBehavior href="/">
                  <Button type="primary">Back Home</Button>
                </Link>
              }
            />
          </Col>
        </Row>
      </main>
    </>
  )
}

export default Error404Page
