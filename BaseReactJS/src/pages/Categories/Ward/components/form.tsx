import { Button, Col, Form, Input, Modal, Row, Select, Switch } from "antd"
import { Option } from "antd/lib/mentions"
import { useFormik } from "formik"
import { memo, useEffect, useState } from "react"
import { validateFormWards } from "./validate"
import {} from "module"
import { useDispatch } from "react-redux"
import { HideModal } from "../../../../reducer/actions/modal.action"
import {
  CloseCircleOutlined,
  CloseOutlined,
  SaveOutlined
} from "@ant-design/icons"
import { StatusEnum } from "src/constants/enum"

const FormWards = memo((props: any) => {
  const {
    openModal,
    titleModal,
    rowSelected,
    handleSaveWard,
    setRowSelected,
    listProvince,
    listDistrict,
    setIsSaveSuccess,
    isSaveSuccess,
    setProvinceId,
    provinceId,
    loadingSave
  } = props
  const dispatch = useDispatch()
  const [districtId, setDistrictId] = useState<any>("")
  const [provinceName, setProvinceName] = useState<any>("")
  const [districtName, setDistrictName] = useState<any>("")
  const [checkStatus, setCheckStatus] = useState<boolean>(true)

  const formik = useFormik({
    validateOnMount: false,
    validateOnChange: true,
    enableReinitialize: true,
    initialValues: {
      provinceId: rowSelected ? rowSelected.provinceId : "",
      districtId: rowSelected ? rowSelected.districtId : "",
      code: rowSelected ? rowSelected.code : "",
      name: rowSelected ? rowSelected.name : "",
      status: rowSelected ? rowSelected.status : StatusEnum.ACTIVE
    },
    validationSchema: validateFormWards,
    onSubmit: values => {
      if (rowSelected && typeof rowSelected !== "undefined") {
        const data = {
          ...values,
          id: rowSelected?.id
        }
        handleSaveWard(data)
      } else {
        const data = {
          ...values
        }
        handleSaveWard(data)
      }
    }
  })
  useEffect(() => {
    if (isSaveSuccess) {
      handleClose()
    }
  }, [isSaveSuccess])
  useEffect(() => {
    if (
      rowSelected &&
      typeof rowSelected !== "undefined" &&
      rowSelected !== ""
    ) {
      setProvinceId(rowSelected?.provinceId)
    }
  }, [provinceId, rowSelected])

  const handleClose = () => {
    dispatch(HideModal())

    formik.resetForm()
    setRowSelected("")
    setProvinceId("")
    setProvinceName("")
    setDistrictName("")
    setDistrictId("")
    setIsSaveSuccess(false)
    setCheckStatus(true)
  }

  useEffect(() => {
    setProvinceId(rowSelected.provinceId)
    setDistrictId(rowSelected.districtId)
  }, [rowSelected])

  const handleChangeStatus = value => {
    setCheckStatus(value)
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
        closeIcon={<CloseOutlined onClick={handleClose} />}
        onOk={() => formik.handleSubmit()}
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
            onClick={handleClose}
          >
            Đóng
          </Button>
        ]}
      >
        <Form
          className="form-user"
          layout="horizontal"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={formik.handleSubmit}
        >
          <Form.Item label="Tỉnh/Thành phố" required>
            <Select
              allowClear
              showSearch
              value={provinceId ? provinceId : "-- Chọn Tỉnh/Thành phố --"}
              onChange={(e: any) => {
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
          <Form.Item label="Quận/Huyện" required>
            <Select
              allowClear
              showSearch
              value={districtId ? districtId : "-- Chọn Quận/Huyện --"}
              onChange={(e: any) => {
                formik.setFieldValue("districtId", e)
                setDistrictId(e)
              }}
              optionFilterProp="children"
              placeholder="-- Chọn Quận/Huyện --"
              filterOption={(input, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {listDistrict?.map((item, index) => {
                return (
                  <Option key={index} value={item.id}>
                    {item.name}
                  </Option>
                )
              })}
            </Select>
            {formik.errors.districtId && formik.touched.districtId ? (
              <div style={{ color: "red", fontStyle: "italic" }}>
                {formik.errors.districtId}
              </div>
            ) : null}
          </Form.Item>
          <Form.Item label="Mã Xã/Phường" required>
            <Input
              title="code"
              name="code"
              type="text"
              onBlur={e => {
                formik.setFieldValue("code", e.target.value.replace(/\s+/g, ""))
                formik.handleBlur(e)
              }}
              onChange={formik.handleChange}
              value={formik.values.code ? formik.values.code : ""}
            />
            {formik.errors.code && formik.touched.code ? (
              <div style={{ color: "red", fontStyle: "italic" }}>
                {formik.errors.code}
              </div>
            ) : null}
          </Form.Item>

          <Form.Item label="Tên Xã/Phường" required>
            <Input
              title="name"
              name="name"
              onChange={formik.handleChange}
              onBlur={e => {
                formik.setFieldValue("name", e.target.value.trim())
                formik.handleBlur(e)
              }}
              value={formik.values.name ? formik.values.name : ""}
            />
            {formik.errors.name && formik.touched.name ? (
              <div style={{ color: "red", fontStyle: "italic" }}>
                {formik.errors.name}
              </div>
            ) : null}
          </Form.Item>
          <Form.Item label="Trạng thái" required>
            <Switch
              key={"status"}
              checked={
                formik?.values?.status == StatusEnum.ACTIVE ? true : false
              }
              onChange={value => handleChangeStatus(value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
})
export default FormWards
