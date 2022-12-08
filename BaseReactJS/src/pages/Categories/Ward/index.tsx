import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useDispatch, useSelector } from "react-redux"
import { Response } from "src/constants/message"
import { useLazyQueryDistrict } from "src/graphql/categories/district.graphql"
import { useQueryProvince } from "src/graphql/categories/province.graphql"
import {
  useLazyQueryWard,
  useQueryWard,
  useRemoveWard,
  useSaveWard
} from "src/graphql/categories/ward.graphql"
import {
  ChangeTitleModal,
  ShowModal
} from "../../../reducer/actions/modal.action"
import Filter from "./components/filter"
import FormWard from "./components/form"
import TableWard from "./components/table"
import { WrapperWard } from "./style"

const WardPages = (props: any) => {
  const [rowSelected, setRowSelected] = useState("")
  const [modalType, setModalType] = useState<any>("")
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [filters, setFilters] = useState<any>({})
  const [modalDetail, setModalDetail] = useState(false)
  const [isSaveSuccess, setIsSaveSuccess] = useState(false)
  const [provinceId, setProvinceId] = useState<String>("")
  const [provinceIdFilter, setProvinceIdFilter] = useState<String>("")
  const [variables, setVariables] = useState<any>({
    page: page,
    pageSize: pageSize,
    filtered: [],
    sorted: [{ id: "createDate", desc: true }]
  })

  const dispatch = useDispatch()
  const { openModal, titleModal } = useSelector((state: any) => ({
    openModal: state.ModalReducer.showModal,
    titleModal: state.ModalReducer.title
  }))

  const [saveWard, { data: saveResponse, loading: loadingSave }] = useSaveWard(
    {},
    variables
  )
  const [deleteWard, { data: deleteResponse }] = useRemoveWard({}, variables)

  const hanndleShowModal = value => {
    if (value && typeof value !== "undefined") {
      setRowSelected(value)
      dispatch(ChangeTitleModal("Cập nhật"))
    } else {
      dispatch(ChangeTitleModal("Thêm mới"))
    }
    dispatch(ShowModal())
  }

  const handleShowModalDetail = () => {
    setModalDetail(!modalDetail)
  }

  const handleSaveWard = input => {
    saveWard({
      variables: {
        input
      }
    })
  }

  const handleDelete = id => {
    deleteWard({
      variables: {
        id
      }
    })
  }

  useEffect(() => {
    if (provinceId || provinceIdFilter) {
    }
  }, [provinceId, provinceIdFilter])

  const fetchData = (request: any, filters?: any) => {
    if (filters) {
      Object.keys(filters).forEach(item => {
        if (item === "provinceId" && filters.provinceId !== "") {
          request.filtered.push({
            id: "provinceId",
            value: filters.provinceId,
            operation: "=="
          })
        }

        if (item === "districtId" && filters.districtId !== "") {
          request.filtered.push({
            id: "districtId",
            value: filters.districtId,
            operation: "=="
          })
        }

        if (item === "status" && filters.status) {
          request.filtered.push({
            id: item,
            value: filters.status,
            operation: "in"
          })
        }
      })
    }
    setVariables(request)
  }

  const onChangeFilter = value => {
    const editedFilters = { ...filters, ...value }
    fetchData(
      {
        page,
        pageSize,
        filtered: [],
        sorted: [{ id: "createDate", desc: true }]
      },
      editedFilters
    )
    setFilters(editedFilters)
  }

  const handleChangeTable = (pagination: any, tableFilters: any) => {
    const editedFilters = {
      ...filters,
      status: tableFilters.status?.toString() ?? "",
      isSuggest: tableFilters.isSuggest?.toString() ?? ""
    }
    fetchData(
      {
        page: pagination.current ?? page,
        pageSize: pagination.pageSize ?? pageSize,
        filtered: [],
        sorted: [{ id: "createDate", desc: true }]
      },
      editedFilters
    )
    setPageSize(pagination.pageSize ?? pageSize)
    // setPage(pagination.current ?? 1)
    setFilters(editedFilters)
  }

  useEffect(() => {
    if (
      saveResponse?.saveWard?.status != null &&
      saveResponse.saveWard.status == Response.STATUS_SUCCESS
    ) {
      setIsSaveSuccess(true)
    }
  }, [saveResponse])

  return (
    <WrapperWard>
      <Helmet>
        <title>Danh mục Xã/Phường</title>
        <meta name="description" content="Danh mục Xã/Phường" />
      </Helmet>
      <Filter
        hanndleShowModal={hanndleShowModal}
        setModalType={setModalType}
        setFilters={setFilters}
        listProvince={[]}
        listDistrict={[]}
        onChangeFilter={onChangeFilter}
        setPage={setPage}
        setPageSize={setPageSize}
        setProvinceIdFilter={setProvinceIdFilter}
        provinceIdFilter={provinceIdFilter}
        isSaveSuccess={isSaveSuccess}
        deleteStatus={deleteResponse?.removeWard?.status}
      />
      <TableWard
        data={[]}
        page={1}
        pageSize={pageSize}
        showLoading={false}
        hanndleShowModal={hanndleShowModal}
        handleDelete={handleDelete}
        setRowSelected={setRowSelected}
        rowSelected={rowSelected}
        setModalType={setModalType}
        handleChangeTable={handleChangeTable}
        handleShowModalDetail={handleShowModalDetail}
        handleSaveWard={handleSaveWard}
      />
      <FormWard
        listProvince={[]}
        listDistrict={[]}
        openModal={openModal}
        titleModal={titleModal}
        rowSelected={rowSelected}
        setRowSelected={setRowSelected}
        handleSaveWard={handleSaveWard}
        modalType={modalType}
        setIsSaveSuccess={setIsSaveSuccess}
        isSaveSuccess={isSaveSuccess}
        setProvinceId={setProvinceId}
        provinceId={provinceId}
        loadingSave={loadingSave}
      />
    </WrapperWard>
  )
}

export default WardPages
