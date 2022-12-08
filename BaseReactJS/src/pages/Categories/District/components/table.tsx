import {
  DeleteTwoTone,
  EditTwoTone,
  FileExcelTwoTone,
  PlusCircleTwoTone
} from "@ant-design/icons"
import { Button, Col, Form, Row, Space, Table, Tag, Tooltip } from "antd"
import moment from "moment"
import React, { memo, useState } from "react"
import { Status, StatusEnum, TitleTooltip } from "src/constants/enum"
import { openConfirmModal } from "src/helpers/notification"
import { WrapperTableButton } from "../../../stylepage"

const TableDistricts = memo((props: any) => {
  const {
    hanndleShowModal,
    data,
    rowSelected,
    setRowSelected,
    handleDelete,
    setModalType,
    page,
    pageSize,
    handleChangePage,
    handleShowModalDetail,
    showLoading
  } = props

  const [changeStatus, setChangeStatus] = useState(true)
  const [filteredInfo, setFilterInfo] = useState<any>({})
  const [selectedRows, setSelectedRows] = useState<string[]>([])

  const handleChangeColumn = (pagination, filters) => {
    setFilterInfo(filters)
  }
  const handleChangeStatus = value => {
    setChangeStatus(!changeStatus)
  }

  const columns: any = [
    {
      title: "Mã quận/huyện",
      dataIndex: "code",
      render: (text, record) => {
        return <Tooltip title={TitleTooltip}>{text}</Tooltip>
      }
    },
    {
      title: "Tên quận/huyện",
      dataIndex: "name",
      render: (text, record) => {
        return <Tooltip title={TitleTooltip}>{text}</Tooltip>
      }
    },
    {
      title: "Ngày tạo",
      dataIndex: "createDate",
      render: (text, record) => {
        return (
          <Tooltip title={TitleTooltip}>
            {moment(text).format("DD/MM/YYYY hh:mm:ss")}
          </Tooltip>
        )
      }
      // render: text => {
      //   return moment(text).format("DD/MM/YYYY hh:mm:ss")
      // }
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
        if (text == StatusEnum.ACTIVE) {
          return (
            <Tooltip title={TitleTooltip}>
              <Tag color={"blue"}>{Status.ACTIVE.title}</Tag>
            </Tooltip>
          )
        } else if (text == StatusEnum.INACTIVE) {
          return (
            <Tooltip title={TitleTooltip}>
              <Tag>{Status.IN_ACTIVE.title}</Tag>
            </Tooltip>
          )
        }
      }
    }
    // {
    //   title: "Thao tác",
    //   dataIndex: "",
    //   fixed: "right",
    //   width: 100,
    //   render: record => {
    //     return (
    //       <Space>
    //         <Button
    //           type="default"
    //           htmlType="button"
    //           onClick={() => {
    //             hanndleShowModal(record)
    //             setModalType("update")
    //           }}
    //         >
    //           <EditTwoTone />
    //         </Button>
    //         <Button
    //           disabled={record.is_active == 0 ? true : false}
    //           type="default"
    //           htmlType="button"
    //           danger
    //           onClick={() =>
    //             openConfirmModal(() => {
    //               handleDelete(record.id)
    //             })
    //           }
    //         >
    //           <DeleteTwoTone twoToneColor="#eb1212" />
    //         </Button>
    //       </Space>
    //     )
    //   }
    // }
  ]
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelected(selectedRows)
    }
    // getCheckboxProps: record => ({
    // disabled: record.name === "Disabled User",
    // Column configuration not to be checked
    //   name: record.name
    // })
  }

  return (
    <>
      {/* <WrapperTableButton>
        <Row gutter={12} justify="end">
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
      </WrapperTableButton> */}
      <Table
        columns={columns}
        dataSource={data}
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
            hanndleShowModal(record)
            setRowSelected(record)
          }
        })}
        rowKey={row => row.id}
        onChange={handleChangeColumn}
        tableLayout="auto"
        pagination={{
          total: data?.records,
          current: page,
          pageSize: pageSize,
          pageSizeOptions: ["10", "20", "30", "50"],
          onChange: handleChangePage,
          showSizeChanger: true,
          showQuickJumper: false,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`
        }}
        size="middle"
        scroll={{ x: "calc(700px + 50%)" }}
      />
    </>
  )
})
export default TableDistricts
