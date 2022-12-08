import { PlusCircleTwoTone } from "@ant-design/icons"
import { Button, DatePicker, PageHeader } from "antd"
import { useFormik } from "formik"
import React, { Fragment, memo, useState } from "react"

const { RangePicker } = DatePicker

const Filter = memo((props: any) => {
  const { hanndleShowModal, setModalType } = props

  const formik = useFormik({
    validateOnMount: false,
    validateOnChange: true,
    enableReinitialize: true,
    initialValues: {
      name: "",
      provinceCode: "",
      startDate: null,
      endDate: null,
      status: ""
    },
    onSubmit: values => {}
  })
  const handleReset = () => {
    formik.resetForm()
  }

  return (
    <Fragment>
      <PageHeader
        title="Danh mục Tỉnh/Thành phố"
        // backIcon={<LeftOutlined />}
        onBack={() => window.history.back()}
        className="site-page-header-responsive"
      />
    </Fragment>
  )
})
export default Filter
