import { FormAction } from "src/constants/enum"

export interface ITableArticleCategoryProps {
  page: number
  pageSize?: number
  records?: number
  selectedRows?: any
  loading?: boolean
  data: any
  dataProject: any
  handleChangePage: (page: number, pageSize?: number) => void
  setSelectedRows: any
  handleShowDetailModal: (selectedRow: ICategory) => void
  handleEdit: (selectedRow: ICategory) => void
  handleCreate: (selectedRow: ICategory) => void
  handleDelete: (selectedRow: ICategory) => void
  handleChangeStatus: (selectedRow: ICategory) => void
  handleSubmit: (value: ICategory) => void
  handleShowCreateModal: () => void
}

export interface IFilterArticleCategoryProps {
  handleShowCreateModal: () => void
  handleMultipleDelete: () => void
  handleSearch: (title?: string) => void
}

export interface IFormArticleCategoryProps {
  data?: any
  list: ICategory[]
  dataProject?: any[]
  treeList?: ICategory[]
  formAction: FormAction | null
  showModal: boolean
  handleCloseModal: () => void
  handleSubmit: (value: ICategory) => void

  dataForm?: any[]
  handleCreate: (value: ICategory) => void
  handleEdit: (selectedRow: ICategory) => void
}
