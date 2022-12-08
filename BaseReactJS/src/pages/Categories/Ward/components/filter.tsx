import { Fragment, memo, useEffect, useState } from "react"
import { Form, Input, Button, Row, Col, PageHeader, Select } from "antd"
import { RedoOutlined } from "@ant-design/icons"
import { useFormik } from "formik"
import { useDebounce } from "src/hooks"
import { Response } from "src/constants/message"
import * as yup from "yup"

const { Option } = Select

const Filter = memo((props: any) => {
  const {
    hanndleShowModal,
    setModalType,
    onChangeFilter,
    listProvince,
    listDistrict,
    isSaveSuccess,
    setPageSize,
    setProvinceIdFilter,
    deleteStatus
  } = props

  const [changeProvince, setChangeProvince] = useState(false)

  const formik = useFormik({
    validateOnMount: false,
    validateOnChange: true,
    enableReinitialize: true,
    initialValues: {
      districtId: "",
      provinceId: ""
    },
    validationSchema: yup.object().shape({
      provinceId: yup.string().nullable().required("Chọn Tỉnh/Thành phố!"),
      districtId: yup.string().nullable().required("Chọn Quận/Huyện!")
    }),
    onSubmit: values => {}
  })

  useDebounce(
    () => {
      onChangeFilter(formik.values)
    },
    [formik.values],
    1000
  )

  useEffect(() => {
    if (changeProvince) {
      formik.setFieldValue("districtId", null)
      setChangeProvince(false)
    }
  }, [changeProvince])

  useEffect(() => {
    if (isSaveSuccess || deleteStatus == Response.STATUS_SUCCESS) {
      handleReset()
    }
  }, [isSaveSuccess, deleteStatus])

  const handleReset = () => {
    formik.resetForm()
    setPageSize(10)
    setChangeProvince(false)
  }
  return (
    <div>
      <Fragment>
        <PageHeader
          title="Danh mục Xã/Phường"
          // backIcon={<LeftOutlined />}
          onBack={() => window.history.back()}
        />
        <Form
          layout="horizontal"
          labelCol={{ xs: 24, lg: 8 }}
          wrapperCol={{ xs: 24, lg: 16 }}
        >
          <Row gutter={12}>
            <Col md={6} flex={1}>
              <Form.Item label="Tỉnh/thành" required>
                <Select
                  showSearch
                  allowClear
                  onBlur={formik.handleBlur}
                  value={formik.values.provinceId ?? "-- Chọn Tỉnh/thành --"}
                  optionFilterProp="children"
                  filterOption={(input, option: any) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={e => {
                    formik.setFieldValue("provinceId", e ?? "")
                    setProvinceIdFilter(e)
                    setChangeProvince(true)
                  }}
                  placeholder="-- Chọn Tỉnh/thành --"
                >
                  {listProvince?.map((item, index) => {
                    return (
                      <Option key={index} value={item.id}>
                        {item.name}
                      </Option>
                    )
                  })}
                </Select>
                {formik.errors.provinceId ? (
                  <div style={{ color: "red", fontStyle: "italic" }}>
                    {formik.errors.provinceId}
                  </div>
                ) : null}
              </Form.Item>
            </Col>
            <Col md={6} flex={1}>
              <Form.Item label="Quận/huyện" required>
                <Select
                  showSearch
                  allowClear
                  onBlur={formik.handleBlur}
                  value={formik.values.districtId ?? "-- Chọn Quận/huyện --"}
                  optionFilterProp="children"
                  filterOption={(input, option: any) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={e => {
                    formik.setFieldValue("districtId", e ?? "")
                  }}
                  placeholder="-- Chọn Quận/huyện  "
                >
                  {listDistrict?.map((item, index) => {
                    return (
                      <Option key={index} value={item.id}>
                        {item.name}
                      </Option>
                    )
                  })}
                </Select>
                {formik.errors.districtId ? (
                  <div style={{ color: "red", fontStyle: "italic" }}>
                    {formik.errors.districtId}
                  </div>
                ) : null}
              </Form.Item>
            </Col>

            <Col>
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
