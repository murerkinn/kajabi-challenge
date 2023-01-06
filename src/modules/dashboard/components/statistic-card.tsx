import { People } from '@mui/icons-material'
import { Card, Col, Row, Statistic } from 'antd'

const StatisticCard = () => {
  return (
    <Card>
      <Row gutter={24}>
        <Col>
          <People style={{ color: '#6d5ae6', height: '4rem', width: '4rem' }} />
        </Col>

        <Col>
          <Statistic title="Active Employees" value={112893} />
        </Col>
      </Row>
    </Card>
  )
}

export default StatisticCard
