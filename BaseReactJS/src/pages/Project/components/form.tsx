import {
  CloseCircleOutlined,
  CloseOutlined,
  SaveOutlined
} from "@ant-design/icons"
import { Button, Col, Form, Grid, Input, Modal, Radio, Row, Switch } from "antd"
import TextArea from "antd/lib/input/TextArea"
import { useFormik } from "formik"
import {} from "module"
import React, { memo, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { StatusEnum } from "src/constants/enum"
import { HideModal } from "../../../reducer/actions/modal.action"
import { validateFormProject } from "./validate"
const { useBreakpoint } = Grid

const FormProject = memo((props: any) => {
  const {
    openModal,
    titleModal,
    rowSelected,
    handleSave,
    setRowSelected,
    listProvince,
    listBusiness,
    listSpecialist,
    handleApprove,
    handleLockDoctor,
    handleUnLockDoctor,
    isSaveSuccess,
    setIsSaveSuccess,
    numberQA,
    saveLoading
  } = props
  const screens = useBreakpoint()
  const dispatch = useDispatch()

  const [selectedStatus, setSelectedStatus] = useState(true)

  const formik = useFormik({
    validateOnMount: false,
    validateOnChange: true,
    enableReinitialize: true,
    initialValues: {
      name: rowSelected ? rowSelected.name : "",
      code: rowSelected ? rowSelected.code : "",
      status: rowSelected ? rowSelected.status : StatusEnum.ACTIVE,
      description: rowSelected ? rowSelected.description : "",
      defaultTopic: rowSelected ? rowSelected.defaultTopic : ""
    },
    validationSchema: validateFormProject,
    onSubmit: values => {
      if (rowSelected && typeof rowSelected !== "undefined") {
        const data = {
          ...values,
          id: rowSelected?.id
        }
        handleSave(data)
      } else {
        const data = {
          ...values
        }
        handleSave(data)
      }
    }
  })

  useEffect(() => {
    if (rowSelected) {
      if (rowSelected?.status == StatusEnum.ACTIVE) {
        setSelectedStatus(true)
      } else {
        setSelectedStatus(false)
      }
    }
  }, [rowSelected])

  useEffect(() => {
    if (isSaveSuccess) {
      handleClose()
    }
  }, [isSaveSuccess])

  const handleClose = () => {
    dispatch(HideModal())
    formik.resetForm()
    setRowSelected(null)
    setIsSaveSuccess(false)
  }
  const handleChangeStatus = value => {
    setSelectedStatus(value)
    formik.setFieldValue(
      "status",
      value ? StatusEnum.ACTIVE : StatusEnum.INACTIVE
    )
  }

  return (
    <div>
      <Modal
        title={titleModal}
        visible={openModal}
        style={{ marginTop: "10px" }}
        closeIcon={<CloseOutlined onClick={handleClose} />}
        width={screens.lg ? "30%" : "100%"}
        onOk={() => formik.handleSubmit()}
        footer={[
          <Button
            key="submit"
            type="primary"
            icon={<SaveOutlined />}
            disabled={saveLoading}
            onClick={() => formik.handleSubmit()}
          >
            Lưu
          </Button>,
          <Button
            key="back"
            icon={<CloseCircleOutlined />}
            onClick={handleClose}
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
          <Row>
            <Col lg={24}>
              <Form.Item label="Mã ứng dụng" required labelCol={{ lg: 5 }}>
                <Input
                  title="code"
                  name="code"
                  type="text"
                  onBlur={e => {
                    formik.setFieldValue(
                      "code",
                      e.target.value.replace(/\s+/g, "")
                    )
                    formik.handleBlur(e)
                  }}
                  readOnly={rowSelected ? true : false}
                  onChange={formik.handleChange}
                  value={formik.values.code ? formik.values.code : ""}
                />
                {formik.errors.code && formik.touched.code ? (
                  <div style={{ color: "red", fontStyle: "italic" }}>
                    {formik.errors.code}
                  </div>
                ) : null}
              </Form.Item>

              <Form.Item label="Tên ứng dụng" required labelCol={{ lg: 5 }}>
                <Input
                  title="name"
                  name="name"
                  type="text"
                  onBlur={e => {
                    formik.setFieldValue("name", e.target.value.trim())
                    formik.handleBlur(e)
                  }}
                  onChange={formik.handleChange}
                  value={formik.values.name ? formik.values.name : ""}
                />
                {formik.errors.name && formik.touched.name ? (
                  <div style={{ color: "red", fontStyle: "italic" }}>
                    {formik.errors.name}
                  </div>
                ) : null}
              </Form.Item>
              <Form.Item label="Mô tả" labelCol={{ lg: 5 }}>
                <TextArea
                  name="description"
                  rows={5}
                  onChange={formik.handleChange}
                  value={
                    formik.values.description ? formik.values.description : ""
                  }
                />
              </Form.Item>
              <Form.Item label="Chủ đề" required labelCol={{ lg: 5 }}>
                <Input
                  title="defaultTopic"
                  name="defaultTopic"
                  type="text"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={
                    formik.values.defaultTopic ? formik.values.defaultTopic : ""
                  }
                />
              </Form.Item>
              <Form.Item label="Trạng thái" required labelCol={{ lg: 5 }}>
                <Switch
                  key={"status"}
                  checked={selectedStatus}
                  onChange={value => handleChangeStatus(value)}
                />

                {formik.errors.status && formik.touched.status ? (
                  <div style={{ color: "red", fontStyle: "italic" }}>
                    {formik.errors.status}
                  </div>
                ) : null}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  )
})
export default FormProject
