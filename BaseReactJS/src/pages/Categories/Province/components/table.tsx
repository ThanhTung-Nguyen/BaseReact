import {
  DeleteTwoTone,
  EditTwoTone,
  PlusCircleTwoTone
} from "@ant-design/icons"
import { Button, Col, Form, Row, Space, Table, Tag, Tooltip } from "antd"
import React, { memo, useState } from "react"
import { Status, StatusEnum, TitleTooltip } from "src/constants/enum"
import { openConfirmModal } from "src/helpers/notification"
import { WrapperTableButton } from "../../../stylepage"
import { EditableCell, EditableRow } from "../../../../components/EditTable"
import { WrapperTableProvince } from "../province"
import moment from "moment"

const TableProvinces = memo((props: any) => {
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
    showLoading,
    handleSaveProvince
  } = props
  const EditableContext = React.createContext({})
  const [filteredInfo, setFilterInfo] = useState<any>({})
  const [selectedRows, setSelectedRows] = useState<string[]>([])

  const [changeStatus, setChangeStatus] = useState(true)
  const handleChangeStatus = value => {
    setChangeStatus(!changeStatus)
  }

  const handleChangeColumn = (pagination, filters) => {
    setFilterInfo(filters)
  }

  const columns: any = [
    {
      title: "Mã Tỉnh/Thành phố",
      dataIndex: "code",
      render: value => {
        return <Tooltip title={TitleTooltip}>{value}</Tooltip>
      }
    },
    {
      title: "Tên Tỉnh/Thành phố",
      dataIndex: "name",
      render: value => {
        return <Tooltip title={TitleTooltip}>{value}</Tooltip>
      }
    },
    {
      title: "Ngày tạo",
      dataIndex: "createDate",
      render: value => {
        return (
          <Tooltip title={TitleTooltip}>
            {moment(value).format("DD/MM/YYYY hh:mm:ss")}
          </Tooltip>
        )
      }
      // render: text => {
      //   return moment(text).format("DD/MM/YYYY hh:mm:ss")
      // }
    },
    {
      title: "Số thứ tự",
      dataIndex: "orders",
      width: "15%",
      editable: true
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
  }
  const handleSave = row => {
    const obj = {
      id: row.id,
      code: row.code,
      name: row.name,
      orders: row.orders
    }
    handleSaveProvince(obj)
  }

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell
    }
  }
  const columnsData = columns?.map(col => {
    if (!col.editable) {
      return col
    }

    return {
      ...col,
      onCell: record => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave
      })
    }
  })

  return (
    <>
      {/* <WrapperTableButton>
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
      </WrapperTableButton> */}
      <WrapperTableProvince>
        <Table
          columns={columnsData}
          // components={components}
          dataSource={data?.data}
          bordered
          loading={showLoading}
          rowClassName={() => "editable-row"}
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
          rowKey={record => record.id}
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
      </WrapperTableProvince>
    </>
  )
})
export default TableProvinces
