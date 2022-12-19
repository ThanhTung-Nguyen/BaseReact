import React, { memo, useState, useEffect } from "react"
import { Button, Col, Form, Row, Space, Switch, Table, Tooltip } from "antd"
import { ITableArticleCategoryProps } from "../types"
import { ColumnsType, TablePaginationConfig } from "antd/lib/table"
import { FilterValue } from "antd/lib/table/interface"
import {
  DeleteTwoTone,
  EditTwoTone,
  PlusCircleTwoTone
} from "@ant-design/icons"
import moment from "moment"
import { EditableCell, EditableRow } from "../../../../components/EditTable"
import { WrapperTableArticle } from "../styles"
import { WrapperTableButton } from "../../../stylepage"
import { TitleTooltip } from "src/constants/enum"
import { openConfirmModal } from "src/helpers/notification"
import axios from "axios"

const TableArticleCategory = memo(
  ({
    data,
    loading,
    page,
    pageSize,
    setSelectedRows,
    selectedRows,
    dataProject,
    handleChangePage,
    handleShowCreateModal,
    handleCreate,
    handleShowEditModal,
    handleEdit,
    handleDelete,
    handleChangeStatus,
    handleShowDetailModal,
    handleSubmit
  }: ITableArticleCategoryProps) => {
    const [filteredInfo, setFilterInfo] = useState<
      Record<string, FilterValue | null>
    >({})

    const columns: any = [
      {
        title: "Mã dự án",
        dataIndex: "id",
        width: "5%",
        render: (value, record) => {
          return <Tooltip title={TitleTooltip}>{value}</Tooltip>
        }
      },
      {
        title: "Tên dự án",
        dataIndex: "name",
        // render: (value, record) => {
        //   const findProject = dataProject?.find(
        //     item => item?.code == record?.projectCode
        //   )
        //   return (
        //     <Tooltip title={TitleTooltip}>{findProject?.name ?? ""}</Tooltip>
        //   )
        // }
        render: (value, record) => {
          return <Tooltip title={TitleTooltip}>{value}</Tooltip>
        }
      },
      {
        title: "Tên chuyên mục",
        dataIndex: "email",
        render: (value, record) => {
          return <Tooltip title={TitleTooltip}>{value}</Tooltip>
        }
      },
      {
        title: "Số đt",
        dataIndex: "phone",
        render: (value, record) => {
          return <Tooltip title={TitleTooltip}>{value}</Tooltip>
        }
      },
      {
        title: "Ngày sinh",
        dataIndex: "birthdate",
        render: (value, record) => {
          return <Tooltip title={TitleTooltip}>{value}</Tooltip>
        }
      },
      {
        title: "Giới tính",
        dataIndex: "sex",
        render: (value, record) => {
          return <Tooltip title={TitleTooltip}>{value}</Tooltip>
        }
      },
      {
        title: "Ngày tạo",
        dataIndex: "create_date",
        render: value => (
          <Tooltip title={TitleTooltip}>
            {moment(value, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss")}
          </Tooltip>
        )
      },
      {
        title: "Tài khoản tạo",
        dataIndex: "create_user",
        render: (value, record) => {
          return <Tooltip title={TitleTooltip}>{value}</Tooltip>
        }
      },
      {
        title: "Ngày cập nhật",
        dataIndex: "update_date",
        render: value => (
          <Tooltip title={TitleTooltip}>
            {moment(value, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss")}
          </Tooltip>
        )
      },
      {
        title: "Tài khoản update",
        dataIndex: "update_user",
        render: (value, record) => {
          return <Tooltip title={TitleTooltip}>{value}</Tooltip>
        }
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        render: (value, record) => {
          const onCheck = () => handleChangeStatus(record)
          return (
            <Space>
              <Switch checked={value === 1} disabled onChange={onCheck} />
              {value ? "Đã duyệt" : "Chưa duyệt"}
            </Space>
          )
        }
      },
      {
        title: "Thao tác",
        fixed: "right",
        dataIndex: "",
        width: 150,
        render: (value, record) => {
          const onEdit = () => handleShowEditModal(record)
          const onDelete = () => handleDelete(record)
          const onCreate = () => handleCreate(record)

          return (
            <Space size={10}>
              {/* <Button type="default" htmlType="button" onClick={onCreate}>
                <Tooltip title={`Thêm chuyên mục con cho ${record.name}`}>
                  <PlusCircleTwoTone twoToneColor="#26c705" />
                </Tooltip>
              </Button> */}
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
        catOrder: row.catOrder
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
                onClick={() => {
                  handleShowCreateModal()
                }}
              >
                <PlusCircleTwoTone twoToneColor="#26c705" /> Thêm mới
              </Button>
            </Col>
          </Row>
        </WrapperTableButton>
        <WrapperTableArticle>
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
            loading={loading}
            rowKey={records => records.id ?? ""}
            bordered
            columns={columnsData}
            components={components}
            rowClassName={"editable-row"}
            dataSource={data}
            onChange={handleChangeColumn}
            tableLayout="auto"
            size="middle"
            pagination={false}
            scroll={{ x: "calc(700px + 50%)" }}
          />
        </WrapperTableArticle>
      </>
    )
  }
)

export default TableArticleCategory
