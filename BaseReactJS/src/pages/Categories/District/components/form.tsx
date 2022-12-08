import { Button, Col, Form, Input, Modal, Row, Select } from "antd"
import { useFormik } from "formik"
import React, { memo, useEffect, useState } from "react"
import { validateFormDistricts } from "./validate"
import {} from "module"
import { useDispatch } from "react-redux"
import { HideModal } from "../../../../reducer/actions/modal.action"
import {
  CloseCircleOutlined,
  CloseOutlined,
  SaveOutlined
} from "@ant-design/icons"

const { Option } = Select
const FormDistricts = memo((props: any) => {
  const {
    openModal,
    titleModal,
    rowSelected,
    handleSaveDistrict,
    setRowSelected,
    listProvince,
    modalType,
    setIsSaveSuccess,
    isSaveSuccess
  } = props
  const dispatch = useDispatch()
  const [provinceId, setProvinceId] = useState<any>("")
  const [provinceName, setProvinceName] = useState<any>("")
  const formik = useFormik({
    validateOnMount: false,
    validateOnChange: true,
    enableReinitialize: true,
    initialValues: {
      code: rowSelected ? rowSelected.code : "",
      name: rowSelected ? rowSelected.name : "",
      provinceId: rowSelected ? rowSelected?.provinceId : ""
    },
    validationSchema: validateFormDistricts,
    onSubmit: values => {
      if (rowSelected && typeof rowSelected !== "undefined") {
        const data = {
          ...values,
          id: rowSelected?.id
        }
        handleSaveDistrict(data)
      } else {
        const data = {
          ...values
        }
        handleSaveDistrict(data)
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
    setProvinceId("")
    setProvinceName("")
    setIsSaveSuccess(false)
  }

  useEffect(() => {
    setProvinceId(rowSelected?.provinceId)
  }, [rowSelected])
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
          <Form.Item label="Tỉnh/thành phố" required>
            <Select
              allowClear
              showSearch
              value={provinceId ? provinceId : "-- Chọn Tỉnh/Thành phố --"}
              onChange={e => {
                formik.setFieldValue("provinceId", e)
                setProvinceId(e)
              }}
              optionFilterProp="children"
              placeholder="-- Chọn Tỉnh/Thành phố --"
              filterOption={(input, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {listProvince?.map((item, index) => {
                return (
                  <Option key={index} value={item.id}>
                    {item.name}
                  </Option>
                )
              })}
            </Select>
            {formik.errors.provinceId && formik.touched.provinceId ? (
              <div style={{ color: "red", fontStyle: "italic" }}>
                {formik.errors.provinceId}
              </div>
            ) : null}
          </Form.Item>
          <Form.Item label="Mã Quận/Huyện" required>
            <Input
              title="code"
              name="code"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.code ? formik.values.code : ""}
            />
            {formik.errors.code && formik.touched.code ? (
              <div style={{ color: "red", fontStyle: "italic" }}>
                {formik.errors.code}
              </div>
            ) : null}
          </Form.Item>

          <Form.Item label="Tên Quận/Huyện" required>
            <Input
              title="name"
              name="name"
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
export default FormDistricts
