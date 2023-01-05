import Icon from '@ant-design/icons'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { Button, Col, Form, Input, Row } from 'antd'
import { Modal } from 'antd'
import debounce from 'lodash/debounce'
import isMatch from 'lodash/isMatch'
import { useState } from 'react'

import useWarnOnCondition from '@/hooks/use-warn-on-condition'

import { Employee } from '../types'

interface EmployeeFormProps {
  data: Employee | null
}

type FormFields = 'email' | 'first_name' | 'last_name'

const EmployeeForm = ({ data }: EmployeeFormProps) => {
  const [unsavedChangesExist, setUnsavedChangesExist] = useState(false)

  useWarnOnCondition(
    unsavedChangesExist,
    () =>
      new Promise(resolve => {
        Modal.confirm({
          title: 'You have unsaved changes',
          content: `Your changes will be lost if you don't save them`,
          icon: <Icon component={() => <ErrorOutlineIcon />} />,
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk: () => resolve(true),
          onCancel: () => resolve(false),
        })
      })
  )

  const handleFormChange = debounce(value => {
    const formValuesChanged = !isMatch(data || {}, value)

    setUnsavedChangesExist(formValuesChanged)
  }, 300)

  return (
    <Form
      layout="vertical"
      initialValues={{
        email: data?.email,
        first_name: data?.first_name,
        last_name: data?.last_name,
      }}
      requiredMark={false}
      onValuesChange={(value: Record<FormFields, string>) =>
        handleFormChange(value)
      }
      onReset={() => setUnsavedChangesExist(false)}
    >
      <Form.Item
        name="email"
        label="Email"
        rules={[
          { type: 'email', message: 'Please enter a valid email address.' },
          { required: true, message: 'Email is required.' },
        ]}
      >
        <Input disabled />
      </Form.Item>

      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Form.Item
            name="first_name"
            label="First name"
            rules={[{ required: true, message: 'First name is required.' }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="last_name"
            label="Last name"
            rules={[{ required: true, message: 'Last name is required.' }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Row gutter={[8, 8]} align="middle" justify="end">
          {unsavedChangesExist && (
            <Col>
              <Button danger ghost htmlType="reset">
                Cancel
              </Button>
            </Col>
          )}

          <Col>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  )
}

export default EmployeeForm
