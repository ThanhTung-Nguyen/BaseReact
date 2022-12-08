import {
  DeleteTwoTone,
  EditTwoTone,
  PlusCircleTwoTone
} from "@ant-design/icons"
import { Button, Col, Image, Row, Space, Table, Tag, Tooltip } from "antd"
import React, { memo, useEffect, useState } from "react"
import { openConfirmModal } from "src/helpers/notification"
import { WrapperTableButton } from "src/pages/stylepage"
import { Status, StatusEnum, TitleTooltip } from "../../../constants/enum"
import { WrapperTableProject } from "../style"

const TableProject = memo((props: any) => {
  const {
    hanndleShowModal,
    data,
    setRowSelected,
    rowSelected,
    handleDelete,
    setModalType,
    page,
    pageSize,
    handleShowModalDetail,
    showLoading,
    handleChangeTable
  } = props

  const [changeStatus, setChangeStatus] = useState(true)
  const [newDataDoctor, setNewDataDoctor] = useState()
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [filteredInfo, setFilterInfo] = useState<any>({})

  const handleChangeColumn = (pagination, filters) => {
    setFilterInfo(filters)
  }

  const columns: any = [
    {
      title: "Mã ứng dụng",
      dataIndex: "code",
      ellipsis: true,
      render: (text, record) => {
        return <Tooltip title="Click đúp chuột để xem chi tiết">{text}</Tooltip>
      }
    },
    {
      title: "Tên ứng dụng",
      dataIndex: "name",
      align: "center",
      render: (text, record) => {
        return <Tooltip title="Click đúp chuột để xem chi tiết">{text}</Tooltip>
      }
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      render: (text, record) => {
        return <Tooltip title="Click đúp chuột để xem chi tiết">{text}</Tooltip>
      }
    },
    {
      title: "Trạng thái",

      with: "80",
      dataIndex: "status",
      filters: [
        { text: Status.ACTIVE.title, value: StatusEnum.ACTIVE },
        { text: Status.IN_ACTIVE.title, value: StatusEnum.INACTIVE }
      ],
      filteredValue: filteredInfo.status || null,
      onFilter: (value, record) => record.status === value,
      render: (text, record) => {
        if (record.status === StatusEnum.ACTIVE) {
          return (
            <Tooltip title={TitleTooltip}>
              <Tag color={"blue"}>{Status.ACTIVE.title}</Tag>
            </Tooltip>
          )
        } else if (record.status === StatusEnum.INACTIVE) {
          return (
            <Tooltip title={TitleTooltip}>
              <Tag>{Status.IN_ACTIVE.title}</Tag>
            </Tooltip>
          )
        }
      }
    },
    {
      title: "Thao tác",
      dataIndex: "",
      fixed: "right",
      render: record => {
        return (
          <Space>
            <Row gutter={12}>
              <Col>
                {" "}
                <Button
                  type="default"
                  key="btnEdit"
                  htmlType="button"
                  onClick={() => {
                    hanndleShowModal(record)
                  }}
                >
                  <EditTwoTone />
                </Button>
              </Col>
              <Col>
                <Button
                  type="default"
                  key="btnRemove"
                  htmlType="button"
                  danger
                  onClick={() =>
                    openConfirmModal(() => {
                      handleDelete(record.id)
                    })
                  }
                >
                  <DeleteTwoTone twoToneColor="#eb1212" />
                </Button>
              </Col>
            </Row>
          </Space>
        )
      }
    }
  ]

  return (
    <>
      <WrapperTableButton>
        <Row gutter={12} justify="end" className="tb-grid">
          <Col>
            <Button
              key="btnCreate"
              htmlType="button"
              type="default"
              className="btnCreate"
              onClick={() => hanndleShowModal()}
            >
              <PlusCircleTwoTone twoToneColor="#26c705" /> Thêm mới
            </Button>
          </Col>
        </Row>
      </WrapperTableButton>
      <WrapperTableProject>
        <Table
          rowKey={record => record.id}
          bordered
          loading={showLoading}
          rowSelection={{
            selectedRowKeys: selectedRows,
            selections: true,
            hideSelectAll: true,
            onSelect: (record, selected, nativeEvent) => {
              if (selectedRows?.length > 0) {
                setSelectedRows([])
              }
              if (selected) {
                setSelectedRows([record?.id])
                hanndleShowModal(record)
                setRowSelected(record)
              }
            }
          }}
          onRow={(record, recordIndex) => ({
            onClick: () => {
              setSelectedRows([record?.id])
            },
            onDoubleClick: (event: any) => {
              // if (event?.target?.nodeName === "TD") {
              hanndleShowModal(record)
              setRowSelected(record)
              // }
            }
          })}
          columns={columns}
          dataSource={data?.data}
          onChange={handleChangeTable}
          tableLayout="auto"
          pagination={{
            total: data?.records,
            current: page,
            pageSize: pageSize,
            pageSizeOptions: ["10", "20", "30", "50"],
            showSizeChanger: true,
            showQuickJumper: false,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`
          }}
          size="small"
          scroll={{ x: "calc(700px + 50%)" }}
        />
      </WrapperTableProject>
    </>
  )
})
export default TableProject
