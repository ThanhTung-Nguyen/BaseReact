import {
  CloseCircleOutlined,
  CloseOutlined,
  SaveOutlined
} from "@ant-design/icons"
import { Button, Col, Form, Input, Modal, Row } from "antd"
import { useFormik } from "formik"
import {} from "module"
import React, { memo, useEffect } from "react"
import { useDispatch } from "react-redux"
import { HideModal } from "../../../../reducer/actions/modal.action"
import { validateFormProvinces } from "./validate"

const FormProvinces = memo((props: any) => {
  const {
    openModal,
    titleModal,
    rowSelected,
    handleSaveProvince,
    setRowSelected,
    modalType,
    setIsSaveSuccess,
    isSaveSuccess
  } = props
  const dispatch = useDispatch()

  const formik = useFormik({
    validateOnMount: false,
    validateOnChange: true,
    enableReinitialize: true,
    initialValues: {
      code: rowSelected ? rowSelected.code : "",
      name: rowSelected ? rowSelected.name : ""
    },
    validationSchema: validateFormProvinces,
    onSubmit: values => {
      if (rowSelected.id) {
        const data = {
          ...values,
          id: rowSelected ? rowSelected.id : "",
          orders: rowSelected?.orders
        }
        handleSaveProvince(data)
      } else {
        const data = {
          ...values
        }
        handleSaveProvince(data)
      }
    }
  })
  useEffect(() => {
    if (isSaveSuccess) {
      handleClose()
    }
  }, [isSaveSuccess])

  const handleClose = () => {
    dispatch(HideModal())
    formik.resetForm()
    setRowSelected("")
    setIsSaveSuccess(false)
  }
  return (
    <div>
      <Modal
        title={titleModal}
        visible={openModal}
        onOk={() => formik.handleSubmit}
        closeIcon={<CloseOutlined onClick={handleClose} />}
        footer={[
          // <Button
          //   key="submit"
          //   type="primary"
          //   icon={<SaveOutlined />}
          //   // loading={loading}
          //   disabled={loadingSave}
          //   onClick={() => formik.handleSubmit()}
          // >
          //   Lưu
          // </Button>,
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
          <Form.Item label="Mã Tỉnh/Thành phố" required>
            <Input
              title="code"
              name="code"
              type="text"
              readOnly
              onChange={formik.handleChange}
              value={formik.values.code ? formik.values.code : ""}
            />
            {formik.errors.code && formik.touched.code ? (
              <div style={{ color: "red", fontStyle: "italic" }}>
                {formik.errors.code}
              </div>
            ) : null}
          </Form.Item>

          <Form.Item label="Tên Tỉnh/Thành phố" required>
            <Input
              title="name"
              name="name"
              readOnly
              onChange={formik.handleChange}
              value={formik.values.name ? formik.values.name : ""}
            />
            {formik.errors.name && formik.touched.name ? (
              <div style={{ color: "red", fontStyle: "italic" }}>
                {formik.errors.name}
              </div>
            ) : null}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
})
export default FormProvinces
