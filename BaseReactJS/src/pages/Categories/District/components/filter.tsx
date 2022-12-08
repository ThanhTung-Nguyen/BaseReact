import {
  DeleteTwoTone,
  PlusCircleTwoTone,
  RedoOutlined
} from "@ant-design/icons"
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  PageHeader,
  Row,
  Select
} from "antd"
import { useFormik } from "formik"
import React, { Fragment, memo, useEffect, useState } from "react"

const { RangePicker } = DatePicker
const { Option } = Select

const Filter = memo((props: any) => {
  const {
    hanndleShowModal,
    setModalType,
    listProvince,
    setFilters,
    setPage,
    setPageSize,
    loading
  } = props
  const [startDate, setStartDate] = useState<any>(null)
  const [endDate, setEndDate] = useState<any>(null)
  const [selectedProvince, setSelectedProvince] = useState<any>()
  const [selectedStatus, setSelectedStatus] = useState<any>("")

  const formik = useFormik({
    validateOnMount: false,
    validateOnChange: true,
    enableReinitialize: true,
    initialValues: {
      provinceId: selectedProvince ?? ""
    },
    onSubmit: values => {}
  })

  useEffect(() => {
    if (listProvince?.length > 0) {
      setSelectedProvince(listProvince[0]?.id)
    }
  }, [listProvince])

  const handleReset = () => {
    formik.resetForm()
    setPage(1)
    setPageSize(10)
  }

  useEffect(() => {
    setTimeout(() => {
      setFilters(formik.values)
    }, 1000)
  }, [formik.values])
  return (
    <div>
      <Fragment>
        <PageHeader
          title="Danh mục Quận/Huyện"
          // backIcon={<LeftOutlined />}
          onBack={() => window.history.back()}
        />
        <Form
          layout="horizontal"
          wrapperCol={{ xs: 24, lg: 16 }}
          labelCol={{ xs: 24, lg: 8 }}
          onFinish={formik.handleSubmit}
        >
          <Row gutter={12}>
            <Col md={8}>
              <Form.Item label="Tỉnh/thành phố" required>
                <Select
                  showSearch
                  allowClear
                  value={
                    formik.values.provinceId
                      ? formik.values.provinceId
                      : selectedProvince
                  }
                  optionFilterProp="children"
                  filterOption={(input, option: any) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={e => {
                    formik.setFieldValue("provinceId", e ? e : "")
                  }}
                  placeholder="-- Chọn Tỉnh/Thành phố --"
                  loading={loading}
                >
                  {listProvince?.map((item, index) => {
                    return (
                      <Option key={index} value={item.id}>
                        {item.name}
                      </Option>
                    )
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col>
              <Button type="default" htmlType="reset" onClick={handleReset}>
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
