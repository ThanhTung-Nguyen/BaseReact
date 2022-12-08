import { PlusCircleTwoTone } from "@ant-design/icons"
import { Button, Divider, PageHeader, Col, Form, Input, Row } from "antd"
import React from "react"
import { IFilterBannerProps } from "../types"

const Filter = React.memo(
  ({
    handleMultipleDelete,
    handleShowCreateModal,
    handleSearch
  }: IFilterBannerProps) => {
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      handleSearch(e.target.value)
    }

    return (
      <>
        <PageHeader
          title="Danh mục loại Banner/Popup"
          onBack={() => window.history.back()}
        />
        <Form
          layout="horizontal"
          labelCol={{ xs: 24, lg: 8 }}
          wrapperCol={{ xs: 24, lg: 16 }}
          labelAlign="left"
        >
          <Row gutter={24}>
            <Col md={6} flex={1}>
              <Form.Item label="Tiêu đề">
                <Input
                  name="name"
                  onChange={onInputChange}
                  placeholder="Nhập từ khóa cần tìm"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </>
    )
  }
)

export default Filter
