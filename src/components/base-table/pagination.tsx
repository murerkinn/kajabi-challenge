import Icon from '@ant-design/icons'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import { Dropdown, Pagination as AntPagination, Space } from 'antd'

interface Props {
  currentPage: number
  pageSize: number
  total: number
  setCurrentPage: (current: number) => void
  setPageSize: (size: number) => void
}

const dropdownMenuItems = ['5', '10', '20', '50', '100'].map(v => ({
  key: v,
  label: v,
}))

const Pagination = ({
  currentPage,
  pageSize,
  total,
  setCurrentPage,
  setPageSize,
}: Props) => {
  return (
    <Space>
      <Dropdown.Button
        menu={{
          selectable: !!pageSize.toString(),
          selectedKeys: [pageSize.toString()],
          defaultValue: pageSize.toString(),
          items: dropdownMenuItems,
          onClick: v => setPageSize(Number(v.key)),
        }}
        icon={<Icon component={KeyboardArrowDownRoundedIcon as any} />}
      >
        {dropdownMenuItems.find(filter => filter.key === pageSize.toString())
          ?.label || dropdownMenuItems[0].label}
      </Dropdown.Button>

      <AntPagination
        total={total}
        pageSize={pageSize}
        current={currentPage}
        onChange={currentPage => setCurrentPage(currentPage)}
        simple
      />
    </Space>
  )
}

export default Pagination
