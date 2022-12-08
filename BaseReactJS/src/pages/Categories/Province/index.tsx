import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useDispatch, useSelector } from "react-redux"
import {
  useQueryProvince,
  useRemoveProvince,
  useSaveProvince
} from "src/graphql/categories/province.graphql"
import {
  ChangeTitleModal,
  ShowModal
} from "../../../reducer/actions/modal.action"
import Filter from "./components/filter"
import FormProvince from "./components/form"
import TableProvince from "./components/table"
import { WrapperProvince } from "./province"

const ProvincePages = (props: any) => {
  const [rowSelected, setRowSelected] = useState("")
  const [modalType, setModalType] = useState<any>("")
  const [page, setPage] = useState()
  const [pageSize, setPageSize] = useState(10)
  const [isSaveSuccess, setIsSaveSuccess] = useState(false)

  const dispatch = useDispatch()

  const { openModal, titleModal } = useSelector((state: any) => ({
    openModal: state.ModalReducer.showModal,
    titleModal: state.ModalReducer.title
  }))

  const [saveProvince, { data: saveResponse }] = useSaveProvince()
  const [removeProvince] = useRemoveProvince()

  const hanndleShowModal = value => {
    if (value && typeof value !== "undefined") {
      setRowSelected(value)
      dispatch(ChangeTitleModal("Cập nhật"))
    } else {
      dispatch(ChangeTitleModal("Thêm mới"))
    }
    dispatch(ShowModal())
  }

  const handleSaveProvince = data => {
    saveProvince({
      variables: {
        data
      }
    })
  }

  const handleDelete = id => {
    removeProvince({
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
    if (
      saveResponse?.saveProvince?.status != null &&
      saveResponse.saveProvince.status !== 0
    ) {
      setIsSaveSuccess(true)
    }
  }, [saveResponse])

  return (
    <WrapperProvince>
      <Helmet>
        <title>Danh mục Tỉnh/ thành phố</title>
        <meta name="description" content="Danh mục Tỉnh/ thành phố" />
      </Helmet>
      <Filter hanndleShowModal={hanndleShowModal} setModalType={setModalType} />

      <TableProvince
        data={[]}
        page={page}
        pageSize={pageSize}
        showLoading={false}
        hanndleShowModal={hanndleShowModal}
        handleDelete={handleDelete}
        setRowSelected={setRowSelected}
        rowSelected={rowSelected}
        setModalType={setModalType}
        handleChangePage={handleChangePage}
        handleSaveProvince={handleSaveProvince}
      />
      <FormProvince
        openModal={openModal}
        titleModal={titleModal}
        rowSelected={rowSelected}
        setRowSelected={setRowSelected}
        handleSaveProvince={handleSaveProvince}
        modalType={modalType}
        setIsSaveSuccess={setIsSaveSuccess}
        isSaveSuccess={isSaveSuccess}
      />
    </WrapperProvince>
  )
}

export default ProvincePages
