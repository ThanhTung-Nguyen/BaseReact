import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { WrapperArticleCategory } from "./styles"
import Filter from "./components/filter"
import TableArticleCategory from "./components/table"
import { FormAction } from "src/constants/enum"
import FormArticleCategory from "./components/form"
import { treeify } from "src/utils/array"
import { useDispatch } from "react-redux"
import { Modal } from "antd"
import _ from "lodash"
import {
  useQueryNewsCategories,
  useRemoveNewsCategory,
  useSaveNewsCategory
} from "src/graphql/categories/category.graphql"
import { createDeflate } from "zlib"
import { useQueryProjects } from "src/graphql/project/project.graphql"
import axios from "axios"

const ArticleCategoryPage = () => {
  const [selectedRows, setSelectedRows] = useState<ICategory[]>([])
  const [formAction, setFormAction] = useState<FormAction | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedRow, setSelectedRow] = useState<ICategory | null>(null)
  const [filtered, setFiltered] = useState<object[]>([])
  const [showConfirm, setShowConfirm] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [variables, setVariables] = useState<object>({
    page,
    pageSize,
    sorted: [{ id: "createDate", desc: true }],
    filtered: []
  })

  const [saveNewsCategory] = useSaveNewsCategory({}, variables)
  const [deleteNewsCategory] = useRemoveNewsCategory({}, variables)
  const [people, setPeople] = useState<any[]>([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios
      .get("https://6391459665ff41831129bfe1.mockapi.io/api/v1/user/")
      .then(res => {
        setPeople(res.data)
        // console.log(res.data)
        setLoading(false)
      })
      .catch(err => {
        setError("Có gì đó không ổn...")
        console.log(err)
      })
  }, [])
  const deletePeople = person => {
    console.log(person)

    axios.delete(`https://6391459665ff41831129bfe1.mockapi.io/api/v1/user/`)
    setPeople(people.filter(p => p.id !== person.id))
  }
  const onDelete = (selectedRow: ICategory) => {
    setSelectedRow(selectedRow)
    setShowConfirm(true)
    deleteNewsCategory({ variables: { id: selectedRow?.id } })
  }

  const onCloseConfirm = () => {
    setShowConfirm(false)
    setSelectedRow(null)
  }

  const onConfirm = () => {
    if (selectedRow != null) {
      deleteNewsCategory({
        variables: {
          id: selectedRow.id
        }
      })
    }
    setShowConfirm(false)
    setSelectedRow(null)
  }

  const onShowDetailModal = (selectedRow: ICategory) => {
    setSelectedRow(selectedRow)
    setFormAction(FormAction.DETAIL)
    setShowModal(true)
  }

  const onShowEditModal = (selectedRow: ICategory) => {
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

  const onCreate = (selectedRow: ICategory) => {
    setSelectedRow(selectedRow)
    setFormAction(FormAction.CREATE)
    setShowModal(true)
  }

  const onSubmit = (value: ICategory) => {
    saveNewsCategory({
      variables: {
        input: {
          ...value
        }
      }
    })
    onCloseModal()
  }

  const onMultipleDelete = () => {}

  const onChangePage = (page: number, pageSize?: number) => {}

  const onChangeStatus = (selectedRow: ICategory) => {
    if (selectedRow.status !== 1) {
    }
  }

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
      sorted: [{ id: "createDate", desc: true }],
      filtered
    }
    setFiltered(filtered)
    setVariables(request)
  }, 1000)

  return (
    <>
      {error && <h3>{error}</h3>}
      <WrapperArticleCategory>
        <Helmet>
          <title>Chuyên mục tin tức</title>
          <meta name="description" content="Chuyên mục tin tức" />
        </Helmet>
        <Filter
          handleMultipleDelete={onMultipleDelete}
          handleShowCreateModal={onShowCreateModal}
          handleSearch={onSearch}
        />
        <TableArticleCategory
          data={people}
          loading={false}
          page={1}
          pageSize={pageSize}
          records={10}
          handleShowCreateModal={onShowCreateModal}
          handleShowEditModal={onShowEditModal}
          handleShowDetailModal={onShowDetailModal}
          handleCreate={onCreate}
          handleDelete={() => deletePeople(people)}
          setSelectedRows={setSelectedRows}
          selectedRows={selectedRows}
          handleChangePage={onChangePage}
          handleChangeStatus={onChangeStatus}
          handleSubmit={onSubmit}
          dataProject={[]}
        />
        <FormArticleCategory
          list={[]}
          dataProject={[]}
          data={selectedRow}
          formAction={formAction}
          showModal={showModal}
          handleCloseModal={onCloseModal}
          handleSubmit={onSubmit}
        />
      </WrapperArticleCategory>
    </>
  )
}

export default ArticleCategoryPage
