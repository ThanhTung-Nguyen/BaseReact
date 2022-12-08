import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useDispatch, useSelector } from "react-redux"
import { Response } from "src/constants/message"
import {
  useQueryProjects,
  useRemoveProject,
  useSaveProject
} from "src/graphql/project/project.graphql"
import { ChangeTitleModal, ShowModal } from "../../reducer/actions/modal.action"
import Filter from "./components/filter"
import FormProject from "./components/form"
import TableProject from "./components/table"
import { WrapperProject } from "./style"

const ProjectPages = (props: any) => {
  const [rowSelected, setRowSelected] = useState<any>("")
  const [modalType, setModalType] = useState<any>("")
  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState<any>({
    name: "",
    phone: "",
    collaboratorCode: "",
    type: "",
    status: ""
  })
  const [variables, setVariables] = useState({
    page: 1,
    pageSize,
    filtered: [],
    sorted: [{ id: "createDate", desc: true }]
  })

  const [paramSearch, setParamSearch] = useState([])
  const [modalDetail, setModalDetail] = useState(false)
  const [isSaveSuccess, setIsSaveSuccess] = useState(false)
  const [checkApprove, setCheckApprove] = useState(false)

  const dispatch = useDispatch()

  const { openModal, titleModal } = useSelector((state: any) => ({
    openModal: state.ModalReducer?.showModal,
    titleModal: state.ModalReducer?.title
  }))

  const [saveProject, { data: saveResponse, loading: saveLoading }] =
    useSaveProject({}, variables)

  const [removeProject, { data: deleteResponse }] = useRemoveProject(
    {},
    variables
  )

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

  const handleSave = input => {}

  const handleDelete = id => {}

  useEffect(() => {
    if (
      saveResponse?.saveProject.code != null &&
      saveResponse?.saveProject.status == Response.STATUS_SUCCESS
    ) {
      setIsSaveSuccess(true)
    }
  }, [saveResponse?.saveProject])

  const fetchData = (request: any, filters?: any) => {
    if (filters) {
      Object.keys(filters).forEach(item => {
        if (item === "name" && filters.name !== "") {
          request.filtered.push({
            id: "name",
            value: filters.name,
            operation: "~"
          })
        }

        if (item === "code" && filters.code !== "") {
          request.filtered.push({
            id: "code",
            value: filters.code,
            operation: "~"
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
    setPage(pagination.current ?? 1)
    setFilters(editedFilters)
  }

  return (
    <WrapperProject>
      <Helmet>
        <title>Quản lý ứng dụng</title>
        <meta name="description" content="Quản lý ứng dụng" />
      </Helmet>
      <Filter
        filters={filters}
        hanndleShowModal={hanndleShowModal}
        setModalType={setModalType}
        onChangeFilter={onChangeFilter}
        setPageSize={setPageSize}
      />
      <TableProject
        data={[]}
        page={1}
        pageSize={pageSize}
        showLoading={false}
        setFilters={setFilters}
        hanndleShowModal={hanndleShowModal}
        handleDelete={handleDelete}
        setRowSelected={setRowSelected}
        rowSelected={rowSelected}
        setModalType={setModalType}
        handleChangeTable={handleChangeTable}
        handleShowModalDetail={handleShowModalDetail}
        handleSave={handleSave}
      />
      <FormProject
        openModal={openModal}
        titleModal={titleModal}
        rowSelected={rowSelected}
        setRowSelected={setRowSelected}
        handleSave={handleSave}
        modalType={modalType}
        setIsSaveSuccess={setIsSaveSuccess}
        isSaveSuccess={isSaveSuccess}
        saveLoading={saveLoading}
      />
    </WrapperProject>
  )
}

export default ProjectPages
