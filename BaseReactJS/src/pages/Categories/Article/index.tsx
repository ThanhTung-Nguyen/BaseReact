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
  const [people, setPeople] = useState<any>([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [dataform, setDataForm] = useState([
    { key: 1, value: "Nguyễn Thanh Tùng" },
    { key: 2, value: "Nguyễn Văn Quang" }
  ])

  const url = "https://6391459665ff41831129bfe1.mockapi.io/api/v1/user"
  useEffect(() => {
    setLoading(true)
    axios
      .get(url)
      .then(res => {
        setPeople(res.data)
        setLoading(false)
      })
      .catch(err => {
        setError("Có gì đó không ổn...")
        console.log(err)
      })
  }, [])

  const onDelete = (selectedRow: ICategory) => {
    axios
      .delete(url + "/" + selectedRow.id)
      .then(data => {
        axios.get(url).then(res => {
          setPeople(res.data)
          console.log(res.data)
        })
        console.log(data)
      })
      .catch(err => {
        console.log(err)
      })
    setPeople(people.filter(p => p.id !== selectedRow))
    console.log(selectedRow)
    setSelectedRow(selectedRow)
    setShowConfirm(true)
    // deleteNewsCategory({ variables: { id: selectedRow?.id } })
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
    console.log(selectedRow)
    setSelectedRow(selectedRow)
    setFormAction(FormAction.EDIT)
    setShowModal(true)
    axios
      .put(`${url}/${selectedRow.id}`, {
        name: selectedRow.name,
        email: selectedRow.email,
        phone: selectedRow.phone,
        status: selectedRow.status
      })
      .then(res => {
        axios.get(url).then(res => {
          setPeople(res.data)
          console.log(res.data)
        })
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const onShowCreateModal = () => {
    //Không post ở đây
    setSelectedRow(null)
    setFormAction(FormAction.CREATE)
    setShowModal(true)
  }

  const onCloseModal = () => {
    setShowModal(false)
    setFormAction(null)
    setSelectedRow(null)
  }

  const onCreate = (value: ICategory) => {
    console.log(value)
    setSelectedRow(null)
    setFormAction(FormAction.CREATE)
    setShowModal(true)
    axios
      .post(url, {
        name: value.name,
        email: value.email,
        phone: value.phone,
        status: value.status
      })
      .then(res => {
        console.log(value)
        axios.get(url).then(res => {
          setPeople(res.data)
        })
        console.log(res)
        onCloseModal()
      })
      .catch(err => {
        console.log(err)
      })
  }

  const onSubmit = (value: ICategory) => {
    //Không post ở đây
    console.log(value)

    // saveNewsCategory({
    //   variables: {
    //     input: {
    //       ...value
    //     }
    //   }
    // })
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
          handleCreate={onCreate}
          handleEdit={onShowEditModal}
          handleDelete={onDelete}
          handleShowDetailModal={onShowDetailModal}
          handleSubmit={onSubmit}
          setSelectedRows={setSelectedRows}
          selectedRows={selectedRows}
          handleChangePage={onChangePage}
          handleChangeStatus={onChangeStatus}
          dataProject={[]}
        />
        <FormArticleCategory
          dataForm={dataform}
          list={[]}
          dataProject={people}
          data={selectedRow}
          formAction={formAction}
          showModal={showModal}
          handleCloseModal={onCloseModal}
          handleCreate={onCreate}
          handleEdit={onShowEditModal}
          handleSubmit={onSubmit}
        />
      </WrapperArticleCategory>
    </>
  )
}

export default ArticleCategoryPage
