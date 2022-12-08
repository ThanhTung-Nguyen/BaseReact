import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { WrapperBanner } from "./styles"
import Filter from "./components/filter"
import TableBanner from "./components/table"
import { FormAction } from "src/constants/enum"
import FormBanner from "./components/form"
import { useDispatch } from "react-redux"
import { Modal } from "antd"
import _ from "lodash"
import {
  useQueryBannerTypes,
  useRemoveBannerType,
  useSaveBannerType
} from "src/graphql/categories/banner.graphql"

const BannerPage = () => {
  const [selectedRows, setSelectedRows] = useState<IBannerType[]>([])
  const [formAction, setFormAction] = useState<FormAction | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedRow, setSelectedRow] = useState<IBannerType | null>(null)
  const [filtered, setFiltered] = useState<object[]>([])
  const [showConfirm, setShowConfirm] = useState(false)
  const [variables, setVariables] = useState({
    page: 1,
    pageSize: 10,
    sorted: [],
    filtered
  })

  const [saveBannerType, { data: dataSave, loading: loadingSave }] =
    useSaveBannerType({}, variables)
  const [deleteBannerType] = useRemoveBannerType({}, variables)

  const onDelete = (selectedRow: IBannerType) => {
    if (selectedRow != null) {
      deleteBannerType({
        variables: {
          id: selectedRow.id
        }
      })
    }
    setSelectedRow(selectedRow)
    setShowConfirm(true)
  }

  const onCloseConfirm = () => {
    setShowConfirm(false)
    setSelectedRow(null)
  }

  const onConfirm = () => {
    if (selectedRow != null) {
      deleteBannerType({
        variables: {
          id: selectedRow.id
        }
      })
    }
    setShowConfirm(false)
    setSelectedRow(null)
  }

  const onShowDetailModal = (selectedRow: IBannerType) => {
    setSelectedRow(selectedRow)
    setFormAction(FormAction.DETAIL)
    setShowModal(true)
  }

  const onShowEditModal = (selectedRow: IBannerType) => {
    setSelectedRow(selectedRow)
    setFormAction(FormAction.EDIT)
    setShowModal(true)
  }

  const onShowCreateModal = () => {
    setSelectedRow(null)
    setFormAction(FormAction.CREATE)
    setShowModal(true)
  }

  const onCloseModal = () => {
    setShowModal(false)
    setFormAction(null)
    setSelectedRow(null)
  }

  const onCreate = (selectedRow: IBannerType) => {
    setSelectedRow({})
    setFormAction(FormAction.CREATE)
    setShowModal(true)
  }

  const onSubmit = (value: IBannerType) => {
    saveBannerType({
      variables: {
        input: {
          id: value.id,
          code: value.code,
          name: value.name,
          description: value.description,
          status: value.status
        }
      }
    })
    onCloseModal()
  }

  const onMultipleDelete = () => {}

  const onChangePage = (page: number, pageSize?: number) => {
    const request = {
      page,
      pageSize: pageSize ?? 10,
      sorted: [],
      filtered
    }
    setVariables(request)
  }

  const onChangeStatus = (selectedRow: IBannerType) => {}

  const onSearch = _.debounce((title?: string) => {
    const filtered: object[] = []
    if (title) {
      filtered.push({
        id: "name",
        value: title,
        operation: "~"
      })
    }
    const request = {
      page: 1,
      pageSize: 10,
      sorted: [],
      filtered
    }
    setFiltered(filtered)
    setVariables(request)
  }, 1000)

  return (
    <WrapperBanner>
      <Helmet>
        <title>Quản lý danh mục loại Banner/Popup</title>
        <meta name="description" content="Quản lý danh mục loại Banner/Popup" />
      </Helmet>
      <Filter
        handleMultipleDelete={onMultipleDelete}
        handleShowCreateModal={onShowCreateModal}
        handleSearch={onSearch}
      />
      <TableBanner
        data={[]}
        records={10}
        page={1}
        showLoading={false}
        pageSize={variables.pageSize}
        handleShowEditModal={onShowEditModal}
        handleShowDetailModal={onShowDetailModal}
        handleCreate={onCreate}
        handleDelete={onDelete}
        setSelectedRows={setSelectedRows}
        selectedRows={selectedRows}
        handleChangePage={onChangePage}
        handleChangeStatus={onChangeStatus}
        handleSubmit={onSubmit}
        handleShowCreateModal={onShowCreateModal}
      />
      <FormBanner
        list={[]}
        data={selectedRow}
        formAction={formAction}
        showModal={showModal}
        handleCloseModal={onCloseModal}
        handleSubmit={onSubmit}
        loadingSave={loadingSave}
      />
    </WrapperBanner>
  )
}

export default BannerPage
