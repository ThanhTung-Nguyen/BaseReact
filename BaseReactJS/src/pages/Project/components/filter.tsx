import { Fragment, memo, useState } from "react"
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  PageHeader,
  Divider,
  DatePicker,
  Select
} from "antd"
import { RedoOutlined } from "@ant-design/icons"
import { useFormik } from "formik"

import { useDebounce } from "src/hooks"

const { Search } = Input
const { RangePicker } = DatePicker
const { Option } = Select

const Filter = memo((props: any) => {
  const { filters, setPageSize, onChangeFilter } = props

  const formik = useFormik({
    validateOnMount: false,
    validateOnChange: true,
    validateOnBlur: true,
    enableReinitialize: true,
    initialValues: {
      code: "",
      name: ""
    },
    onSubmit: values => {}
  })
  useDebounce(
    () => {
      onChangeFilter(formik.values)
    },
    [formik.values],
    1000
  )

  const handleReset = () => {
    formik.resetForm()
    setPageSize(10)
  }

  return (
    <div>
      <Fragment>
        <PageHeader
          title="Quản lý ứng dụng"
          // backIcon={<LeftOutlined />}
          onBack={() => window.history.back()}
          extra={[]}
        />

        <Form
          layout="horizontal"
          labelCol={{ xs: 24, lg: 8 }}
          wrapperCol={{ xs: 24, lg: 16 }}
          labelAlign="left"
        >
          <Row gutter={24}>
            <Col xs={24} lg={6}>
              <Form.Item label="Mã ứng dụng">
                <Input
                  name="code"
                  value={formik.values.code}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Nhập thông tin"
                />
              </Form.Item>
            </Col>
            <Col xs={24} lg={6}>
              <Form.Item label="Tên ứng dụng">
                <Input
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Nhập thông tin"
                />
              </Form.Item>
            </Col>

            <Col xs={24} lg={6}>
              <Button htmlType="reset" type="default" onClick={handleReset}>
                <RedoOutlined />
                Reset
              </Button>
            </Col>
          </Row>
        </Form>
      </Fragment>
    </div>
  )
})
export default Filter
