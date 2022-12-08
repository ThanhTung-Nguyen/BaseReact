import React, { memo, useState } from "react"
import {
  Button,
  Col,
  Form,
  Row,
  Space,
  Switch,
  Table,
  Tag,
  Tooltip
} from "antd"
import { ITableBannerProps } from "../types"
import { ColumnsType, TablePaginationConfig } from "antd/lib/table"
import { FilterValue } from "antd/lib/table/interface"
import {
  DeleteTwoTone,
  EditTwoTone,
  PlusCircleTwoTone
} from "@ant-design/icons"
import Image from "src/components/Image"
import moment from "moment"
import { EditableCell, EditableRow } from "../../../../components/EditTable"
import { WrapperTableBanner } from "../styles"
import { WrapperTableButton } from "../../../stylepage"
import { Status, StatusEnum, TitleTooltip } from "src/constants/enum"
import { openConfirmModal } from "src/helpers/notification"

const TableBanner = memo(
  ({
    data,
    page,
    pageSize,
    records,
    showLoading,
    setSelectedRows,
    selectedRows,
    handleChangePage,
    handleCreate,
    handleDelete,
    handleChangeStatus,
    handleShowEditModal,
    handleShowDetailModal,
    handleSubmit,
    handleShowCreateModal
  }: ITableBannerProps) => {
    const [filteredInfo, setFilterInfo] = useState<
      Record<string, FilterValue | null>
    >({})

    const columns: any = [
      {
        title: "Mã loại banner",
        dataIndex: "name",
        render: (value, record) => {
          return <Tooltip title={TitleTooltip}>{value}</Tooltip>
        }
      },
      {
        title: "Tên loại banner",
        dataIndex: "name",
        render: (value, record) => {
          return <Tooltip title={TitleTooltip}>{value}</Tooltip>
        }
      },
      {
        title: "Ngày tạo",
        dataIndex: "createDate",
        render: value => (
          <Tooltip title={TitleTooltip}>
            {moment(value).format("DD/MM/YYYY HH:mm:ss")}
          </Tooltip>
        )
      },
      // {
      //   title: "Ứng dụng",
      //   render: (value, records) => (
      //     <Space>
      //       {records?.isUserApp === 1 && (
      //         <Tooltip title={TitleTooltip}>
      //           <Tag>App User</Tag>
      //         </Tooltip>
      //       )}
      //       {records?.isDoctorApp === 1 && (
      //         <Tooltip title={TitleTooltip}>
      //           <Tag>App Doctor</Tag>
      //         </Tooltip>
      //       )}
      //     </Space>
      //   )
      // },
      // {
      //   title: "Số thứ tự",
      //   dataIndex: "typeOrder",
      //   editable: true
      // },
      {
        title: "Trạng thái",
        with: "80",
        dataIndex: "status",
        // filters: [
        //   { text: Status.ACTIVE.title, value: StatusEnum.ACTIVE },
        //   { text: Status.IN_ACTIVE.title, value: StatusEnum.INACTIVE }
        // ],
        // filteredValue: filteredInfo.status || null,
        // onFilter: (value, record) => record.status === value,
        render: (text, record) => {
          if (text === StatusEnum.INACTIVE) {
            return (
              <Tooltip title={TitleTooltip}>
                <Tag>{Status.IN_ACTIVE.title}</Tag>
              </Tooltip>
            )
          } else if (text === StatusEnum.ACTIVE) {
            return (
              <Tooltip title={TitleTooltip}>
                <Tag color={"blue"}>{Status.ACTIVE.title}</Tag>
              </Tooltip>
            )
          }
        }
      },
      {
        title: "Thao tác",
        fixed: "right",
        width: 100,
        render: (value, record) => {
          const onEdit = () => handleShowEditModal(record)
          const onDelete = () => handleDelete(record)

          return (
            <Space size={10}>
              <Button type="default" htmlType="button" onClick={onEdit}>
                <EditTwoTone />
              </Button>

              <Button
                type="default"
                htmlType="button"
                danger
                onClick={() =>
                  openConfirmModal(() => {
                    onDelete()
                  })
                }
              >
                <DeleteTwoTone twoToneColor="#eb1212" />
              </Button>
            </Space>
          )
        }
      }
    ]

    const handleSave = row => {
      const obj = {
        ...row,
        typeOrder: row.typeOrder
      }
      handleSubmit(obj)
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

    const handleChangeColumn = (
      pagination: TablePaginationConfig,
      filters: Record<string, FilterValue | null>
    ) => {
      setFilterInfo(filters)
    }

    return (
      <>
        <WrapperTableButton>
          <Row gutter={12} justify="end">
            <Col>
              <Button
                key="btnCreate"
                htmlType="button"
                type="default"
                className="btnCreate"
                onClick={() => handleShowCreateModal()}
              >
                <PlusCircleTwoTone twoToneColor="#26c705" /> Thêm mới
              </Button>
            </Col>
          </Row>
        </WrapperTableButton>
        <WrapperTableBanner>
          <Table
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
                  handleShowEditModal(record)
                }
              }
            }}
            onRow={(record, recordIndex) => ({
              onClick: () => {
                setSelectedRows([record?.id])
              },
              onDoubleClick: (event: any) => {
                handleShowEditModal(record)
              }
            })}
            rowKey={record => record.id ?? ""}
            loading={showLoading}
            bordered
            columns={columnsData}
            components={components}
            rowClassName={"editable-row"}
            dataSource={data}
            onChange={handleChangeColumn}
            tableLayout="auto"
            pagination={{
              total: records,
              current: page,
              pageSize,
              pageSizeOptions: ["10", "20", "30", "50"],
              onChange: handleChangePage,
              showSizeChanger: true,
              showQuickJumper: false,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`
            }}
            size="middle"
            scroll={{ x: "calc(700px + 50%)" }}
          />
        </WrapperTableBanner>
      </>
    )
  }
)

export default TableBanner
