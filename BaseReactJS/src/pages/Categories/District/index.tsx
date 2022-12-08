import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useDispatch, useSelector } from "react-redux"
import {
  useLazyQueryDistrict,
  useRemoveDistrict,
  useSaveDistrict
} from "src/graphql/categories/district.graphql"
import { useQueryProvince } from "src/graphql/categories/province.graphql"
import {
  ChangeTitleModal,
  ShowModal
} from "../../../reducer/actions/modal.action"
import Filter from "./components/filter"
import FormDistrict from "./components/form"
import TableDistrict from "./components/table"
import { WrapperUser } from "./style"

const DistrictPages = (props: any) => {
  const [rowSelected, setRowSelected] = useState("")
  const [modalType, setModalType] = useState<any>("")
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [filters, setFilters] = useState({
    code: "",
    name: "",
    provinceId: "",
    startDate: "",
    endDate: "",
    status: ""
  })
  const [openModalDetail, setOpenMoDalDetail] = useState(false)
  const [isSaveSuccess, setIsSaveSuccess] = useState(false)

  const dispatch = useDispatch()
  const { openModal, titleModal } = useSelector((state: any) => ({
    openModal: state.ModalReducer.showModal,
    titleModal: state.ModalReducer.title
  }))

  const [removeDistrict] = useRemoveDistrict(
    {},
    {
      provinceId: filters.provinceId
    }
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
    setOpenMoDalDetail(!openModalDetail)
  }

  const handleSaveDistrict = data => {}
  const handleDelete = id => {
    removeDistrict({
      variables: {
        id
      }
    })
  }

  const handleChangePage = (page, pageSize) => {
    setPageSize(pageSize)
    setPage(page)
  }

  useEffect(() => {
    if (filters?.provinceId && filters?.provinceId !== "") {
    }
  }, [filters])

  return (
    <WrapperUser>
      <Helmet>
        <title>Danh mục Quận/huyện</title>
        <meta name="description" content="Danh mục Quận/huyện" />
      </Helmet>
      <Filter
        hanndleShowModal={hanndleShowModal}
        setModalType={setModalType}
        listProvince={[]}
        setFilters={setFilters}
        setPage={setPage}
        setPageSize={setPageSize}
        loading={false}
      />
      <TableDistrict
        data={[]}
        page={page}
        pageSize={pageSize}
        showLoading={false}
        hanndleShowModal={hanndleShowModal}
        handleShowModalDetail={handleShowModalDetail}
        handleDelete={handleDelete}
        setRowSelected={setRowSelected}
        rowSelected={rowSelected}
        setModalType={setModalType}
        handleChangePage={handleChangePage}
      />
      <FormDistrict
        listProvince={[]}
        openModal={openModal}
        titleModal={titleModal}
        rowSelected={rowSelected}
        setRowSelected={setRowSelected}
        handleSaveDistrict={handleSaveDistrict}
        modalType={modalType}
        setIsSaveSuccess={setIsSaveSuccess}
        isSaveSuccess={isSaveSuccess}
      />
    </WrapperUser>
  )
}

export default DistrictPages
