import Icon from '@ant-design/icons'
import CategoryIcon from '@mui/icons-material/Category'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import { Button, Col, Layout, Menu, MenuTheme, Row, Typography } from 'antd'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

const { Header, Content, Footer, Sider } = Layout

const appMenuItems: ItemType[] = [
  {
    key: '/',
    label: <Link href="/">Dashboard</Link>,
    icon: <Icon component={() => <DashboardRoundedIcon />} />,
  },
  {
    key: '/employees',
    label: <Link href="/employees">Employees</Link>,
    icon: <Icon component={() => <CategoryIcon />} />,
  },
]

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()

  const renderMenu = useCallback(
    (theme: MenuTheme) => (
      <Menu
        theme={theme}
        selectedKeys={[router.pathname]}
        mode="inline"
        items={appMenuItems}
      />
    ),
    [router.pathname]
  )

  return (
    <Layout className="app-layout">
      <Sider collapsed={false} collapsedWidth={80} width={240}>
        <Link href="/" passHref>
          <Typography.Title
            level={2}
            style={{ color: '#fff', padding: '1rem 2.4rem 2rem' }}
          >
            kajabi
          </Typography.Title>
        </Link>
        {renderMenu('dark')}
      </Sider>

      <Layout>
        <Header>
          <Row>
            <Col style={{ marginLeft: 'auto' }}>
              <Button type="default">Sign out</Button>
            </Col>
          </Row>
        </Header>
        <Content>{children}</Content>
        <Footer>Kajabi © 2022</Footer>
      </Layout>
    </Layout>
  )
}

export default AppLayout
