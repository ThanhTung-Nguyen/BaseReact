import React from "react"
import {
  CloseCircleOutlined,
  CloseOutlined,
  SaveOutlined
} from "@ant-design/icons"
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Switch,
  TreeSelect
} from "antd"
import { IFormArticleCategoryProps } from "../types"
import { useFormik } from "formik"
import { FieldError } from "../styles"
import * as yup from "yup"
import { FormAction, StatusEnum } from "src/constants/enum"
import { Option } from "antd/lib/mentions"
import Uploader from "src/components/Uploader"
import { getTreeData } from "../utils"
import axios from "axios"

const FormArticleCategory = ({
  list,
  treeList,
  data,
  formAction,
  showModal,
  dataProject,
  dataForm,
  handleCloseModal,
  handleCreate,
  handleEdit
// handleSubmit
  
}:IFormArticleCategoryProps) => {
  const formik = useFormik<ICategory>({
    validateOnMount: false,
    validateOnChange: true,
    enableReinitialize: true,
    initialValues: {
      name: "",
      email: "",
      phone: "",
      status: 1
    },
    validationSchema: yup.object().shape({
      email: yup.string().required("Nhập vào tên chuyên mục"),
      name: yup.string().required("Chọn dự án")
    }),
    onSubmit: value => {
      console.log(value)
      if (isFormDetail) {
        return
      }
      // handleSubmit({
      //   // description: value.description,
      //   // id: value.id,
      //   name: value.name,
      //   email: value.email,
      //   phone: value.phone,
      //   status: value.status
      // })
      if (value.id) {
        handleCreate({
          name: value.name,
          email: value.email,
          phone: value.phone,
          status: value.status
        })
      }
      handleEdit({
        name: value.name,
        email: value.email,
        phone: value.phone,
        status: value.status
      })
    }
  })

  React.useEffect(() => {
    if (formAction === FormAction.CREATE) {
      if (data != null) {
        formik.setValues({
          name: "",
          status: 1
        })
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
        ? StatusEnum.CREATED
        : StatusEnum.ACTIVE
    )
  }

  const onParentChange = (value: string | number) => {
    formik.setFieldValue("parentId", value)
    formik.setFieldValue(
      "parent",
      list.find(val => val.id === value)
    )
  }

  const isFormDetail = formAction === FormAction.DETAIL

  return (
    <Modal
      title={
        formAction === FormAction.CREATE
          ? `Thêm mới chuyên mục`
          : formAction === FormAction.EDIT
          ? `Cập nhật chuyên mục`
          : `Chi tiết chuyên mục`
      }
      visible={showModal}
      closeIcon={<CloseOutlined onClick={handleCloseModal} />}
      // onCancel={handleCloseModal}
      // footer={isFormDetail ? null : undefined}
      okButtonProps={{
        disabled: Object.keys(formik.errors).length > 0
      }}
      onOk={onSubmit}
      footer={[
        <Button
          key="submit"
          type="primary"
          icon={<SaveOutlined />}
          // loading={loading}
          // disabled={loadingSave}
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
            <Form.Item label="Dự án" required>
              <>
                <Select
                  placeholder="Chọn dự án"
                  allowClear
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                  onChange={value => {
                    formik.setFieldValue("name", value)
                    formik.handleChange(value)
                    // console.log(value)
                  }}
                >
                  {dataForm?.map((element, item) => {
                    // console.log(element)

                    return (
                      <Select.Option
                        name="name"
                        key={item}
                        value={element.value}
                        // uniqueid={item.name}
                      >
                        {/* {element.value} */}
                      </Select.Option>
                    )
                  })}
                </Select>
                <FieldError error={!!formik.errors.name}>
                  {formik.errors.name}
                </FieldError>
              </>
            </Form.Item>
            <Form.Item label="Tên chuyên mục" required>
              <>
                <Input
                  title="email"
                  name="email"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                <FieldError error={!!formik.errors.email}>
                  {formik.errors.email}
                </FieldError>
              </>
            </Form.Item>

            <Form.Item label="Số điện thoại">
              <Input.TextArea
                title="phone"
                name="phone"
                onChange={formik.handleChange}
                value={formik.values.phone}
              />
              <FieldError error={!!formik.errors.phone}>
                {formik.errors.phone}
              </FieldError>
            </Form.Item>
            <Form.Item label="Trạng thái">
              <Space>
                <Switch
                  checked={formik.values.status === StatusEnum.ACTIVE}
                  onChange={onStatusChange}
                />
                {formik.values.status === StatusEnum.ACTIVE
                  ? "Đã duyệt"
                  : "Chưa duyệt"}
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default FormArticleCategory
