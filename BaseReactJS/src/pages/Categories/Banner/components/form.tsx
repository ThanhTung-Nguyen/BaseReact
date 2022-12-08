import {
  CloseCircleOutlined,
  CloseOutlined,
  SaveOutlined
} from "@ant-design/icons"
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Space,
  Switch
} from "antd"
import TextArea from "antd/lib/input/TextArea"
import { useFormik } from "formik"
import React from "react"
import { FormAction, StatusEnum } from "src/constants/enum"
import * as yup from "yup"
import { FieldError } from "../styles"
import { IFormBannerProps } from "../types"

const FormBanner = ({
  list,
  data,
  formAction,
  showModal,
  handleCloseModal,
  handleSubmit,
  loadingSave
}: IFormBannerProps) => {
  const formik = useFormik<IBannerType>({
    validateOnMount: false,
    validateOnChange: true,
    enableReinitialize: true,
    initialValues: {
      name: "",
      code: "",
      description: "",
      status: StatusEnum.ACTIVE
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Nhập vào tên loại banner"),
      code: yup.string().required("Nhập vào mã loại banner")
    }),
    onSubmit: value => {
      if (isFormDetail) {
        return
      }

      handleSubmit(value)
    }
  })

  // console.log(`formik.values`, formik.values)

  React.useEffect(() => {
    if (formAction === FormAction.CREATE) {
      if (data != null) {
        formik.setValues(data)
      } else {
        formik.resetForm()
      }
    } else {
      if (data != null) {
        formik.setValues(data)
      }
    }
  }, [formAction])

  const onSubmit = () => {
    formik.handleSubmit()
  }

  const onStatusChange = () => {
    formik.setFieldValue(
      "status",
      formik.values.status === StatusEnum.ACTIVE
        ? StatusEnum.INACTIVE
        : StatusEnum.ACTIVE
    )
  }

  const isFormDetail = formAction === FormAction.DETAIL

  return (
    <Modal
      title={
        formAction === FormAction.CREATE
          ? `Thêm mới Banner/Popup`
          : formAction === FormAction.EDIT
          ? `Cập nhật Banner/Popup`
          : `Chi tiết Banner/Popup`
      }
      visible={showModal}
      closeIcon={<CloseOutlined onClick={handleCloseModal} />}
      onOk={onSubmit}
      footer={[
        <Button
          key="submit"
          type="primary"
          icon={<SaveOutlined />}
          // loading={loading}
          disabled={loadingSave}
          onClick={() => formik.handleSubmit()}
        >
          Lưu
        </Button>,
        <Button
          key="back"
          icon={<CloseCircleOutlined />}
          onClick={handleCloseModal}
        >
          Đóng
        </Button>
      ]}
    >
      <Form
        className="form-user"
        layout="horizontal"
        labelAlign="left"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={formik.handleSubmit}
      >
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item label="Mã loại banner" required>
              <Input
                title={formik.values.code}
                name="code"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.code}
                readOnly={data?.code ? true : false}
                onBlur={e => {
                  formik.setFieldValue(
                    "code",
                    e.target.value.replace(/\s+/g, "")
                  )
                  formik.handleBlur(e)
                }}
              />
              <FieldError error={!!formik.errors.code && formik.touched.code}>
                {formik.errors.code}
              </FieldError>
            </Form.Item>
            <Form.Item label="Tên loại banner" required>
              <Input
                title={formik.values.name}
                name="name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
                onBlur={e => {
                  formik.setFieldValue("name", e.target.value.trim())
                  formik.handleBlur(e)
                }}
              />
              <FieldError error={!!formik.errors.name && formik.touched.name}>
                {formik.errors.name}
              </FieldError>
            </Form.Item>

            <Form.Item label="Mô tả">
              <TextArea
                title={formik.values.description}
                name="description"
                rows={5}
                onChange={formik.handleChange}
                value={formik.values.description}
              />
              <FieldError error={!!formik.errors.description}>
                {formik.errors.description}
              </FieldError>
            </Form.Item>

            <Form.Item label="Trạng thái">
              <>
                <Space>
                  <Switch
                    checked={formik.values.status === StatusEnum.ACTIVE}
                    onChange={onStatusChange}
                  />
                  {formik.values.status === StatusEnum.ACTIVE
                    ? "Duyệt"
                    : "Không duyệt"}
                </Space>
                <FieldError error={!!formik.errors.status}>
                  {formik.errors.status}
                </FieldError>
              </>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default FormBanner
